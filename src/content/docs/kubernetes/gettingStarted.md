---
layout: ../../../layouts/BaseLayout.astro
title: Getting started
description: Initialiser k8s
---
## Installation
Installer K8s, voir la doc en fonction de son OS

## Choix de la distribution



## Installation du dashboard

Le dashboard est un outils de choix pour visualiser les différents composants de kubernetes que vous allez générer
Il permet de voir ce qui tourne, ce qui crash en continue ainsi que ce qui se réplique et la consommation de chaque composant.

Le dashboard est disponible à l'installation de minikube, mais avec rancher ou la sous distribution K3s il faut l'installer manuellement

Apres avoir installé k8s ainsi que sa distribution, rendez-vous sur le lien du dashboard
https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/

Installer HELM 
https://helm.sh/fr/docs/intro/install/

Ajouter le repo du dashboard 
```bash
helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
# Deploy a Helm Release named "kubernetes-dashboard" using the kubernetes-dashboard chart
helm upgrade --install kubernetes-dashboard kubernetes-dashboard/kubernetes-dashboard --create-namespace --namespace kubernetes-dashboard
```

Activer un proxy pour accéder facilement au localhost et ne pas a avoir exposer un **ingress**
```bash
    kubectl -n kubernetes-dashboard port-forward svc/kubernetes-dashboard-kong-proxy 8443:443
    kubectl proxy
```

Générer des credentials pour vous connecter au dashboard qui contient les données de tous les nodes
https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md

La génération des yaml peut se faire en un voir 2 fichiers (dans un soucis de responsabilité unique)

Enfin au moment d'accéder au dashboard il faudra générer un token, ce token peut se configurer pour durer dans le temps, cette commande permet de générer un token standard
```bash
    kubectl -n kubernetes-dashboard create token admin-user
```