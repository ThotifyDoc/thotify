---
layout: ../../../layouts/BaseLayout.astro
title: Memento et commandes de base LINUX en SHELL
description: Guide pour les commandes de bases demandées en Prépa pour la semaine d'introduction au Shell et à Linux
---

##### **Afficher le manuel d'une commande (exemple ici la commande "ls")** :

```bash
  man ls
```

##### **Afficher les fichiers d'un dossier** :

- Aller dans le dossier en question
- A cet endroit lancer cette commande :

```bash
ls
```

- Ou celle ci pour afficher même les fichiers cachés

```bash
ls -a
```

- Ou celle ci pour afficher les fichiers sous forme de liste

```bash
ls -a -l
```

- On peut aussi cumuler les options en collant les lettres (ici afficher la liste de tous les fichiers du dossier et leur numéro inode) :

```bash
ls -ail
```

##### **Comment lire les droits d'un utilisateur** :

<img src="/thotify/src/assets/img-shell/droits.png" alt="Exemple de droits utilisateur" title="Droits utilisateurs" style="width: 300px;">

Les différents droits disponibles sont les suivants :

- Lecture (noté r comme read).
- Écriture (noté w comme write).
- Exécution (noté x comme eXecution).

##### **Créer un fichier** :

```bash
cat > nomdufichier.txt
```

Tapez ensuite votre texte et ctrl + D pour quitter et sauvegarder
