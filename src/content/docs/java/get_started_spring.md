---
layout: ../../../layouts/BaseLayout.astro
title: A JAVA SpringBoot Guide
description: A guide in JAVA Springboot
---
<img src="/thotify/logos_officials/spring_boot.png" alt="JAVA springboot official logo " title="Cycle de vie DS" style="width: 350px;">
/thotify/docker_guide/dockerhub_search.png
# Installer Java (17) & Maven(3.9)
- [Java 17 download](https://www.oracle.com/fr/java/technologies/downloads/#java17)
- [Apache Maven](https://maven.apache.org/download.cgi)
  - **Dézipper** le fichier dans **C:\Program Files\apache-maven**
  - **Gardez** le chemin qui mène au dossier **bin** pour l'ajouter à la **variable d'environnement PATH**
  - Ouvrir un nouveau terminal et tapez &
  ```bash
   mvn --version
   ```
  - Vous devez obtenir une réponse positive du terminal 

## Démarrer un projet 
- Aller sur [Spring Initializr](https://start.spring.io/) et paramétrez votre projet 
  - **Project** : Maven
  - **Language** : Java
  - **Spring Boot** : 3.4.3
  - **Java version** : 17 ( en rapport avec votre version de Java installée)
  - **Nommer** votre artifact avec le nom du projet 
  - **Ajouter les dependences** :
    - **Spring Web**, pour un test simple
    - **Spring Data JPA**, pour utiliser une BDD
    - **H2 Database**, une BDD in memory
  - Générer le projet 
- Récupérer le project .zip

## Maven
**Maven** est un outil de gestion de projet et d'**automatisation de build pour Java**, permettant de gérer les dépendances, la compilation, les tests et le déploiement via un fichier de configuration

## Fichiers importants
- **pom.xml** ➡️ Le fichiers des dépendances **Maven**




