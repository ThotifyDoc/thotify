---
layout: ../../../layouts/BaseLayout.astro
title: Unix Vs Linux
description: Guide pour comprendre l'évolution de unix vers linux à nos jours
---


# Historique de UNIX

À la fin des années **1960**, **Bell Labs** (devenu AT&T), General Electric et le Massachusetts Institute of Technology ont tenté de mettre au point un système interactif de partage du temps appelé Multiplexed Information and Computing Service (**Multics**), qui permettrait à plusieurs utilisateurs d'accéder simultanément à un ordinateur central.

Déçus par les résultats, les laboratoires Bell se sont retirés du projet, mais les informaticiens de Bell, Ken Thompson et Dennis Ritchie, ont poursuivi leurs travaux, qui **ont abouti au développement du système d'exploitation Unix**. Dans le cadre de cet effort, Thompson et Ritchie ont recruté d'autres chercheurs des Bell Labs et, ensemble, ils ont construit une suite de composants qui ont servi de base au système d'exploitation. Ces composants comprenaient un système de fichiers hiérarchique, une interface de ligne de commande (CLI) et de nombreux petits programmes utilitaires. Le système d'exploitation a également apporté avec lui les concepts de processus informatiques et de fichiers de périphériques.

Un mois plus tard, Thompson a déployé un système d'exploitation autonome doté d'un assembleur, d'un éditeur et d'un interpréteur de commandes. Le nom, prononcé YEW-nihks, est un jeu de mots basé sur le système précédent, une version émasculée ou eunuque de Multics. Unix était beaucoup plus petit que ce que les développeurs originaux avaient prévu pour Multics, et il s'agissait d'un système monotâche. Les capacités multitâches viendraient plus tard.

Avant 1973, Unix était écrit en langage assembleur, mais la quatrième édition a été réécrite en C. C'était révolutionnaire à l'époque, car les systèmes d'exploitation étaient considérés comme trop complexes et sophistiqués pour être écrits en C, un langage de haut niveau. La portabilité d'Unix sur de multiples plates-formes informatiques s'en est trouvée améliorée.

À la fin des années 1970 et au début des années 1980, Unix a acquis une forte notoriété dans le monde universitaire, ce qui a conduit des entreprises commerciales, telles que Solaris Technologies et Sequent, à l'adopter à plus grande échelle. Entre 1977 et 1995, le groupe de recherche sur les systèmes informatiques de l'université de Californie à Berkeley a développé Berkeley Software Distribution (BSD), l'une des premières distributions Unix et la base de plusieurs autres dérivés d'Unix.

En 1991, Linus Torvalds, étudiant à l'université d'Helsinki, a créé un système d'exploitation basé sur Unix pour son PC. Plus tard, il a appelé son projet Linux et l'a mis à disposition en téléchargement gratuit, ce qui a conduit à la popularité croissante des systèmes de type Unix. Aujourd'hui, divers serveurs, stations de travail, appareils mobiles et systèmes embarqués modernes sont pilotés par des systèmes d'exploitation basés sur Unix, notamment les ordinateurs macOS et les appareils mobiles Android.

# À quoi sert Unix ?

Unix est un système d'exploitation modulaire composé d'un certain nombre d'éléments essentiels, notamment le noyau, l'interpréteur de commandes, le système de fichiers et un ensemble d'utilitaires ou de programmes.

Au cœur du système d'exploitation Unix se trouve le noyau, un programme de contrôle principal qui fournit des services pour démarrer et terminer les programmes. Il gère également des opérations de bas niveau, telles que l'allocation de mémoire, la gestion des fichiers, la réponse aux appels système et l'ordonnancement des tâches. La planification des tâches est nécessaire pour éviter les conflits lorsque plusieurs programmes tentent d'accéder à la même ressource en même temps.


# Historique de linux

En 1983, Richard Stallman annonce son projet de développer un système d'exploitation libre compatible UNIX appelé GNU[5], en invitant la communauté hacker à le rejoindre et participer à son développement. Dès 1985, certaines pièces maîtresses sont opérationnelles, dont le compilateur GCC[6]. Le projet GNU commence vers 1990 à travailler sur le noyau de système d'exploitation Hurd, mais son développement prendra plus de dix ans.

Minix est un système d'exploitation de type Unix fondé sur un micro-noyau. Il a été créé en 1987 par le professeur Andrew Tanenbaum à des fins pédagogiques. La licence de Minix était bon marché afin d'être accessible aux étudiants, mais Minix n'était pas librement distribuable.

1991 : naissance du noyau Linux

Linus Torvalds, initiateur et coordinateur du noyau Linux.

Tux, le manchot mascotte de Linux.
Article détaillé : Noyau Linux.
En 1991, l'étudiant finlandais Linus Torvalds, indisposé par la faible disponibilité du serveur informatique UNIX de l'université d'Helsinki, entreprend le développement d'un noyau de système d'exploitation, qui prendra le nom de « noyau Linux ».

Linus Torvalds utilisait et appréciait Minix. Le 25 août 1991, il annonce sur le forum Usenet comp.os.minix le développement du noyau Linux[7].

Bien qu'il appelait son projet « Linux » en privé, Linus l'a d'abord appelé « Freax » en public, car il trouvait « Linux » trop égocentrique. Toutefois, lors de la première publication sur le site FTP ftp://ftp.funet.fi [archive], l'administrateur du serveur Ari Lemmke n'aimait pas « Freax » et a créé un répertoire pub/OS/Linux[8].

Linus Torvalds choisit rapidement de publier son noyau sous licence GNU GPL. Cette décision rend les logiciels GNU et le noyau Linux juridiquement compatibles. Dès lors, pour combler le vide causé par le développement inachevé de Hurd, GNU et le noyau Linux sont associés pour former un nouveau système d'exploitation (parfois considéré comme variante de GNU) : GNU/Linux ou Linux.

# A quoi sert Linux ? 


Linux® est un système d'exploitation Open Source créé par Linus Torvalds en 1991. Il compte aujourd'hui une base d'utilisateurs considérable et est exploité dans les 500 superordinateurs les plus puissants du monde. Il est notamment apprécié pour sa polyvalence et ses fonctionnalités de sécurité. Le noyau Linux est géré par une communauté internationale d'amateurs de l'Open Source et se décline sous la forme de centaines de distributions uniques.


# Unix vs Linux

| Famille **Unix**                             | Ramifications / Dérivés                                                                 |
|------------------------------------------|------------------------------------------------------------------------------------------|
| **Dérivés UNIX AT&T / ligne Système V** | - AIX (IBM ; certifié en tant qu’UNIX 98 et 03)                                          |
|                                          | - HP-UX (Hewlett Packard ; certifié en tant qu’UNIX 95 et 03)                           |
|                                          | - Oracle Solaris (Oracle ; certifié en tant qu’UNIX 95, 98, 03 et V7)                   |
| **Gamme BSD (Berkeley Software Distribution)** | - FreeBSD (il existe différentes distributions et différents dérivés)            |
|                                          | - NetBSD (il existe différentes distributions et différents dérivés)                    |
|                                          | - OpenBSD (il existe différentes distributions et différents dérivés)                   |




| Distributions et dérivés **Linux** populaires    | Particularités                                                                                                                      |
|---------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Debian                                      | Distribution avec un vaste choix de logiciels, supporte les architectures 12 processeurs                                           |
| Ubuntu                                      | Dérivé de Debian optimisé pour les ordinateurs domestiques                                                                         |
| Linux Mint                                  | Ramification d’Ubuntu conçue pour les débutants, dispose de différents environnements de bureau                                    |
| Knoppix                                     | Première distribution live populaire (portable, aucune installation nécessaire), vaste palette de logiciels, dérivé de Debian     |
| Gentoo                                      | Distribution Linux basée sur la source pour les utilisateurs avancés, le système peut être entièrement personnalisé                |
| Red Hat Enterprise Linux (RHEL)             | Distribution de serveur Linux connue pour les entreprises, support complet via des éditeurs de logiciels indépendants, payante     |
| Fedora                                      | Successeur direct de Red Hat Linux (RHL), adaptée aux serveurs et postes de travail, aussi conçue pour les débutants               |
| openSUSE                                    | Distribution complète, populaire en Allemagne et aux États-Unis, utilise RPM et l’outil de configuration YaST                      |


# Avantages et inconvénients d’Unix et de Linux

## Avantages

| Avantages d’Unix                                                                 | Avantages de Linux                                                                                                                     |
|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| Environnement stable et sophistiqué principalement pour les serveurs et les postes de travail | OS polyvalent, particulièrement adapté au marché des serveurs (des distributions Linux spécifiques aux serveurs sont disponibles), de nombreux Cloud utilisent Linux |
| Fonctionne sur de nombreuses plateformes matérielles (portabilité), solutions sur mesure pour un ajustement optimal au matériel | Large support matériel, indépendant du fabricant (vaut pour les CPU, les serveurs, les postes de travail, les PC, les mini-ordinateurs) |
| Les systèmes UNIX payants sont continuellement développés, il est tenu compte des besoins du client | La plupart des distributions sont gratuites (CD/DVD, téléchargement Internet)                                                           |
| Sûr (par ex. restriction des droits d’utilisateur, chiffrement)                  | Sûr (par ex. restriction des droits d’utilisateur, chiffrement)                                                                         |
| Scripting sophistiqué (Shell)                                                    | Scripting sophistiqué (Shell)                                                                                                           |
| Convient parfaitement aux programmeurs et aux administrateurs système           | Convient parfaitement aux programmeurs et aux administrateurs système, davantage d’IGU intuitives en particulier pour les utilisateurs d’ordinateur de bureau |
| Vaste choix de programmes et d’outils (en grande partie déjà inclus dans l’OS)  | Vaste choix de programmes et d’outils (en grande partie déjà inclus dans l’OS)                                                          |
| Particulièrement adapté aux domaines commerciaux critiques                       | Mises à jour fréquentes, les failles de sécurité sont rapidement corrigées                                                              |
| Grâce au standard POSIX, les applications Unix fonctionnent aussi sur Linux (migration possible) | Grâce au standard POSIX, les applications Linux fonctionnent aussi sur Unix (migration possible)                                        |
|                                                                                  | Prérequis matériels peu importants, bonne performance du système                                                                       |
|                                                                                  | Versions portables sans installation disponible (par ex. sur DVD, clé USB)                                                             |

---

## Inconvénients

| Inconvénients d’Unix                                                             | Inconvénients de Linux                                                                                                                  |
|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| Groupe cible limité, focalisation sur les utilisateurs expérimentés et les professionnels de l’informatique | Un certain temps d’adaptation est nécessaire aux débutants avec Linux, les nouveaux utilisateurs doivent en partie renoncer à leurs logiciels habituels |
| De nombreuses solutions (spécifiques) sur le marché des serveurs sont payantes et liées à un matériel précis du fabricant | Sur le marché des serveurs, frais d’assistance plus élevés le cas échéant en cas de distributions Linux commerciales                   |
| Prérequis matériels habituellement plus importants (en particulier dans le cas de systèmes commerciaux basés sur une licence) | Linux a des failles de sécurité, programmes malveillants (les serveurs sont particulièrement menacés)                                  |
| Mises à jour plutôt rares et développement lent                                 | Les pilotes pour les nouveaux matériels (PC, cartes graphiques) sont publiés après un certain temps                                    |
| Le nombre d’utilisateurs est en baisse, en partie à cause de Linux (en particulier sur le marché des serveurs) | Tendance à la fragmentation dans le développement Linux (nombre important de distributions Linux)                                       |
| Pratiquement insignifiant sur le marché des ordinateurs de bureau              | Faible part de marché pour les ordinateurs de bureau et portables                                                                      |



**Sources : **

https://www.lemagit.fr/definition/Unix#:~:text=Unix%20est%20un%20syst%C3%A8me%20d,d'utilitaires%20ou%20de%20programmes.
https://www.ionos.fr/digitalguide/serveur/know-how/unix-vs-linux/
https://fr.wikipedia.org/wiki/Linux
https://www.redhat.com/fr/topics/linux/what-is-linux

