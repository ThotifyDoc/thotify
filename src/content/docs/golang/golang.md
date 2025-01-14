---
layout: ../../../layouts/BaseLayout.astro
title: A Golang Guide
description: A guide in Golang.
---
# Introduciton 

Golang (GO) est un langage développé par google dans les années 2000 qui possède un gestion de la mémoire et une programmation orienté objet à sa façon.
Ici les classes n'existent pas mais les objets restent très courant. 
A la place go implémente un systeme de package et de structure pour manipuler le code et les objet 

# Les packages

Les projets GO sont initié à l'aide du fichier "main" qui représente la racine, ou le point d'entrée de l'application 
Ce même fichier est lié a un package qui va permettre de centraliser et d'exporter les méthodes des fichiers racines. On nomme le package comme on le souhaite il n'est pas obligé de se nommer main 
```golang
go mod init nom-du-module
```
Cette commande va permettre d'init le module principal de l'application, nous n'aurons plus besoin d'utiliser cette ligne de command par la suite car tous les nouveaux module seront en fait des sous-module issu du premier module déclaré (module racine)

## Les sous-package

Si l'on souhaite suivre le principe of concern on va évidemment vouloir déclarer un nouveau module ou tout faire pour séparer le code de la racine, du main

```bash
mon-projet/
│
├── go.mod           # Le module principal
├── main.go          # Le fichier principal du projet
│
└── services/
    ├── go.mod       # Nouveau module pour services
    └── service.go   # Code spécifique aux services

```

Dans GO, si l'on souhaite déclarer du nouveau code il faut le faire dans un nouveau dossier, GO interprétera le nouveau dossier comme un sous package du package principal 

**Go ne gère pas plusieurs package racine**

Depuis le package issu de /services je pourrais déclarer et exporter des func (function) vers mon module principal ou vers un autre module (attention au dépendances circulaires).
Afin de pouvoir exporter des fonction vers d'autre module/fichier il faut que les fonction soit déclarées en **PascalCase** ainsi GO pourra interpréter automatiquement toutes les functions qui sont exportées.

```go
// pas d'export car commence par une minuscule
func addition(a, b int) int {
    return a + b
}

// export car fonction écrite en PascalCase
func Soustraction(a, b int) int {
    return a - b
}
```

En partant du principe que dans le main j'importe mon sous module service, je vais utiliser la fonction Soustraction dans mon fichier main. En principe dès lors que je vais écrire service.Soustraction() go devrait me faire l'import automatiquement tel que :
```go
package main

import (
	"mon-projet/services"

)
```
# Gestion de la mémoire
![Thread Goroutine & autre](https://miro.medium.com/v2/resize:fit:1400/1*OPe9r5Goz5_aUW-9OgY5Iw.png)

## Go routine 
Golang est un langage qui utilise le multi-threading et le [multiplexage](#multiplexage).


Chaque programme est constitué d'au moins une goroutine, appelée **goroutine principale**. La goroutine principale contrôle toutes les autres goroutines ; ainsi, si la goroutine principale se termine, toutes les autres goroutines du script le font également. La goroutine est toujours active en arrière-plan.

Goroutines sont moins coûteux que les autres processus. La taille de la pile n'est que de quelques kilo-octets, et elle peut s'étendre ou se contracter pour répondre aux demandes du programme, contrairement aux threads, dont la taille de la pile doit être définie et est permanente.

## Erreurs fréquentes de programmation concurrente
- Absence de synchronisations lorsque cela est nécessaire
- Utilisation de time. Sleep pour effectuer les synchronisations
- Laisser les goroutines se balancer en copiant les valeurs des types du paquetage sync standard
- Appelez la synchronisation
- Groupe d'attente
- Ajouter des méthodes au mauvais endroit
- Utiliser les canaux comme des canaux de fermeture de demain, et non de la dernière goroutine émettrice fonctionnelle.


a voir : https://appmaster.io/fr/blog/goroutines-fr
## Déclaration & Scope
```go
var x int
// déclaration par defaut (valeur par defaut: 0)
var x int = 10 
// declaration typé
x := 42 
// déclaration rapide typage auto déterminé à l'aide des := 
// le scope est toujours intrinsèque au bloc dans lequel il a été déclaré
p := new(int)  
// Alloue un entier et retourne le pointeur de cet entier 
// Valeur par defaut 0
var ( // déclaration de plusieurs variables en meme temps
    variable1 Type
    variable2 Type = valeur
    variable3 = valeur // déduit automatiquement le type
)
```
En GO lorsque l'on déclare une string par exemple on ne peut pas la convertir par nouvelle attribution en int comme on pourrait le voir dans des langages haut niveau. Cela provoquerait une erreur

## Pointeurs 

Les pointeurs permettent d'enregistrer l'adresse d'une variable dans la mémoire. Ainsi lorsque l'on veut manipuler une variable en dehors de son scope, on peut recourir a un pointer 
qui est une référence direct a la variable plutot que d'utiliser un artifice quelconque (tel que un store, des signaux (emit), une instance de classe, du code répété etc.)

```go
var ma_variable int = 42 // Une variable normale
// vaut 42
var p *int // Un pointeur vers un entier
// vaut une adresse
p = &ma_variable // Le pointeur reçoit l'adresse de ma_variable

fmt.Println("ma_variable =", ma_variable)   // Affiche la valeur de ma_variable
fmt.Println("ma_variable =", &ma_variable)  // Affiche la valeur de ma_variable
fmt.Println("p =", p)   // Affiche l'adresse mémoire de ma_variable
fmt.Println("*p =", *p) // Affiche la valeur pointée par p (c'est-à-dire la valeur de ma_variable)

*p = 100 // Change la valeur de ma_variable via le pointeur
fmt.Println("ma_variable après modification via p =", ma_variable)
```

## Références 

```go
```

Get Started

Générer les modules
Générer le main.go 

les prints: 
lib fmt

Affiche les arguments donnés sans saut de ligne.
fmt.Print("Hello, World!")

Affiche les arguments donnés avec un saut de ligne à la fin.
fmt.Println("Hello, World!")

Formate une chaîne avec des spécificateurs et l'affiche.
fmt.Printf("Name: %s, Age: %d\n", "Alice", 25)



# Spécificateurs de Formatage `fmt` en Go

| Spécificateur | Description                          | Exemple                        | Output                           |
|---------------|--------------------------------------|--------------------------------|----------------------------------|
| `%v`          | Valeur par défaut                    | `fmt.Printf("%v", 42)`         | `42`                             |
| `%+v`         | Valeur avec noms des champs          | `fmt.Printf("%+v", person)`    | `{Name: Alice Age: 25}`          |
| `%#v`         | Syntaxe complète Go                  | `fmt.Printf("%#v", person)`    | `main.Person{Name:"Alice", Age:25}` |
| `%T`          | Type de la valeur                    | `fmt.Printf("%T", 42)`         | `int`                            |
| `%%`          | Un signe de pourcentage littéral     | `fmt.Printf("%%")`             | `%`                              |
| `%t`          | Booléen                              | `fmt.Printf("%t", true)`       | `true`                           |
| `%d`          | Entier en base 10                    | `fmt.Printf("%d", 42)`         | `42`                             |
| `%b`          | Entier en binaire                    | `fmt.Printf("%b", 42)`         | `101010`                         |
| `%o`          | Entier en octal                      | `fmt.Printf("%o", 42)`         | `52`                             |
| `%x` / `%X`   | Entier en hexadécimal (min/maj)      | `fmt.Printf("%x", 42)`         | `2a`                             |
| `%f`          | Nombre flottant                      | `fmt.Printf("%f", 3.14)`       | `3.140000`                       |
| `%s`          | Chaîne de caractères                 | `fmt.Printf("%s", "Hello")`    | `Hello`                          |
| `%q`          | Chaîne entre guillemets              | `fmt.Printf("%q", "Hello")`    | `"Hello"`                        |
| `%p`          | Adresse mémoire                      | `fmt.Printf("%p", &a)`         | `0x...`                          |


# Types d'Entrées (`input`) en Go

| Méthode         | Description                            | Exemple                              | Entrée/Output                          |
|-----------------|----------------------------------------|--------------------------------------|----------------------------------------|
| `fmt.Scan`      | Lit les entrées depuis `stdin`         | `fmt.Scan(&name)`                    | Entrée : `Alice`                       |
| `fmt.Scanln`    | Lit les entrées jusqu'à un retour ligne | `fmt.Scanln(&name)`                  | Entrée : `Alice`                       |
| `fmt.Scanf`     | Lit les entrées avec un format spécifié | `fmt.Scanf("%s %d", &name, &age)`    | Entrée : `Alice 25`                    |
| `bufio.Reader`  | Lit les entrées ligne par ligne        | `reader.ReadString('\n')`            | Entrée : `Hello, World!\n`             |
| `fmt.Sscanf`    | Scanne une chaîne formatée             | `fmt.Sscanf("Alice 25", "%s %d", &name, &age)` | Entrée : Chaîne formatée (`Alice 25`) |
| `os.Stdin.Read` | Lecture d'octets à partir de `stdin`   | `os.Stdin.Read(buffer)`              | Entrée : octets bruts                  |

## Détails des Méthodes

### `fmt.Scan`
Lit une série d'entrées depuis `stdin`, séparées par des espaces, et les assigne aux variables spécifiées.

```go
var name string
fmt.Print("Enter your name: ")
fmt.Scan(&name)
fmt.Println("Hello,", name)
```
## Declaration de variables 
```go
var x int = 10
y := 20 // déclaration courte
```

## Constante 
```go
const Pi = 3.14
const Greeting = "Hello, Go!"
```

## Types de données 
```go
var a int = 5
var b float64 = 3.14
var c string = "Go"
var d bool = true
```

## Boucles 
```go
for i := 0; i < 10; i++ {
    fmt.Println(i)
}

for condition {
    // do something
}

for {
    // boucle infinie
}
```


## Conditions 

```go
if x > 0 {
    fmt.Println("Positive")
} else if x == 0 {
    fmt.Println("Zero")
} else {
    fmt.Println("Negative")
}
```


## Switch Case 
```go
switch day {
case "Monday":
    fmt.Println("Start of the week")
case "Friday":
    fmt.Println("End of the week")
default:
    fmt.Println("Another day")
}
```

## Functions 
```go
func add(a int, b int) int {
    return a + b
}
func swap(x, y string) (string, string) {
    return y, x
}
```

## Arrays et Slices
```go
var arr [5]int
arr[0] = 1
```
## Pointers 
```go
m := make(map[string]int)
m["apple"] = 1
fmt.Println(m["apple"]) // Output: 1
```

## Pointeurs 
```go
var p *int
i := 42
p = &i
fmt.Println(*p) // Dereferencing
```

## Channels
```go
ch := make(chan int)

go func() {
    ch <- 42
}()

val := <-ch
fmt.Println(val) // Output: 42
```

## Erreur
```go
val, err := strconv.Atoi("42")
if err != nil {
    fmt.Println("Error:", err)
} else {
    fmt.Println(val)
}
```

## Interface 
```go
type Animal interface {
    Speak() string
}

type Dog struct{}

func (d Dog) Speak() string {
    return "Woof"
}

type User struct { // regrouper des types de données 
    Name  string
    Email string
    Age   int
}
```
| **Aspect**            | **Structs en Go**                           | **Classes (ex. en Java)**             |
|------------------------|---------------------------------------------|---------------------------------------|
| **Héritage**          | Pas d'héritage                             | Supporte l'héritage                  |
| **Constructeurs**     | Pas natifs (simulateurs via fonctions)     | Constructeurs natifs                 |
| **Encapsulation**     | Basé sur la visibilité (majuscule/minuscule) | Contrôlé par `private`, `protected`, `public` |
| **Polymorphisme**     | Basé sur les interfaces                    | Basé sur l'héritage et les interfaces |
| **Static/Static members** | Non pris en charge                         | Supporté                             |


# Definition
<p id="multiplexage">
<strong>Multiplexage :</strong> Technique qui consiste à gérer plusieurs tâches (ou unités d'exécution) sur un nombre limité de ressources, comme des threads ou des connexions.
</p>
<p id="parrallelisme">
<strong>Parrallélisme :</strong>
</p>
<p id="inhibition">
<strong>Inhibition :</strong> 
</p>