---
layout: ../../../layouts/BaseLayout.astro
title: Memento pour la virtualisation
description: Guide pour l'installation de machines virtuelles
---

### **VMware Worksation Pro / VMware Fusion (MAC OS)**

**NOTE** : L'installation de la version 17.6 ne fonctionne pas sur Windows, il faut prendre la 17.5.2 et eventuellement mettre à jour ensuite. Pour les MAC installer plutôt VMWare Fusion.

##### **Quelles sont les ressources paramétrables dans une VM** :

- RAM
- CPU
- HDD/SSD
- USB Controller
- Adaptateur reseau
- Lecteur CD
- Carte son
- Affichage ecran

##### **Connaitre sa machine**

Il est necessaire de connaitre son matériel pour savoir comment alouer les différentes ressources à votre VM.
Pour exemple la capacité de son disque dur, sa RAM ou le nombre de coeur de son CPU (**Gestionnaire des tâche, onglet "performance"**)
<img src="/thotify/src/assets/img-virtualisation/cpu.jpg" alt="Exemple performance CPU" title="Performance CPUs" style="width: 600px;">

##### **Procédure de création d'une VM** :

- Choisir si on installe directement un OS ou bien une VM vide dans laquelle on mettra l'OS plus tard
- Déterminer l'OS que l'on prévoit de mettre dessus afin d'avoir des suggestions d'espace à allouer
- Créer un mot de passe pour y accéder et bien le noter (Mon mdp pour test : VMtest1!)
- Allouer la place sur le disque dur virtuelle :
  - Window 11 a besoin de 30 Go pour tourner et ensuite il faut prévoir d'installer quelques applications. 100 Go permet de voir venir, mais à voir avec votre espace disponible.
- Customiser le hardware alloué :
  - On ne mets pas plus de processeur que l'on en possède
  - On alloue en général la moitié des coeurs possédé (Si 6, pour Windows 3 coeurs et Debian 2 suffisent)
  - On alloue aussi la moitité de la RAM possédée (Si 16, pour windows 4 c'est OK et debian 4 suffisent)
  - Network Connection : gèrera la connexion internet de la VM. Plusieurs options :
    - Bridged : la VM sera connecté au reseau physique de votre ordi avec sa propre adresse IP
    - NAT (Network Address Translation) : utilise le reseau et l'internet de l'ordi, mais n'est pas visible en externe avec un addresse IP
    - Host-only : Pas d'accès internet, la VM crée un reseau privé entre l'ordi et la VM
    - Custom : Choix d'un réseau virtuel spécifique.
    - LAN segment : VM complètement isolée

##### **Le BIOS dans une VM sans OS** :

Exemple de BIOS dans une VM sans OS (Pour y accéder, focus sur la VM + F2 sur PC).
Attention, vous allez également perdre l'usage de la souris ou du PAD puisque c'est comme si rien n'étaiet installé sur un ordi vierge. **Pour sortir du focus VM et retrouver la souris : CTRL + ALT**

<img src="/thotify/src/assets/img-virtualisation/bios-bootmanager.jpg" alt="Exemple BIOS" title="Droits utilisateurs" style="width: 500px;">

Dans le BIOS de VMware lorsque vous utilisez l'interface EFI (Extensible Firmware Interface), les différents menus que vous voyez représentent différentes options de démarrage pour la machine virtuelle :

- EFI VMWare Virtual namespace NSID 1 (DD virtuel avec le namespace ID 1)
- EFI VMware Virtual SATA CD ROM Drive (lescteur CD Virtuel servant par exemple à installer un OS via une image ISO)
- EFI Network (Dans les milieux pro pour récupérer une config reseau existante)
- EFI Internal shell (terminal intégré)
