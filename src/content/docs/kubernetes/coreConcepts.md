---
layout: ../../../layouts/BaseLayout.astro
title: Getting started
description: Initialiser k8s
---

# Introduction
Plus de 75 % des projets de la CNCF sont écrits en Go. Kubernetes, Terraform, Docker, Helm, Istio, et de nombreux autres outils de la CNCF sont développés en Go.

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

## Serveurs et agents

Un nœud de serveur est défini comme un hôte exécutant la k3s servercommande, avec des composants de plan de contrôle et de banque de données gérés par K3s.
Un nœud d'agent est défini comme un hôte exécutant la k3s agentcommande, sans aucun composant de banque de données ou de plan de contrôle.
Les serveurs et les agents exécutent le kubelet, l'environnement d'exécution du conteneur et le CNI. Consultez la documentation sur les options avancées pour plus d'informations sur l'exécution de serveurs sans agent.

[Illustration entre serveur et agent](/thotitfy/k8s_&_devops/how-it-works-k3s-revised-9c025ef482404bca2e53a89a0ba7a3c5.svg)

## Cas concret de la doc 
Les nœuds d'agent sont enregistrés avec une connexion WebSocket initiée par le k3s agentprocessus, et cette connexion est maintenue par un équilibreur de charge côté client, exécuté dans le cadre du processus d'agent. Initialement, l'agent se connecte au superviseur (et à kube-apiserver) via l'équilibreur de charge local sur le port 6443. L'équilibreur de charge gère une liste de points de terminaison disponibles. Le point de terminaison par défaut (initialement unique) est initialisé par le nom d'hôte de l' --serveradresse. Une fois connecté au cluster, l'agent récupère une liste d'adresses kube-apiserver à partir de la liste des points de terminaison du service Kubernetes dans l'espace de noms par défaut. Ces points de terminaison sont ajoutés à l'équilibreur de charge, qui maintient ensuite des connexions stables à tous les serveurs du cluster, fournissant ainsi une connexion à kube-apiserver qui tolère les pannes de serveurs individuels.

Les agents s'enregistreront auprès du serveur à l'aide du secret du cluster de nœuds, ainsi que d'un mot de passe généré aléatoirement pour le nœud, stocké dans /etc/rancher/node/password. Le serveur stockera les mots de passe des nœuds individuels sous forme de secrets Kubernetes, et toute tentative ultérieure devra utiliser le même mot de passe. Les secrets des mots de passe des nœuds sont stockés dans l' kube-systemespace de noms, avec des noms utilisant le modèle <host>.node-password.k3s. Ceci permet de protéger l'intégrité des identifiants de nœuds.

Si le /etc/rancher/noderépertoire d'un agent est supprimé ou si vous souhaitez rejoindre un nœud sous un nom existant, supprimez-le du cluster. Cela effacera l'ancienne entrée du nœud et son mot de passe secret, et permettra au nœud de rejoindre le cluster.

Si vous réutilisez fréquemment des noms d'hôtes, mais que vous ne parvenez pas à supprimer les mots de passe secrets des nœuds, un identifiant de nœud unique peut être automatiquement ajouté au nom d'hôte en lançant les serveurs ou agents K3s à l'aide de l' --with-node-idoption. Lorsque cette option est activée, l'identifiant de nœud est également stocké dans /etc/rancher/node/.

## Control Panel 
Ainsi, lorsque vous utilisez kubectl pour gérer le cluster, en back-end, vous communiquez avec le serveur d'API via des API REST HTTP . Cependant, les composants internes du cluster, comme le planificateur, le contrôleur, etc., communiquent avec le serveur d'API via gRPC .

La communication entre le serveur API et les autres composants du cluster s'effectue via TLS pour empêcher tout accès non autorisé au cluster.


## Etcd

etcd
Kubernetes est un système distribué et nécessite une base de données distribuée performante, telle qu'etcd, qui prend en charge sa nature distribuée. Elle agit à la fois comme un service back-end de découverte et comme une base de données. On peut la qualifier de cerveau du cluster Kubernetes.

## Kubelet (agent)
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

## ClusterIP

ClusterIP est le type par défaut des Services. Il expose un Pod à l’intérieur du cluster uniquement (pas à l’extérieur).
Très utilisé pour la communication interservices, même si on ne le voit pas toujours directement.

## Objets principaux

| Objet         | Rôle                                                                 |
|---------------|----------------------------------------------------------------------|
| **Pod**       | Unité d'exécution contenant un ou plusieurs conteneurs.              |
| **Deployment**| Crée et gère des pods réplicables (ex: frontend, API, workers), permet de configurer les replicaSet (on les configure tjrs les replica, jamais les replicaSet).      |
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

## ConfigMap et Secret

ConfigMap pour des données non sensibles,
Secret pour des données sensibles (chiffrées en base64, pas vraiment "sécurisées" au repos mais mieux que rien).


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

Ingress = Objet Kubernetes
Ingress Controller = Pod qui implémente cet objet (ex : nginx, traefik)

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

## RBAC Authorization

L'autorisation RBAC utilise lerbac.authorization.k8s.io Groupe APIpour piloter les décisions d'autorisation, vous permettant de configurer dynamiquement les politiques via l'API Kubernetes.

Pour activer RBAC, démarrez leserveur API avec l' --authorization-configindicateur défini sur un fichier qui inclut l' RBACautorisateur ; par exemple :

manifest example: 

  apiVersion: apiserver.config.k8s.io/v1
  kind: AuthorizationConfiguration
  authorizers:
    ...
    - type: RBAC
    ...

L'API RBAC déclare quatre types d'objets Kubernetes : Role , ClusterRole , RoleBinding et ClusterRoleBinding . Vous pouvez décrire ou modifier le RBAC. objets en utilisant des outils tels que kubectl, comme tout autre objet Kubernetes.

![Voir doc pour en apprendre plus sur: Role, ClusterRole, RoleBinding et ClusterRoleBinding](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)

## Other orchestrator 

### Nomad 

[guide](https://blog.cloudflare.com/how-we-use-hashicorp-nomad/?ref=devopscube.com/)
[Illustration](/thotify/k8s_&_devops/image3.png)


## Tools

## For Dev Environment

1. Vagrant  
2. Docker Desktop  
3. Minikube (k8s)  
4. Minishift (k8s)  
5. Kind (k8s)  

## For Infrastructure Provisioning

1. Terraform (preferable)  
2. CloudFormation for AWS  
3. CLIs (of respective cloud provider)  
4. Pulumi  

## For Configuration Management

1. Ansible (preferable)  
2. Chef  
3. Puppet  
4. Saltstack  

## VM Image / Container Management

1. HashiCorp Packer  
2. Docker  


### Helm

Helm est un gestionnaire de configuration et de paquets pour Kubernetes.
Il permet de déployer facilement des applications complexes sur un cluster Kubernetes à l’aide de Helm Charts (graphes de déploiement).

Il offre de puissantes fonctionnalités de templating, prenant en charge la génération de templates pour tous les objets Kubernetes :
Deployments, Pods, Services, ConfigMaps, Secrets, RBAC, PSP, etc.

### Kustomize 
Kustomize repose sur deux concepts clés : Base et Overlays.

Avec Kustomize, on peut réutiliser des fichiers de base (fichiers YAML communs) pour tous les environnements, et y appliquer des overlays (patchs) spécifiques à chaque environnement.

Le processus de overlaying consiste à créer une version personnalisée d’un manifest, en combinant :

manifest de base + manifest overlay = manifest personnalisé

Toutes les spécifications de personnalisation sont définies dans un fichier appelé kustomization.yaml.
[Illustration](/thotify/k8s_&_devops/image-29-22.png)

 























# Ressources
![Comprendre K8s dans le détails, la plupart des liens ci-dessous sont tirés de cet article](https://devopscube.com/kubernetes-architecture-explained/)
![Comprendre la concurrence RAFT](https://raft.github.io/) 
![Théorème CAP & concurrence ](https://en.wikipedia.org/wiki/CAP_theorem?ref=devopscube.com)
![Gestion de la planification avancée](https://github.com/kubernetes/enhancements/blob/master/keps/sig-scheduling/624-scheduling-framework/README.md)