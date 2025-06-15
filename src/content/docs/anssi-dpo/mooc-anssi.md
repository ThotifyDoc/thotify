---
layout: ../../../layouts/BaseLayout.astro
title: Module 3 Sécurité sur internet
description: guide prise de note sur le module n°3 du MOOC de L'ANSSI
---


# Module 3 - Sécurité sur Internet

_Guide de prise de notes sur le module n°3 du MOOC de l'ANSSI_

  

## Introduction

Le modèle OSI utilise le premier site d'internet à l'aide de TCP/IP (port 80), encore utilisé de manière écrasante aujourd'hui.

  

L'espace croissant d'internet et sa sur-utilisation dans tous les domaines le rendent de plus en plus dangereux. Au début, les premiers sites permettaient de mieux partager des documents, puis de communiquer à l'aide d'e-mails/messages, puis enfin de lire des streams et de jouer en ligne. Aujourd'hui nous faisons tout en ligne, cependant le nombre de menaces malveillantes ne cesse d'augmenter.

  

## Comment les menaces ont-elles lieu ?

### Relation Client → Serveur

Un client (celui qui consulte un site internet) émet des requêtes vers un serveur. Chaque requête envoyée est constituée de plusieurs paquets TCP qui doivent être reçus par le serveur. Un paquet peut globalement être soit :

  

-   **UDP** : peu importe que le paquet soit reçu, ils sont en général envoyés massivement en UDP
-   **TCP** : chaque paquet envoyé doit être reçu et confirmer la réception au client afin de s'assurer que toutes les données seront traitées, on ne veut aucune perte

Afficher l'image

Ces paquets se composent d'une partie de la donnée que l'émetteur souhaite transmettre, à laquelle sont ajoutées des informations relatives à son transport, telles que l'adresse IP du destinataire (numéro d'identification de son ordinateur sur un réseau).

  

Tout comme le courrier postal, la réponse du serveur web peut suivre un tout autre chemin que la demande initiale.

  

## Types de Malwares

### 🧬 Catégorie principale

**🦠 Malware** : Logiciel malveillant conçu pour nuire à un système, voler des données ou en prendre le contrôle. C'est la catégorie mère qui englobe tous les types ci-dessous.

  

### Sous-catégories

#### 🧠 Malware par comportement ou finalité

**🕵️ Spyware** : Espionne un utilisateur à son insu. Peut enregistrer des frappes, prendre des captures d'écran ou intercepter des données.

  

**🖮 Keylogger** (type de spyware) : Enregistre les frappes clavier pour voler des mots de passe, messages, etc.

  

**📢 Adware** : Affiche de la publicité non désirée, souvent pour générer des revenus ou rediriger vers des sites infectés.

  

**🎭 Trojan (Cheval de Troie)** : Se fait passer pour un logiciel légitime pour infiltrer le système. Peut installer d'autres malwares (comme une backdoor).

  

**🧨 Ransomware** : Chiffre les fichiers de la victime et réclame une rançon pour les débloquer. Utilise souvent un Botnet pour y parvenir et chiffrer un ensemble de fichiers.

  

**🧬 Rootkit** : Permet à un attaquant de masquer sa présence et d'obtenir des droits administrateur sur le système.

  

**🕳️ Backdoor** : Un accès caché dans un système qui permet à un attaquant d'y revenir à volonté sans être détecté.

  

⚠️ Souvent installé par un trojan, un rootkit ou un attaquant directement.

  

**🤖 Botnet** : Réseau de machines infectées, contrôlées à distance. Utilisé pour envoyer du spam, miner de la crypto ou lancer des attaques DDoS.

  

⚠️ Chaque machine infectée dans le botnet s'appelle un bot ou une "zombie".

  

#### ⚙️ Malware par méthode de propagation

**🐛 Worm (ver)** : Se propage automatiquement via les réseaux, sans action de l'utilisateur. Peut provoquer des dommages massifs.

  

**🧫 Virus** : S'attache à des fichiers exécutables (ex. .exe) ou documents. Se propage quand le fichier est ouvert/exécuté.

  

### Types d'attaques par déni de service

Deux types de déni de service à distinguer, le solitaire et le groupé :

  

TypeNom completDescriptionDoSDenial of ServiceUne seule machine (ou IP) attaque une cible en envoyant trop de requêtes ou en exploitant une faille.DDoSDistributed Denial of ServiceLa même chose, mais réalisée depuis des centaines ou milliers de machines (souvent un botnet). Beaucoup plus difficile à contrer. Cette attaque utilise le concept de botnet.

Beaucoup de concepts sont liés.

  

### Défiguration et Malvertising

La **défiguration** consiste à modifier illégalement le contenu d'un site web, souvent dans le but de faire passer un message ou de marquer une action politique ou idéologique.

  

Parfois, cette défiguration peut servir à installer du **malvertising** : publier de la publicité non désirée directement sur le site compromis.

  

Les hackers ingénieux utilisent le malvertising pour rediriger les visiteurs vers de faux sites de publicité. Sur ces faux sites, ils peuvent alors installer un keylogger, dans le but de récupérer les informations personnelles que l'utilisateur saisira, pensant faire un achat ou une action légitime.

  

## Ingénierie sociale

Bien que les notions que nous allons voir puissent sembler évidentes et se baser sur la naïveté des gens, il est important de garder à l'esprit que seuls des acteurs impliqués pourront parvenir à contrer les attaques psychologiques et physiques liées aux interactions sociales.

  

Les attaques par ingénierie sociale reposent souvent sur la ruse. Le pirate joue avec vos émotions (peur, confiance, envie d'aider, etc.) et vos habitudes, pour vous mettre en confiance, vous inquiéter, endormir votre vigilance, etc.

  

### Techniques utilisées

-   Déjouer une authentification faible
-   Utiliser l'hameçonnage
-   Faire diversion
-   Recourir à une situation de pression
-   Donner confiance
-   Utiliser la fuite d'informations

#### Déjouer une authentification faible

**Caractéristiques de l'hameçonnage :**

  

-   Utilisation des adresses électroniques du support informatique
-   Signature avec l'adresse d'un collègue de confiance
-   Envoi de plusieurs mails coordonnés
-   Utilisation de date limite trop pressante

#### Diversion

Une personne peut créer un incident dans l'entreprise afin que les employés se regroupent en suivant des procédures d'urgence. La personne ayant créé l'incident pourra profiter de la panique pour récolter des informations, à la fois auprès des employés et avec les informations se trouvant dans les locaux.

  

**Autre exemple :**

  

Une panne informatique a eu lieu dans la nuit, pas de souci, un dépanneur informatique vous a contacté quelques jours auparavant pour vous offrir ses services. Il se présente rapidement à votre bureau et pendant qu'il répare, soi-disant, votre ordinateur, il en profite pour récupérer des données auxquelles il ne pouvait accéder à distance.

  

Ici, le pirate a créé une situation dans laquelle c'est la victime qui a besoin de l'attaquant.

  

#### Recourir à une situation de pression

Récompenses, délais, urgence, occasion à ne pas rater.

  

L'illusion d'une situation pressante peut empêcher la prise de conscience et la réflexion. Lors de tentatives d'escroqueries et notamment lors de l'utilisation de rançongiciels, il est courant de voir des entreprises céder aux demandes de leur ravisseur alors même qu'ils n'ont aucun moyen de pression réel. Il arrive parfois qu'une situation de rançon soit uniquement basée sur du bluff et que l'entreprise soit tellement mise sous pression qu'elle perde ses capacités de réflexion due à l'empressement de la situation.

  

#### La fuite d'information

Un écran posé devant une fenêtre, donc visible de l'extérieur, un voisin de train lorgnant sur un rapport de réunion, des documents hébergés en ligne sans contrôle d'accès, des ordinateurs portables volés, des documents mis à la poubelle, des employés trop bavards sur les réseaux sociaux ou du personnel d'entretien corrompu... les fuites potentielles sont nombreuses !

  

### Prévention

L'ingénierie sociale se base en grande partie sur le manque de connaissance et de méfiance des acteurs humains.

  

Il est donc fondamental d'informer les acteurs ayant accès à de l'information potentiellement sensible des mécanismes de sécurité qui les concernent, mais aussi de leur fonctionnement et des raisons qui justifient les choix de sécurité qui ont été faits.

  

Il est souvent plus efficace d'avoir une sécurité simple, comprise et maîtrisée qu'une sécurité complexe mais mal comprise par les différents acteurs.

  

Il est également important de présenter à chacun les risques auxquels ils peuvent faire face ainsi que les attaques dont ils peuvent être victimes.

  

Demander des preuves de l'identité de vos interlocuteurs lorsque cela est pertinent et garder à l'esprit qu'un message peut être modifié entre son envoi et sa réception.

  

L'ingénierie sociale est souvent utilisée par les pirates pour arriver à leurs fins en parallèle d'attaques plus techniques.

  

### Contacts en cas d'incidents

-   [https://cyber.gouv.fr/en-cas-dincident](https://cyber.gouv.fr/en-cas-dincident)
-   [https://www.cnil.fr/fr](https://www.cnil.fr/fr)

### Récapitulatif - Questions à se poser

-   Mon authentification est-elle assez forte ?
-   Cherche-t-on à faire diversion ?
-   Est-ce une personne de confiance ?
-   Est-ce de l'hameçonnage ?
-   Pourquoi suis-je mis sous pression ?
-   Fais-je fuir des informations confidentielles ?

## Réseaux sociaux et E-réputation

Quand c'est gratuit, c'est nous le produit. Les réseaux sociaux nous donnent un libre accès vers nos contacts. En contrepartie, les réseaux sociaux exploitent nos données et les revendent à d'autres organismes quand celles-ci ne fuient pas tout simplement. Il faut faire attention à ce que les hackers pourraient parvenir à récupérer depuis cette source d'information.

  

Un autre risque existe sur les réseaux sociaux, c'est l'atteinte à l'E-réputation :

  

-   Un client insatisfait ou un employé revanchard, qui expriment leurs récriminations
-   Des concurrents qui diffusent de faux avis sur vos produits ou services
-   Un employé imprudent qui dévoile des informations secrètes ou confidentielles sur votre entreprise
-   Diffusion accidentelle d'un message à visée privée sous forme de message public

Toutes les informations que l'on divulgue sur les réseaux sociaux sont autant d'indications pouvant faciliter la tâche d'un fraudeur pour déduire vos mots de passe, usurper votre identité ou vous manipuler pour préparer une attaque technique.

  

### Bonnes pratiques

-   Lisez les politiques de confidentialité
-   Vérifiez dans vos paramètres les informations partagées
-   Invitez et n'acceptez que des personnes que vous connaissez (particulièrement sur les réseaux qui ne permettent pas de limiter la visibilité de vos publications à des listes de contacts que vous aurez définies)
-   Déterminez auprès de qui vous rendez visibles vos informations et vérifiez la vue que les autres utilisateurs ont de votre profil
-   Paramétrez une validation des identifications (« tags ») qui sont faites sur vous, avant leur publication

## Les courriels

Les courriels peuvent être envoyés à de multiples personnes tout en n'ayant qu'un seul destinataire visible. Ce cas de figure existe grâce à l'envoi en CCI (Copie carbone invisible ou copie cachée).

  

Ceux-ci sont envoyés à l'aide du protocole SMTP.

  

### Caractéristiques du protocole SMTP

-   Utilise le port 25 par défaut (ou 587 pour l'envoi sécurisé, et 465 pour **SMTPS**)
-   Utilise le protocole TCP pour garantir la transmission complète de paquets
-   Souvent combiné avec :
-   **SPF** : vérifie si le serveur d'envoi est autorisé par le domaine
-   **DKIM** : vérifie l'intégrité et l'origine du message via signature
-   **DMARC** : définit une politique d'authentification basée sur SPF et DKIM

### Usurpation d'identité

Un expéditeur peut facilement usurper une identité, car le nom affiché dans le champ expéditeur est purement déclaratif. On peut y inscrire ce que l'on veut lors de l'envoi d'un e-mail.

  

Cependant, avec le temps, des protocoles ont été mis en place pour limiter ces usurpations d'identité.

  

La majorité des boîtes mail dans le monde utilisent aujourd'hui SPF, qui permet de vérifier si le serveur utilisé pour envoyer le message est autorisé par le domaine d'envoi. Cela permet, par exemple, aux entreprises de n'autoriser l'envoi de mails qu'à partir de leurs propres serveurs.

  

Ainsi, si une personne tente d'imiter un domaine comme @mon-entreprise.com en utilisant un domaine très proche, comme @moun-entreprise.com, la politique SPF (et souvent aussi DMARC) peut détecter que le serveur utilisé est extérieur au domaine autorisé.

  

Dans certains clients mail, un signal visuel (par exemple un bandeau ou un pictogramme d'alerte) indique que le message provient d'une source externe ou suspecte, ce qui peut mettre l'utilisateur en alerte face à une tentative de fraude.

  

### Impact de la configuration

**📉 Taux de délivrabilité (deliverability) :** Si un domaine n'est pas bien configuré avec SPF/DKIM/DMARC, les mails peuvent atterrir en spam, voire être bloqués. Une bonne configuration améliore la réputation du domaine, ce qui est crucial pour les entreprises.

  

**🔐 BIMI (Brand Indicators for Message Identification)** (optionnel mais moderne) :

  

-   Permet d'afficher le logo de l'entreprise dans certains clients mail (comme Gmail)
-   Ne fonctionne que si SPF, DKIM et DMARC sont bien configurés
-   Aide à renforcer la confiance visuelle et à lutter contre l'usurpation

### Sécurité des courriels

Il est possible de mettre en place des mécanismes cryptographiques pour apporter une garantie sur l'expéditeur et sur l'intégrité du contenu d'un courriel, mais cela reste à la marge et difficilement accessible pour le grand public.

  

Autrement dit, le champ « expéditeur » d'un courriel est purement déclaratif et n'est aucunement une garantie que le courriel provient bien de cet expéditeur.

  

**⚠️ Règle d'or :** De manière générale, si vous recevez un courriel vous demandant des informations personnelles, des informations bancaires, vos identifiants, il s'agit très sûrement d'une tentative d'escroquerie.


# Gestion des fichiers 

## Définition
Un fichier n'est fondamentalement qu'une suite de 0 et de 1 compréhensibles par l'ordinateur. 

Chaque fichier a un format (une convention d'écriture en quelque sorte), qui lui confère des propriétés et lui permet d'être interprété par des logiciels. 

Il existe certaines astuces a connaître afin de se prémunir contre les attaques courantes lors de la manipulation de fichiers:
- Désactivez l’exécution automatique de périphériques amovibles
- Afficher systématiquement l’extension des fichiers
- Windows 10 = Explorateur de fichiers > Affichage > Extensions de noms de fichiers

Les formats les plus exploités par les pirates restent sûrement ceux des fichiers texte formatés comme PDF ou DOC(X)/XLS(X) de Microsoft. 

Et cela pour deux raisons principales :

Bouton "Continuer" activé
• Premièrement, les logiciels associés pour interpréter ces formats (respectivement Acrobat Reader et Microsoft Word ou Excel), en tant que solutions très utilisées, font l'objet de recherches et découvertes de vulnérabilités récurrentes.

• Deuxièmement, ces formats de fichiers sont intrinsèquement plus complexes et donc plus vulnérables que des fichiers textes bruts, car ils peuvent par exemple contenir des codes interprétables (Javascript pour PDF, Macro Visual Basic pour Office).

Le fait que les pirates s'intéressent a ces format de fichiers nécessite de la part des utilisateurs de mettre leurs logiciels a jour afin de se prémunir contre les attaques les plus récentes. 
Chaque mise a jour permet de faire des correctifs sur les outils qui ont été contournés et ainsi de supprimer les failles de sécurités.

D'autre pièges peuvent se loger lors d'un téléchargement de fichier. Tout d'abord il faut vérifier l'origine du site mettant le téléchargement du fichier en accès libre. Est-ce que c'est le site officiel du logiciel téléchargé? Suis-je sur une plateforme généraliste qui pourrait comporter des fichiers malveillant sans s'en rendre compte... Dans le doute, allez toujours sur le site officiel du logiciel/fichier ciblé.

Enfin, méfiez vous des logiciels cracké. Déjà que c'est illégal, il est fort probable que les pirates y ait logé des publicités cachées ou des codes malveillants faisant travailler votre machine pour celui qui vous a fait télécharger le crack.

# Les échanges par messagerie électronique

Un ami, un collègue vous envoie un lien ou une pièce jointe en écrivant simplement « c'est super, regarde ça ! ». Est-ce bien son genre ? 

Le nom du fichier joint ou le lien Web ont-ils un point commun avec vos sujets habituels ?

En cas de doute, un coup de téléphone pour vérifier s'impose ! 

Et quand bien même votre interlocuteur est bien l'expéditeur, se porte-t-il garant du contenu ou s'est-il contenté de transférer un contenu de source inconnu ?

Exemple connu: 
Vers 2018–2019, une vague de hacks ciblant les objets Steam (notamment les skins CS:GO) a touché de nombreux utilisateurs. Les hackers utilisaient principalement le phishing pour tromper les joueurs et voler leurs objets virtuels, souvent de grande valeur.

Les attaques débutaient souvent par un message Steam d’un contact compromis, contenant un lien vers un faux site d’échange imitant des plateformes connues (ex : CS.Money). Une fois sur le site, la victime entrait ses identifiants Steam, croyant être sur le vrai site.

Ces sites volaient les identifiants et, parfois, les cookies ou codes Steam Guard, permettant aux attaquants d'accéder au compte sans autorisation. Ensuite, les objets étaient transférés automatiquement via des bots vers d'autres comptes pour être revendues.

Valve n’a pas subi de faille directe, mais a réagi en renforçant la sécurité des échanges, notamment en limitant les transferts récents, ajoutant des alertes contre les arnaques et bloquant certains types d’échanges suspects.

En résummé, la plupart des attaques réussissent car les victimes ne sont pas sensibilisées aux attaques. Elles ont tendance a double cliquer sur le moindre lien et se faire avoir. Si vous êtes victime d'un rançongiciel, il ne faut pas coopérer et directement signaler l'attaque aux autorités compétentes.






