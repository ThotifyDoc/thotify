---
layout: ../../../layouts/BaseLayout.astro
title: Guide complet
description: Guide basé sur le livre "Guide pratique (modélisation des données et des traitements, manipulations avec le langage SQL, conception d'une application mobile Android ou IOS)"
---

<!-- Sommaire -->
<!-- 
# Avant propos
# L'approche systémique
# La séparation des données et des traitements
## Les données ou informations

## Les différents types d'informations
# L'approche par niveau 
## Le niveau conceptuel
## Le niveau organisationnel 
## Le niveau logique
## Le niveau physique

# Les dépendances fonctionnelles 
# Le modèle conceptuel de données  -->


# Avant propos 
Le systeme d'information (SI) est un ensemble de tâches complexes regroupées en module spécialisés qui composent l'applicatif informatique: le logiciel 

Ces tâches complexes sont généralement un assemblage de tâches plus simples. Ces tâches simples sont les briques de base de l'applicatif, à l'instar des briques qu'un mçon assemble pour ériger une maison. Le logiciel, tout comme une maison, a besoin d'un plan de conception réalisé par un architecte. 
Une maison conçue sans plan risque de présenter, une fois finie, plus d'une erreur de conception. Il en est de même pour un logiciel. Le logiciel sans études préalables, construit sans méthodologie, risque de surprendre son utilisateur !

La méthode **Merise** (acronyme de "méthode d'étude et de réalisation informatique par les sous ensemble ou pour les systeme d'entreprise") a comme objectif d'aider et de guider les SSII dans leurs phases d'analyse et de conception et dans le développement de l'applicatif.

C'est une équipe de chercheurs et d'ingénieurs aixois - Jean-Louis le Moigne, Hubert Tardieu, Dominique Nanci, Henri Heckenroth, Daniel Pascot, Bernard Espinasse - qui crée et met en place cette méthode, en posant les bases dans le milieu des années 1970

A l'époque, le ministère de l'Industrie y voit un excellent moyen pour standardiser et rationaliser les rapports existant entre les admninistrations et leurs sous-traitants. C'est pourquoi il finance quelque temps les recherches sur Merise. Le défi est de proposer des outils ou des méthodologies permettant aux donneurs d'ordres et aux développeurs de se comprendre et ainsi de mieux appréhender chacun de leur coté, avec leur propre culture profesionnelle, rejoindront ensuite Bernard Cohen, créateur de la société CECIMA qui distribue a ce jour le logiciel WinDesign. [...]

# Les différents types d'informations 
## Les informations élémentaire et mémorisables
Les informations élémentaire sont des informations dont les valeurs ne sont pas inventées, elle ne sont pas déductibles d'autre informations.
Par exemple un nom de client ou sa raison sociale ne peuvent pas être inventés. Une quantité commandée n'est pas non plus inventée.
Une information élémentaire doit aussi être atomique. C'est à dire non décomposable. 
Par exemple si l'information Adresse doit contenir "36, rue de la Paix 75000 Paris", elle peut etre décomposée en plusieurs informations élémentaires: 
- Numéro
- Nom de la voie
- Code postal
- Ville
Chaque valeur prise par une information est appelée une occurence. Par exemple l'information Nom peut avoir les occurences suivantes: 
- Baptiste
- Durand

## Les informations calculées
Les informations calculées sont déductibles des informations élémentaires 
Par exemple, le total d'une ligne de comande est le résultat de la multiplication du prix de vente hors taxes et de la quantité commandée. 

## Les traitements
Les traitements sont collectés, comme les informations, via un processus d'interview et d'étude des documents.
Ils peuvent être de deux sorte: **automatique et manuel**.
Ils sont déclenché par l'arrivé d'événements. 
La gestion des traitements sert à identifier les fonctionnalité selon une approche qui va du général au particulier et qui définit leur découpage et leur enchaînemment.  

## L'interview 
Une des phases du recueil d'informations est un entretien avec les différents actueurs de l'organisation. Cet entretien permet de définirle périmètre de l'application future. Les informations orales sont classées et regroupées en parties distinctes. Ainsi, les informations concernant l'enregistrement de données de l'oganisation sont regroupées 

# L'approche par niveaux
Pour la conception d'un SI, il est nécessaire de considérer quatre niveau d'étude:
- Le niveau conceptuel
- Le niveau organisationnel 
- Le niveau logique
- Le niveau physique

## Le niveau conceptuel 
Le niveau conceptuel consiste à concevoir le SI en faisant abstration de toute les contraintes techniques ou organisationnelles, et cela tant au niveau des données que des traiteements

Le niveau conceptuel répond a la question "quoi ?" (quoi faire, avec quelle données).
Le formalisme Merise employé est: 
- Le modele conceptuel des données (MCD)
- Le modele conceptuel des traitements (MCT) 

## Le niveau organisationnel 
Le niveau organisationnel a comme mission d'intégrer dans l'analyse les critères liés à l'organisation étudiée. Le niveau organisationnel fait préciser les notions de temporalité, de chronologie des opérations, d'unité de lieu, définit les postes de travail, l'accès aux bases de données ... 
Les questions posées, au niveau organisationnel, sont: 
- Qui ?
- Où ? 
- Quand ? 

Le formalisme Merise employé est: 
- Le modèle organisationnel des données (MOD)
- Le modèle organisationnel des traitement (MOT)

## Le niveau logique
Le niveau logique est indépendant du matériel informatique, des langages de programmation ou de gestion des données. C'est la réponse a la question "Avec quoi ? ".
Le formalisme est: 
- Le modèle logique des données (MLD)
- Le modèle logique des traitements (MLT)

## Le niveau physique
Le niveau physique permet de définir l'organisation réelle (physique) des données. Il apporte les solutions techniques, par exemple sur les méthode de stockage et d'accès à l'information. C'est la réponse à la question "Comment ?".
Le formalisme employé est 
- Le modèle physique de données (MPD)
- Le modèle physique de traitement (MPT)

Tableau récapitulatif 
| Niveau         | Données                        | Traitement                                   |
|----------------|--------------------------------|---------------------------------------------|
| Conceptuel     | Modèle conceptuel des données  | Modèle conceptuel des traitements           |
| Organisationnel| Modèle organisationnel des données | Modèle organisationnel des traitements  |
| Logique        | Modèle logique des données     | Modèle logique des traitements              |
| Physique       | Modèle physique des données    | Modèle opérationnel et physique des traitements |

## Les apports de Merise 
La force de la méthode Merise est de structurer les besoins des décideurs de façon simple et compréhensible. Merise améliore la communication entre les différents acteurs du processus de développement. Cette méthode, grâce à ses modèles, encadre le projet et, de ce fait protège les intervenants **d'un possible développement hors sujet**.

Suivre ce cheminement intellectuel peut aussi aider l'entreprise à mieux se connaître, à mieux se comprendre et ainsi à mieux communiquer. 

Le projet Merise s'articule autour d'un schéma directeur qui détermine et planifie le projet et ses enchaînements. 

# Le dictionnaire des données 
Pour être traitées de manière informatisée, les données doivent etre décrites dans un formalisme compris par le systeme informatique qui va les gérer. Voici les formats génériques utilisés: 
- Le type alphabétique (des caractères uniquements)
- Le type alphanumérique (des caractères, des chiffres)
- Le type nyumérique (les nombres)
- Le type date
- Le type logique (0-1 Vrai-Faux, Oui-non)

Suite à l'interview et à la collecte des documents, il est nécessaire de centraliser toutes les informations et les règles de gestion (calcul d'un taux de remise par exmeple) au sein d'un document. Ce document se nomme le dictionnaire des données

Le dictionnaire de données est un document qui permet de recenser, de classer et de trier toute informations (les données) collectées lors des entretiens ou de l'étude des documents. Le dictionnaire peut etre plus ou moins élaboré suivant le niveau de granularité souhaité. En voici un exemple:

| Nom              | Format         | Longueur | Type E | Type C | Règle de calcul | Règle de gestion | Document |
|------------------|----------------|----------|--------|--------|------------------|-------------------|----------|
| Numéro           | Numérique      |          | X      |        |                  |                   | Fiche    |
| Nom              | Alphabétique   | 30       | X      |        |                  |                   | //       |
| Prénom           | Alphabétique   | 30       | X      |        |                  |                   | //       |
| Adresse          | Alphanumérique | 50       | X      |        |                  |                   | //       |
| Code postal      | Alphanumérique | 10       | X      |        |                  |                   | //       |
| Ville            | Alphabétique   | 50       | X      |        |                  |                   | //       |
| Téléphone        | Alphanumérique | 15       | X      |        |                  |                   | //       |
| Mail             | Alphanumérique | 50       | X      |        |                  |                   | //       |
| Date d’adhésion  | Date           |          | X      |        |                  |                   | //       |


| Nom          | Format         | Longueur | Type E | Type C | Règle de calcul             | Règle de gestion | Document |
|--------------|----------------|----------|--------|--------|------------------------------|-------------------|----------|
| NumCli       | Numérique      |          | X      |        |                              |                   | Bristol  |
| Nom          | Alphabétique   | 30       | X      |        |                              |                   | //       |
| Prénom       | Alphabétique   | 30       | X      |        |                              |                   | //       |
| Adresse      | Alphanumérique | 50       | X      |        |                              |                   | //       |
| Code postal  | Alphanumérique | 10       | X      |        |                              |                   | //       |
| Ville        | Alphabétique   | 50       | X      |        |                              |                   | //       |
| CodeArticle  | Alphanumérique | 15       | X      |        |                              |                   | //       |
| Désignation  | Alphabétique   | 50       | X      |        |                              |                   | //       |
| PrixUnitaire | Numérique      |          | X      |        |                              |                   | //       |
| Qté          | Numérique      |          | X      |        |                              |                   | //       |
| Date         | Date           |          | X      |        |                              |                   | //       |
| TotalLigne   | Numérique      |          |        | X      | PrixUnitaire × Qté           |                   | //       |
| TotalFacture | Numérique      |          |        | X      | Somme des TotalLigne         |                   | //       |


# MCD

Introduction 

Le modèle conceptuel des données (MCD) introduit la notion d'entités, de relations et de propriétés. Nous allons commencer par voir certains aspects "théoriques" avant de plonger dans la pratique.

Le MCD décrit de façon formelle les données utilisées par le système d'information. La représentation graphique, simple et accessible, permet ç un non-informaticien de participer à l'élaboration de ce modèle. Les éléments de base constituant un modèle conceptuel ds données sont: 
- Les propriétés;
- Les entités;
- Les relations;


## Les notions a connaître 

## 1.2 Les entités ou objets

Comme il est aisé de le constater, les clients sont définis par certaines propriétés (numéro, nom, prénom...). Le fait de les regrouper amène naturellement à créer une entité **Clients**.

Le symbolisme retenu est le suivant :

| Entité Clients | Propriétés |
| :---: | :---: |
| Clients | Numéro |
| | Nom |
| | Prénom |
| | Adresse |
| | Code postal |
| | Ville |

### L'identifiant

Une de ces propriétés a un rôle bien précis ; c'est l'**identifiant**, nommé aussi la **clé**.

L'identifiant permet de connaître de façon **sûre et unique** l'ensemble des propriétés qui participent à l'entité.

Le nommage de l'identifiant évoluera au fil des diagrammes mais dans le MCD il doit être compris par tous les acteurs du projet.

## Les relations 

Le n représente la notion de « plusieurs » ; ici, nous avons représenté le fait qu'un client peut commander un ou plusieurs articles.

Il faut que nous nous posions les mêmes questions pour l'article :

Combien de fois au minimum un article peut-il être commandé par un client ?

Combien de fois au maximum un article peut-il être commandé par un client ?

Pour le minimum, nous pouvons reformuler la question de la façon suivante : y a-t-on des articles qui peuvent ne jamais être commandés ?

Si nous répondons oui, dans ce cas la cardinalité minimale est 0.

Et pour le maximum : y a-t-on des articles qui peuvent être commandés plusieurs fois ?

Nous pouvons espérer que oui. Dans ce cas, la cardinalité maximale est n.

![MCD sans relations](/thotify/merise/mcd_no_relation.jpeg) 
