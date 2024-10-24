---
layout: ../../../layouts/BaseLayout.astro
title: Comprendre les différents types d'hyperviseurs
description: Guide pour comprendre les différence et aller plus loin avec les containers
---

![type-1-2-container](<https://media.licdn.com/dms/image/v2/D4D12AQFNEah0oPnlDw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1712607687138?e=2147483647&v=beta&t=A9Pwx-rOyTcDh-y7fAMrLf7suJoNsBFpKWNMORHGDP4>)

# Qu'est-ce qu'un hyperviseur ? 
L'hyperviseur est un **logiciel** qui permet de **créer** et de **gérer** plusieurs **machines virtuelles** (VM) sur une seule machine physique en leur **allouant** des **ressources matérielles (CPU, mémoire, etc.)**.

# Hyperviseur de type 1 :

Les hyperviseurs de type 1 sont également appelés hyperviseurs **"bare-metal"** car ils s'exécutent directement sur le matériel physique **sans avoir besoin** d'un **système d'exploitation hôte**. Ils sont utilisés dans des **environnements de serveur et de datacenter**, avec des technologies comme **VMware ESXi, Microsoft Hyper-V** (en mode bare-metal), ou **KVM**.

l'hyperviseur est la première couche logicielle sur le serveur physique, et **il contrôle directement l'accès au matériel**. Les VMs créées sur cet hyperviseur ont un accès plus direct aux ressources matérielles, ce qui offre de **meilleures performances** que les **hyperviseurs de type 2.**

L'**interface** utilisée pour interagir avec les machines virtuelles n'est pas un système d'exploitation classique, mais un **outil ou une console permettant d'administrer les VMs**.
exemples: 
- VMware ESXi (interface web)  
- Microsoft Hyper-V (interface graphique ou power shell)  
- XenServer (interface graphique ou power shell)

Comme **il n'y a pas d'OS hôte**, les VMs n'ont pas besoin de passer par un **autre système d'exploitation** pour accéder aux ressources matérielles. L'hyperviseur gère directement ces interactions.

En résumé:
    On installe un OS puis une VM sur une machine. Mais la VM aura un accès direct aux ressources de la machine car elle utilise un hyperviseur de type 1. 

# Hyperviseur de type 2: 

L'hyperviseur de type 2 (comme **VMware Workstation, VirtualBox**) est installé sur **l'OS hôte**, et les VMs (qui ont leur propre OS invité) sont créées et exécutées à l'intérieur de cet environnement.

Lorsque la VM souhaite **accéder aux ressources matérielles** (comme le processeur, la mémoire, etc.), elle doit passer par l'**hyperviseur**, qui lui-même s'**appuie** sur **l'OS hôte** pour gérer l'accès au matériel. Cela ajoute une couche de gestion qui peut **ralentir légèrement les performances** par rapport aux hyperviseurs de type 1.

# Conteneurisation 

## Docker 

Crée des conteneurs, qui sont des environnements isolés partageant **le même** noyau (**kernel**) que l'**OS hôte**. Docker est plus léger qu'une VM, car il n'a pas besoin d'un OS invité complet dans chaque conteneur. Docker tourne directement sur l'OS hôte, donc il **n'a pas besoin d'un hyperviseur**.
La conteneurisation offre une isolation légère. Ils consomment moins de ressources que les VMs classiques.

## Kubernetes 

**Orchestre** plusieurs **conteneurs Docker** (ou d'autres types de conteneurs). Il gère le déploiement, la montée en charge et la disponibilité des conteneurs à travers plusieurs nœuds.

# Exemples de cas d'utilisation de chaques isolation 

## Hyperviseur de type 1:
- Data centers et cloud computing: Permet d'exécuter des environnements complètement isolés avec un accès direct aux ressources matérielles, garantissant des performances élevées
- Optimisation/Consolidation des serveurs: Un ensemble de VM de type 1 permettent de mieux réduir le coût en matériel physique en utilisant au maximum les capacités de chaque apareil et en divisant sa puissance.
- Infrastructures critiques: Octroie une haute disponibilité et des performances maximales (utilisé par les systèmes financiers ou les réseaux télécoms).
  
## Hyperviseur de type 2:
- Tests et développement : Permet d'isoler et de recréer les OS host sur lesquels les programmes vont être exécutés.
- Environnements isolés pour des logiciels spécifiques : Pour utiliser des technologies spécifiques a chaque OS.


## Conteneurisation: 
- Microservices: isoler des applications pour les relier a d'autres (consomme moins de ressources qu'avec une VM)
- DevOps et CI/CD: Les conteneurs sont parfaits pour les pipelines CI/CD car ils sont faciles à packager et à déployer.
- Environnements éphémères : Les conteneurs sont plus rapides à démarrer et à arrêter, ce qui est utile pour des environnements de test ou de développement. (load balancing)
