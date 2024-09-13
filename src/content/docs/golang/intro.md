---
title: A Golang Guide
description: A guide in Golang.
---
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

## Declaration de variables 
var x int = 10
y := 20 // déclaration courte

## Constante 
const Pi = 3.14
const Greeting = "Hello, Go!"

## Types de données 
var a int = 5
var b float64 = 3.14
var c string = "Go"
var d bool = true

## Boucles 

for i := 0; i < 10; i++ {
    fmt.Println(i)
}

for condition {
    // do something
}

for {
    // boucle infinie
}

## Conditions 

if x > 0 {
    fmt.Println("Positive")
} else if x == 0 {
    fmt.Println("Zero")
} else {
    fmt.Println("Negative")
}

## Switch Case 

switch day {
case "Monday":
    fmt.Println("Start of the week")
case "Friday":
    fmt.Println("End of the week")
default:
    fmt.Println("Another day")
}

## Functions 
func add(a int, b int) int {
    return a + b
}
func swap(x, y string) (string, string) {
    return y, x
}

## Arrays et Slices

var arr [5]int
arr[0] = 1

## Pointers 
m := make(map[string]int)
m["apple"] = 1
fmt.Println(m["apple"]) // Output: 1

## Pointeurs 
var p *int
i := 42
p = &i
fmt.Println(*p) // Dereferencing

## Channels
ch := make(chan int)

go func() {
    ch <- 42
}()

val := <-ch
fmt.Println(val) // Output: 42

## Erreur
val, err := strconv.Atoi("42")
if err != nil {
    fmt.Println("Error:", err)
} else {
    fmt.Println(val)
}

## Interface 
type Animal interface {
    Speak() string
}

type Dog struct{}

func (d Dog) Speak() string {
    return "Woof"
}
