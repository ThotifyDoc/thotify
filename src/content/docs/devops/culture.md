---
layout: ../../../layouts/BaseLayout.astro
title: Devops culture
description: Une prise de note de divers articles pour mieux introduire le domaine du devops
---


# Ressources

https://devopscube.com/list-of-devops-blogs-and-resources/#must-read-engineering-blogs-for-devops
https://enix.io/fr/blog/kubernetes-k8s/
https://devopscube.com/kubernetes-architecture-explained/#1-kubelet
https://en.wikipedia.org/wiki/CAP_theorem?ref=devopscube.com
https://www.puppet.com/resources/state-of-devops-report?ref=devopscube.com
https://devopscube.com/list-of-devops-blogs-and-resources/


# Comment apprendre 


![Guide complet](http://devopscube.com/become-devops-engineer/)

Lorsque j'ai débuté mon parcours DevOps, je passais des journées entières à apprendre et à faire des recherches sur Google et les forums pour découvrir de nouveaux outils et technologies. Cette époque est révolue. Aujourd'hui, une simple invite suffit pour obtenir les réponses en quelques secondes.

## Linux

![Représentation de linux dans le monde](/thotify/k8s_&_devops/linux-usage-1.png)
![Distribution utilisées](thotify/k8s_&_devops/linux-vendor-allocation-min-1.png)


## Composants d'infrastructure

| Réseautage | Stockage |
|------------|----------|
| 1. Modèle OSI/TCP-IP | 1. SAN |
| 2. Topologies de réseau | 2. Sauvegardes |
| 3. Notations CIDR | 3. NFS |
| 4. Sous-réseaux | 4. *(non spécifié)* |
| 5. Réseau public | 5. Stockage d'objets |
| 6. Réseau privé | 6. IOPS/débit/latence du disque |
| 7. Adresses IP statiques/dynamiques | 7. Bases de données |
| 8. Pare-feu | 8. Magasins de clés-valeurs |
| 9. Proxy | |
| 10. NAT | |
| 11. DNS public et privé | |
| 12. VPN | |
| 13. Protocoles IPv4 et IPv6 | |

---

| Haute disponibilité | Authentification unique |
|---------------------|--------------------------|
| 1. Clusters | 1. Active Directory/LDAP |
| 2. Mécanismes de basculement | 2. SAML |
| 3. Reprise après sinistre | |
| 4. Mise à l'échelle verticale | |
| 5. Mise à l'échelle horizontale | |

---

| Sécurité | Équilibreurs de charge |
|----------|------------------------|
| 1. Certificats SSL | 1. Équilibreurs de charge L4 |
| 2. Infrastructure PKI | 2. Équilibreurs de charge L7 |
| 3. Sécurité Zero Trust | 3. Algorithmes d'équilibrage de charge |
| 4. Rotation des mots de passe/secrets | 4. Proxy inverse |
| 5. Conformité de sécurité | |
| 6. VPN site à site | |
| 7. VPN client à site | |


## Distribution du marché 

[distribution du marché cloud en 2024](/thotify/k8s_&_devops/18819.jpeg)
![source](https://www.statista.com/chart/18819/worldwide-market-share-of-leading-cloud-infrastructure-service-providers/?ref=devopscube.com)




















### Systemd

# Qu’est-ce que systemd ?

Systemd est un ensemble de démons, de bibliothèques et d'outils conçus pour gérer :

- le démarrage du système (init),
- le lancement/arrêt des services,
- la gestion des sessions utilisateurs,
- la journalisation des logs (via `journald`),
- le montage des systèmes de fichiers,
- la gestion des timers (crons),
- et plus encore.

# Composants clés de systemd

| Composant    | Description                                      |
|--------------|--------------------------------------------------|
| `systemctl`  | Commande principale pour gérer les services      |
| `journalctl` | Accès aux logs du système                        |
| `*.service`  | Fichier de configuration d’un service            |
| `*.timer`    | Alternative moderne à cron                       |
| `target`     | Regroupe plusieurs services (équivalent runlevel)|

# Pourquoi c’est important en DevOps ?

## Gestion des services
Démarrer, arrêter, redémarrer, activer des services comme Nginx, Docker, PostgreSQL, etc.

## Automatisation et scripts d’infrastructure
Il est courant d’écrire des services personnalisés (`.service`) pour des agents ou des processus à déployer automatiquement.

## Supervision et débogage
`journalctl` permet d’inspecter facilement les logs système, essentiel pour comprendre ce qui ne va pas lors de bugs ou crashs.

## Déploiement continu / CI-CD
Systemd est souvent utilisé pour démarrer automatiquement une application après une mise à jour ou un redémarrage.

## Remplacement de cron
Les `.timer` de systemd sont plus puissants et flexibles que `cron` pour les tâches programmées.

## Infrastructure as Code
Définir des services via des fichiers `.service` permet une gestion déclarative, pratique et reproductible, un principe fondamental en DevOps.
