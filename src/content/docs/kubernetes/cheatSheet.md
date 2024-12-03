---
layout: ../../../layouts/BaseLayout.astro
title: CheatSheet
description: Setup des stacks, les commandes courantes et exemples de configs
---

## cheatSheet officiel
https://kubernetes.io/docs/reference/kubectl/quick-reference/ 

```bash 
source <(kubectl completion bash) # set up autocomplete in bash into the current shell, bash-completion package should be installed first.
echo "source <(kubectl completion bash)" >> ~/.bashrc # add autocomplete permanently to your bash shell.
```

Stack LAMP

```bash
kubectl create deployment apache --image=httpd --dry-run=client -o yaml > apache-deployment.yaml
```
- kubectl create deployment apache --image=httpd : Crée un déploiement nommé apache avec l'image httpd.
- --dry-run=client : Simule la création sans vraiment l'appliquer, ce qui est utile pour générer des fichiers de configuration.
- -o yaml : Affiche la sortie en format YAML.
> apache-deployment.yaml : Redirige la sortie vers un fichier nommé apache-deployment.yaml.

Une fois la configuration terminée, on peut utiliser le deployment dans k8s

```bash
kubectl apply -f apache-deployment.yaml
```
