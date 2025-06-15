---
layout: ../../../layouts/BaseLayout.astro
title: Guide UML Diagrammes de classe
description: Guide pour aider à la compréhension des diagrammes de classe UML
---

# Introduction 

Les diagrammes UML (Unified Modeling Language) sont des représentations graphiques des objets issus de la programmation orientée objet. Ils permettent de visualiser les liens entre les classes, leurs définitions ainsi que leur structure, incluant leurs attributs et leurs méthodes. Grâce à la lecture des diagrammes UML, la compréhension de l'architecture du code devient plus accessible. À l'instar de Merise, UML utilise un système de relations et de cardinalités qui met en évidence les points les plus critiques de l'architecture.

De bons diagrammes UML permettent non seulement de faire évoluer le code de manière précise lors des interventions, mais aussi d'illustrer les interactions du code à des clients ou des personnes non techniques.

  
<img src="https://cdn-images.visual-paradigm.com/guide/uml/uml-class-diagram-tutorial/01-uml-base-class-and-object-explained.png" alt="illustration non uml" style="width: 500px;">


Ainsi avec de simples informations renseignées on peut atteindre un certains niveau d'illustration. Bien qu'UML de ressemble pas à l'image illustré ci dessus, il permettra d'illustrer aussi clairement le liens entre plusieurs classes et la maniere dont elles sont caractérisées 


# Les attributs de classe 

- Public (+)
- Private (-)
- Protected (#)
- Package (~)
- Derived (/)
- Static (underlined)

<img src="https://media.geeksforgeeks.org/wp-content/uploads/20240118123645/Class-Notation.webp" alt="exemple de diagramme" style="width: 600px;">


Les attributs sont typables tous commes les méthodes que l'on peut observer dans la partie basse de chaque classes tel que start()
concernant les méthodes, il peut arriver que certaines soit écrite en PascalCase, mais cela est propre au langage illustré et non pas à l'UML
# Tous les types de relations entre classes

<img src="https://cdn-images.visual-paradigm.com/guide/uml/uml-class-diagram-tutorial/07-relationships-between-classes.png" alt="img relations classes" style="width: 600px;">


# Relations UML – Fiche récapitulative

| Relation      | Définition | Lien de connaissance | Remplaçable | Contexte d’utilisation |
|---------------|------------|-----------------------|--------------|-------------------------|
| **Association** | Une classe est liée à une autre, elles peuvent se connaître mutuellement ou non. | Unidirectionnel ou bidirectionnel | Oui | Quand deux classes ont une relation logique (ex : un `Client` possède une `Commande`) |
| **Héritage** | Une classe enfant hérite des attributs/méthodes d’une classe parent. (Le parent n’est pas conscient de ses enfants) | Enfant → Parent | Non | Pour représenter une hiérarchie (ex : `Chien` hérite de `Animal`) |
| **Réalisation** | Une classe implémente les méthodes d’une interface. | Classe → Interface | Oui | Lorsqu’on veut coder sur des interfaces pour séparer contrat et implémentation (ex : `ServiceEmail` réalise `INotification`) |
| **Dépendance** | Une classe utilise temporairement une autre (via paramètre, retour de méthode, variable locale, etc.). | Faible, unidirectionnel | Oui | Quand une classe utilise brièvement une autre sans la stocker (ex : un `Contrôleur` appelle un `Service`) |
| **Agrégation** | Une classe contient une autre classe sans en être responsable de son cycle de vie. | Oui | Oui | Quand une classe regroupe des objets existants sans en avoir la propriété (ex : une `Classe` agrège des `Élèves`) |
| **Composition** | Une classe contient une autre classe et en est responsable de son cycle de vie. | Oui | Non | Quand une classe ne peut pas exister sans l’autre (ex : une `Maison` contient des `Pièces`) |

# Toutes les cardinalités

<img src="https://cdn-images.visual-paradigm.com/guide/uml/uml-class-diagram-tutorial/11-associations-with-different-multiplicies.png" alt="img cardinalités classes" style="width: 300px;">

# Exemple concret & vue d'ensemble

<img src="https://cdn-images.visual-paradigm.com/guide/uml/uml-class-diagram-tutorial/17-class-diagram-example-order-system.png" alt="UML Complet" style="width: 600px;">



sources: 

[tutoriel - visual paradigm](https://www.visual-paradigm.com/guide/uml-unified-modeling-language/uml-class-diagram-tutorial/)

[tutoriel - geeksforgeeks](https://www.geeksforgeeks.org/unified-modeling-language-uml-class-diagrams/)

[explication approfondies des relations](https://www.lucidchart.com/pages/uml-class-diagram)

[Aller plus loin & entrainnement (patterns)](https://refactoring.guru/design-patterns/bridge)