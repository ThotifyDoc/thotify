---
layout: ../../../layouts/BaseLayout.astro
title: Getting started
description: Initialiser k8s
---

# Introduction
Over 75% of projects in the CNCF are written in Go. Kubernetes, Terraform, Docker, Helm, Istio, and many other CNCF tools are written in Go.

Kubernetes (K8s) est une plateforme open-source développée par Google (et maintenant maintenue par la CNCF) qui permet de **déployer, gérer et mettre à l’échelle automatiquement** des conteneurs (comme Docker) de façon déclarative.

---

## Pourquoi Kubernetes ?

Tant que votre application conteneurisée est déployée sur **une seule machine**, et si cela suffit niveau disponibilité, il **n’est pas nécessaire d’utiliser Kubernetes**. Cependant, K8s devient indispensable dans les cas suivants :

- Besoin de haute disponibilité, scalabilité ou tolérance aux pannes
- Répartition automatique des charges
- Gestion simplifiée des volumes et du réseau
- Auto-récupération des services tombés
- Déploiement multi-environnement

Quelques chiffres intéressants :
- Massivement utilisé par les entreprises tech
- Soutenu par une grande communauté
- L'un des standards de l’orchestration de conteneurs

---

# Architecture

## Control Panel 
Ainsi, lorsque vous utilisez kubectl pour gérer le cluster, en back-end, vous communiquez avec le serveur d'API via des API REST HTTP . Cependant, les composants internes du cluster, comme le planificateur, le contrôleur, etc., communiquent avec le serveur d'API via gRPC .

La communication entre le serveur API et les autres composants du cluster s'effectue via TLS pour empêcher tout accès non autorisé au cluster.


## Etcd

etcd
Kubernetes est un système distribué et nécessite une base de données distribuée performante, telle qu'etcd, qui prend en charge sa nature distribuée. Elle agit à la fois comme un service back-end de découverte et comme une base de données. On peut la qualifier de cerveau du cluster Kubernetes.

## Kubelet
Mini orchestrateur qui ne gère pas le runtime
Kubelet est un composant agent qui **s'exécute sur chaque nœud du cluster**. Il ne s'exécute pas en tant que conteneur mais plutôt en tant que **démon**, géré par **systemd**.

Voici quelques-uns des éléments clés de kubelet.

Kubelet utilise l'interface **gRPC CRI (container runtime interface)** pour communiquer avec le runtime du conteneur.
Il expose également un point de terminaison HTTP pour diffuser des journaux et fournit des sessions d'exécution pour les clients.
Utilise l'interface de stockage de conteneur (CSI) gRPC pour configurer les volumes de blocs.
Il utilise le **plugin CNI** configuré dans le cluster pour **allouer l'adresse IP du pod** et configurer les routes réseau et **les règles de pare-feu nécessaires** pour le pod.

## Containerd

Qu’est-ce que containerd ?
containerd est un runtime de conteneurs développé par Docker qui gère le cycle de vie d’un conteneur sur une machine physique ou virtuelle (c’est-à-dire un hôte). Il crée, lance, arrête et supprime les conteneurs. Il peut également extraire des images de conteneurs des registres, monter le stockage et activer la mise en réseau d’un conteneur.

En février 2019, containerd est devenu un projet officiel au sein de la Cloud Native Computing Foundation (CNCF), au même titre que Kubernetes, Prometheus, Envoy et CoreDNS.

## Proxy Kube 

Kube-proxy est un démon qui s'exécute sur chaque nœud en tant que daemonset . Ce composant proxy implémente le concept de services Kubernetes pour les pods (DNS unique pour un ensemble de pods avec équilibrage de charge). Il utilise principalement les proxys UDP, TCP et SCTP et ne comprend pas HTTP.

Lorsque vous exposez des pods à l'aide d'un service (ClusterIP), Kube-proxy crée des règles réseau pour envoyer le trafic vers les pods backend (points de terminaison) regroupés sous l'objet Service. Autrement dit, l'équilibrage de charge et la découverte de services sont gérés par le proxy Kube.

Vous ne pouvez pas envoyer de ping au ClusterIP car il est uniquement utilisé pour la découverte de services, contrairement aux IP de pod qui sont pingables.



# Concepts & Composants

## Namespaces

Les **namespaces** permettent d’isoler les ressources dans un cluster K8s.

- Sans namespace explicite, les ressources vont dans le `default`.
- Commande : `kubectl get all` ne montre que les ressources du namespace courant.
- Utilise `kubectl get all --all-namespaces` pour tout afficher.

## Pods

- Un **pod** est l’unité de base de Kubernetes.
- Contient un ou plusieurs conteneurs partageant IP, réseau et stockage.
- Géré automatiquement : s’il crash, il est relancé.
- Créé par des objets comme Deployment, DaemonSet, etc.

---

## Objets principaux

| Objet         | Rôle                                                                 |
|---------------|----------------------------------------------------------------------|
| **Pod**       | Unité d'exécution contenant un ou plusieurs conteneurs.              |
| **Deployment**| Crée et gère des pods réplicables (ex: frontend, API, workers).      |
| **DaemonSet** | 1 pod par nœud (ex: monitoring, agent de log).                       |
| **CronJob**   | Lance un pod à intervalle régulier (tâches planifiées).              |
| **StatefulSet**| Gère des pods avec identité stable (ex: base de données).           |
| **Service**   | Point d’accès stable vers un ou plusieurs pods.                      |
| **Ingress**   | Reverse proxy pour exposer HTTP(S) avec routage par chemin/domaine.  |
| **Secret**    | Stocke des infos sensibles (mdp, tokens).                            |
| **ConfigMap** | Stocke des configs non sensibles (variables, fichiers).              |

---

## Types de Services

| Type de service  | Accessible depuis           | Description rapide                                                                 |
|------------------|-----------------------------|-------------------------------------------------------------------------------------|
| `ClusterIP`      | *Interne au cluster*        | Par défaut. Utilisé pour les communications internes entre pods.                   |
| `NodePort`       | *IP de chaque nœud*         | Ouvre un port statique (`<IP-node>:port`). Simplicité mais peu flexible.          |
| `LoadBalancer`   | *Internet (Cloud Provider)* | Crée un vrai Load Balancer (cloud uniquement ou MetalLB en local).                |
| `ExternalName`   | *Redirection DNS*           | Redirige vers un DNS externe (ex: `api.example.com`).                              |
| **Ingress**      | *HTTP(S) unique*            | Reverse proxy pour exposer plusieurs services via un seul point d’entrée.         |

---

## LoadBalancer

Fonctionnement (en environnement Cloud) :

1. Tu déclares un `Service` avec `type: LoadBalancer`.
2. Kubernetes demande à ton cloud provider (via leur API) de créer un load balancer réel.
3. Le provider :
   - Crée le LB
   - Lui donne une IP publique
   - Route le trafic vers les nodes du cluster
4. Le service distribue le trafic vers les bons pods.

📝 *En local, utilise [MetalLB](https://metallb.universe.tf/) pour simuler ce comportement.*

---

## Ingress (et pourquoi le préférer)

| Option        | ✅ Avantages                          | ❌ Inconvénients                                     |
|---------------|--------------------------------------|-----------------------------------------------------|
| NodePort      | Facile pour tester en local          | Moins sécurisé, peu flexible                        |
| LoadBalancer  | Propre en cloud                      | Cher (un LB par service), inutile sans cloud        |
| Ingress       | Idéal pour exposer plusieurs services | Nécessite un Ingress Controller (NGINX, Traefik...) |

### Ingress = Le choix moderne

- Un seul point d’entrée
- Routage par chemin (`/api`, `/ws`) ou domaine (`api.monsite.com`)
- Support du HTTPS, Let’s Encrypt, cert-manager
- Scalable, maintenable, propre

---

## ConfigMap / Secret

| Ressource    | Utilité                             |
|--------------|--------------------------------------|
| **ConfigMap**| Paramètres non sensibles (env, fichiers config) |
| **Secret**   | Données sensibles (tokens, mdp...)   |

---

## Stockage : Volume / PVC

- Un pod est **éphémère**, donc ses données disparaissent à sa mort.
- Pour persister les données :
  - Utilise un `PersistentVolume`
  - Requis : `PersistentVolumeClaim` (PVC) pour s’y connecter
- Utilisé avec `StatefulSet` ou pour les bases de données.


## Probes

- **Liveness Probe** : redémarre le conteneur s’il ne répond plus.
- **Readiness Probe** : signale si le conteneur est prêt à recevoir du trafic.
- Important pour la santé et la stabilité des services.

## Les Quorums

K8s utilise etcd comme base de données centrale.
Etcd fonctionne à quorum :

Si tu as 3 nœuds etcd → quorum = 2

Si tu as 5 nœuds etcd → quorum = 3

Et ainsi de suite : quorum = (N / 2) + 1

➡️ Si le quorum n’est pas atteint, plus aucune écriture ne peut avoir lieu.

| Cas                       | Quorum utile pour...                                       |
| ------------------------- | ---------------------------------------------------------- |
| Kubernetes (etcd)         | Éviter corruption de l’état du cluster                     |
| Kafka                     | Gérer qui est le leader, assurer la cohérence des messages |
| Base de données répliquée | Assurer que la majorité a bien reçu les écritures          |
| Élection de leader        | Décider qui prend le contrôle sans conflit                 |




























# Ressources
![Comprendre K8s dans le détails, la plupart des liens ci-dessous sont tirés de cet article](https://devopscube.com/kubernetes-architecture-explained/)
![Comprendre la concurrence RAFT](https://raft.github.io/) 
![Théorème CAP & concurrence ](https://en.wikipedia.org/wiki/CAP_theorem?ref=devopscube.com)
![Gestion de la planification avancée](https://github.com/kubernetes/enhancements/blob/master/keps/sig-scheduling/624-scheduling-framework/README.md)