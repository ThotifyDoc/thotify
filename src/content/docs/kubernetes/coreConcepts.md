---
layout: ../../../layouts/BaseLayout.astro
title: Getting started
description: Initialiser k8s
---
## Namespaces

Kubernetes utilise les namespaces pour séparer ses ressources au sein d'un même cluster 
Les pods qui ne sont pas associés a un namespace sont directement associés au namespace par defaut de k8s.
Si j'effectue un 
```bash 
|kubectl get all
```
alors je n'aurais pas les pods issu des namespace, j'aurais uniquement ceux issu du namespace par défaut. 
En d'autre terme avec cette commande générale, je ne recevrais que les éléments qui ne sont associés a aucun namespace

## Les pods

Ce sont des objets éphémères issu de l'application de certaines configuration (yaml / ligne de commande)
Les pods se relanceront toujours tant qu'ils en ont la possibilités, ils se répliqueront si configuré ou nécessaire et ne seront jamais directement modifiable, il faudra toujours aller modifier la config a laquelle ils sont associés.