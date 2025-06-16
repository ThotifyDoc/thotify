---
layout: ../../../layouts/BaseLayout.astro
title: Getting started
description: Guide pour comprendre rapidement les étapes de conception d'un clicker intégrant docker, cicd, mongodb, des test 
---
# Qu'est-ce qu'un clicker ?

C'est un type de jeu ou d’application où l’utilisateur effectue des actions répétitives (souvent des clics) pour accumuler une ressource ou progresser. Le principe repose sur des interactions simples, mais addictives, qui peuvent évoluer avec des mécaniques d'automatisation et de progression.

exemple: https://cookieclicker.com/
ps: il existe aujourd'hui des cliquer innovant qui propose un gameplay hybride. Libre a vous de prendre la direction que vous souhaitez. Attention a ne pas perdre trop de temps sur des fonctionnalités qui ne sont pas demandées. Faites la structure globale et amusez vous une fois que le projet tient la route.

Exemple minimal: 
    - Pas de module d'authentification. Site qui enregistre la session courante dans le localStorage (utilisation d'un id arbitraire, application destiné a un seul     utilisateur)
    - Png/svg/pdf simple a cliquer pour générer de la monnaie
    - Plusieurs Png/svg/pdf pour les upgrade 
    - Requete a chaque clique, update du localstorage et des attribut du cliquer en fonction des achats d'amélioration et du nombre de clicks
    - Fin

# Qu'est-ce que mongdb ? 

https://www.youtube.com/watch?v=-bt_y4Loofg

MongoDB stocke les données dans des documents flexibles de type JSON , ce qui signifie que les champs peuvent varier d'un document à l'autre et que la structure des données peut être modifiée au fil du temps

Le développeur doit définir des documents, semblable a des entités. Mais contrairement a SQL les documents peuvent évoluer, changer sans que cela ne vienne casser la structure de la base de données. Car chaque document est a la fois indépendant et relié a une étiquette qui le défini en tant que document. 

Les relation entre les différents types de documents sont possible mais déconseillé car ce n'est pas optimisé pour mangoDb. 
Une bonne pratique est d'utiliser les relation quand le nombre de documents relié est limité

Dans les cas d'optimisation de base de donnée mangoDB il est important de vieller a la définition des clé d'indexation mais concernant ce projet ce devrait pas être nécessaire

## Client mongdb 
npm install mongodb # client code

Pour requeter **mongodb** et vous assurer qu'il est bien installé vous pouvez utiliser **mongosh**. Il s'installe localement et vous permettra à la fois de tester votre configuration locale comme votre configuration dockerisé

**mongosh** est le client moderne de mongodb. Utilisable pour faire des test dans un terminal. Pas sur que vous ayez besoin de ce client

**mongod** daemon qui permet de lancer le serveur. Pas sur que vous ayez besoin de cette commande



# SCOPE DIPLOME:
J'ai rédigé ce sujet et ce getting started afin de vous faire acquérir les compétences du RNCP CDA 2023

Vous êtes libre en fonction des projets que vous avez déjà réalisé de vous limiter en terme de fonctionnalité, sinon de les réaliser toutes

Compétences visées: 
- Docker (mongodb (docker compose image: mongo) + front/back (ça sera surement un DockerFile qui copie vos projets et qui est build dans votre docker compose))
- NoSQL (conseil: mongodb)
- CICD (github action: choisir le template approprié)
- Test unitaire et Fonctionnel (jest/winston. cypress pour aller plus loin)

# etape 1
Générer une API REST avec au choix express ou fastify (nodejs conseillé pour avoir une stack fulljs entre le front et le back)

# etape 2
Dockeriser mangodb 
- docker compose up -d
- mongosh "mongodb://hardjojo:hardjojo@0.0.0.0:27017" pour tester la connexion
  
# etape 3
Se connecter a la db dockerisé a l'aide de l'api

# etape 4 
dockeriser express à l'aide d'un dockerfile qui sera buildé dans un docker compose
changer les adresse de connexion à docker (utiliser localhost si vous mettez vos 2 services sur le meme docker network)

# etape 5 
Concevoir l'application Clicker, trouver les entités
Choix généraux qui s'offre a vous pour créer vos documents: 
- User
- Clicker 

Choix simple, tout réunir dans un seul document: 
- Clicker

# etape 6
Trouver un modèle frontend a incrément (reprenez une image de cookie si vous n'avez pas d'inspiration) 

# etape 7 
Trouver un leger systeme économique qui implique des mechaniques d'incrémentation tel que: 
1 clic = 2 cookies 
1 seconde = 1 increment de cookie 
1 clic = % de chance de crit et d'avoir un increment = benefices critiques 

click_unit = 2
click_second = 1
clic_crit_chance = 10%
clic_crit_gain = 250% (click_unit)

A vous d'implémenter ce qui vous parle le plus. C'est complétement arbitraire

# etape 8 bonus
Faire un module de connexion front/back pour sauvegarder l'évolution du click afin de pouvoir se comparer mondialement aux autre joueurs

# etape 10
Faire un github action permettant de vérifier les dépendances et le montage du projet a travers github, sans le déployer pour autant, uniquement faire des test de déploiement 

# etape 11 
(optionnel) - Ajouter un test end to end (cypress) pour démontrer le l'utilisation de votre application 
Ajouter des test unitaire, test fonctionnel pour tester les fonctionnalités principales tel que 
- Module du connexion
- quelques fonctionnalités cliquer, front et back 



