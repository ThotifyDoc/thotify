---
layout: ../../../layouts/BaseLayout.astro
title: Compiler vs Interpreter
description: Quelles sont les différences ? 
---
## Compilation et code machine

Le code machine (binaire) est une suite d'instructions directement compréhensibles par le processeur d'un ordinateur. Le code binaire généré depend de l'architecture du processeur tel que x86, ARM, etc.

## Architecture de processeurs 

Le langage binaire concerne des opération très simple a exécuter pour le processeur ce qui lui permet d'être très rapide. Lors de l'éxécution de la compilation le processeur pourra également rejeter des erreurs de redondance qui ont tendance a réduire la rapidité du code sans en changer son fonctionnement.

Un code éxécuté sur ARM ne sera donc pas compris par un proceseur x86 et vice versa.

Les étapes de compilation peuvent varier en fonction du langage utilisé. Mais on pourra retenir plusieurs phases tel que : 


### le pré processing :
    - Permet d'enlever tout ce qui n'est pas du code, tel que les commentaires, les directives conditionnelles etc.

### la compilation :
    - Elle consiste à produire des instructions compréhensibles par le microprocesseur. Cependant la phase de compilation à proprement dite n’est qu’une partie de ce processus global en 4 étapes. Parler de compilation dans un sens plus large est un abus de langage.
    C'est la phase où le code source est traduit en code assembleur, un langage de bas niveau proche du code machine mais encore lisible par les humains. Cette phase ne produit pas directement un exécutable, mais génère un ou plusieurs fichiers appelés **fichiers objets**. 

### l’assemblage: 
    - L’assemblage permet de produire le langage machine qui sera exécuté sur le microprocesseur.

### l’édition de liens: 
    - Le code peut faire appel à des fonctions externes ou système qu’il faut « **lier** » à notre code source pour produire un programme réellement exécutable
    - L’étape qui consiste à lier les différents fichiers objet nécessaires à l’exécution du programme s’appelle l’édition de liens.




## Interprétation du code

Le code est interprété en temps réel, c'est-à-dire que l'utilisateur reçoit le code source, qui nécessite un interpréteur (comme le moteur JavaScript dans un navigateur) pour être exécuté, le ***code en entré*** est donc issu de langage haut niveau. ***L'interprétation en sortie*** est l'éxécution immédiate des instructions tel que: 
    - Affichage de données : Par exemple, afficher des informations à l'écran (texte, graphiques, etc.).
    - Modification de l'état du programme : Mise à jour de variables, modifications de la mémoire, gestion d'entrées/sorties, etc.
    - Interaction avec le système : Accès aux fichiers, réseau, etc.
 
En somme, l'interprétation permet d'exécuter directement le code source, ce qui facilite son déploiement. Cependant, cette méthode peut entraîner des pertes de performance par rapport à la compilation, car le code est traduit et exécuté à la volée au lieu d'être pré-compilé en un fichier binaire optimisé.

## Comparatif 
| Interpréteur | Compilateur |
|--------------|-------------|
| Convertit le programme en prenant une seule ligne à la fois. | Analyse l’ensemble du programme et le traduit dans son ensemble en code machine. |
| L’analyse du code source prend moins de temps, mais le temps d’exécution global est plus lent. | L’analyse du code source prend beaucoup de temps, mais le temps d’exécution global est comparativement plus rapide. |
| Aucun code d’objet intermédiaire n’est généré, la mémoire est donc efficace. | Génère du code d’objet intermédiaire qui nécessite en outre une liaison, donc davantage de mémoire. |
| Continue de traduire le programme jusqu’à ce que la première erreur soit rencontrée. Par conséquent, le débogage est facile. | Il génère le message d’erreur uniquement après avoir analysé l’ensemble du programme. Par conséquent, le débogage est relativement difficile. |
| Exemple d’interpréteur: Python, Ruby. | Exemple de compilateur: C, C++. |

## Ressources: 
https://perso.esiee.fr/~courivad/C/rst/02-compilation.html
https://laconsole.dev/blog/differences-langage-compile-interprete/

https://waytolearnx.com/2019/03/difference-entre-compilateur-et-interpreteur.html
https://blog.purplegiraffe.fr/programmation-compilation-interpretation/
