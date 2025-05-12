---
title: UX UI Design - Infos design system
description: Infos sur la création de design system
---

# Infos DESIGN SYSTEM

## Introduction

- On constate 30 à 40% de gain de temps de dev avec un bon DS
- Annuaires de DS Publics :
  - Fr : [https://designsystems.fr/](https://designsystems.fr/)
  - Inter : [https://adele.uxpin.com/](https://adele.uxpin.com/))

## Articles à lire ou à tester :

- A tester : [https://zeroheight.com/](https://zeroheight.com/) (Apparemment Decathlon utilise ZeroHeight, c’est pour les très grosses boites, comme StoryBook). Découvert dans une interview avec son créateur : https://www.youtube.com/watch?v=hfF1oFXc7dw
  C’est une plateforme de documentation pour présenter son Design System.. Se connecte à Storybook ou Figma et facilite la doc d’un DS. C’est un peu comme NOTION mais pour les DS. Y’a une version Free pour en faire un pour essayer.
- **Audrey Hacq :** Lead Product Designer experte en DS (à voir ses conf sur YouTube)

---

### Les différentes phases du DS système selon Audrey Hacq : 3 phases

- **Définir ce qu’on va faire :**
  - La vision : De quelle idée on part au départ et quel est votre critère de reussite
  - Le périmètre : Mobile (responsive) ? interne ? externe ?
  - La cible : Qui va se servir du DS ?
  - La gouvernance : qui va gérer et payer le DS ?
- **Comment on embarque les personnes qui vont utiliser le DS ?**
  - Organisation d’Atelier avec les différentes parties (Inventaire de l’existant)
  - Atelier sur les Patterns (éléments répétables de l’interface, atomes, visuels et fonctionnels …)
  - L’objectif des ateliers et de documenter le DS sur l’utilisation des différents éléments (Usage, ce qu’il faut faire, pas faire avec chaque éléments …etc)
  - Atelier de définition des priorités en fonction de la fréquence des composants et la difficulté de développement.
  - Trouver le nom du DS : le DS est un PRODUIT ! Donc il se market !
- **Comment on implémente ? même composants mais librairie et techno différentes suivant si c’est pour les Web, dev, natif …etc.**
  - Librairie de Design avec Starter Kit
  - Librairie de Code (React, Angular …etc en fonction de l’entreprise) fournis via un Storybook pour voir le comportement des compos en live
  - Plateforme en ligne pour regrouper tous le DS (Ex.: ZeroEight)
- **Communiquer sur le DS dans tous les medias de l’entreprise**
- **Accompagnement des utilisateurs (Slack dédié ..etc)**
- **Encourager les contributions des équipes**
- **Faire évoluer le DS (Trello, sprint permanent …)**
- **Faire régulièrement des rapport chiffres (KPI) pour mesurer le succès du DS**
- **Monitorer le versioning des DS**

### Centraliser ses DS dans STORYBOOK :

https://storybook.js.org/

Permet de mettre le design et le dev au même endroit.

On peut y montrer les **Design Tokens**, **les Templates**, tous les composants en isolation ou même des pages complètes…etc.

On peut notamment faire des **tests de non régression (TNR)** sur les visuels mais aussi sur le code :

_NOTE : Un test de non régression, ou TNR **permet de vérifier qu'il n'y a pas eu de régressions sur une application ou un site web**. Il va vérifier que l'ajout de fonctionnalités ou tout autres modifications n'auront pas impacté les fonctionnalités codées en amont._

_NOTE 2 : Il est bon aussi d’avoir des connaissances sur GitHub pour le faire fonctionner avec._

<img src="/thotify/src/assets/design-system/cycle.png" alt="Cycle de vie DS" title="Cycle de vie DS" style="width: 600px;">

Exemple du DS de TALEND sur SB : https://design.talend.com/

Dans Storybook on peut développer dans n’importe quel framework ou langage, même HTML. Mais on peut aussi faire sa doc au format **\*.mdx** (du markdown dans le quel on peut mettre du JS). C’est très pratique car celà permet de crée un template de documentation de composants que tous le monde utilisera. Avec par exemple pour chaque composant :

- Son nom
- Une description
  - Le zoning du composant (ne pas oublier dans le zoning d’indiquer les composant optionnels, en contour pointillé par exemple)
    <img src="/thotify/src/assets/design-system/zoning.png" alt="Zoning" title="Zoning" style="width: 600px;">
- Le style par defaut + le code prêt à l’emploi avec une ligne d’explication
- Une autre version du compo si besoin + code prêt à l’emploi + explication
- Les différents states si le composant est dynamique
- Les interactions
- Contenu : comment on l’utilise et ce qu’on peut mettre dans ce composant (quels type d’image, texte …et), des blocs “do and don’t”
- L’usage : Un encart où on peut modifier les différents paramètres et voir en live ce que ça donne

### On peut coupler SB avec CHROMATIC : https://www.chromatic.com/

Relié à GitHub, cela permet de faire des tests de non régression visuel et de comparer deux versions d’un élément quand on fait un changement. Ca permet de remplacer les pull request de github lorsqu’il s’agit uniquement d’un changement visuel et ça va plus vite.

### DESIGN TOKENS : Exemple de DS par TALEND : https://design.talend.com/

Dans les Design Tokens, on peut spécifier une partie “association de couleur” qui prendra les couleurs des différentes par ties et imposera lesquelles mettre avec lesquelles. Storybook peut indiqué le niveau AA, AAA de ces associations. AA est très bien déjà et l’indication est intéressante pour déterminer la qualité de la lisibilité et de l’accessibilité.

Il faut aussi déterminer une **taxonomie** pour les noms qui font comprendre immédiatement à quoi serve les éléments. Exemple (ENGIE) :
