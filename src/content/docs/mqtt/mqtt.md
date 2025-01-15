---
layout: ../../../layouts/BaseLayout.astro
title: Understanding MQTT
description: Un guide pour comprendre les méchanismes dans MQTT 
---
### Étapes d'installation
- Client Initialization : Le client MQTT initialise sa bibliothèque MQTT et configure les paramètres requis, tels que l'adresse et le port du broker.
- Connection to the broker : Le client établit une connexion TCP/IP avec le broker MQTT. Le port par défaut pour MQTT est 1883 (ou 8883 pour les connexions chiffrées via TLS/SSL).
- Handshake : Une fois la connexion TCP/IP établie, une poignée de main MQTT se produit. Cela implique un échange de paquets de contrôle pour établir la connexion et configurer les paramètres.
- Connect packet : Le client envoie un paquet "CONNECT" au broker, indiquant son intention d'établir une connexion. Ce paquet inclut des informations telles que l'ID du client, les indicateurs de connexion, et d'autres paramètres.
- Acknowledgment (CONNACK) : Le broker répond avec un paquet "CONNACK", indiquant si la demande de connexion est acceptée ou rejetée.
- Subscriptions (optional) : Si le client est un abonné, il peut ensuite envoyer des paquets "SUBSCRIBE" au broker pour indiquer les sujets auxquels il souhaite s'abonner.
- Publishing messages : Une fois la connexion établie, les clients peuvent publier des messages sur des sujets ou s'abonner pour recevoir des messages d'autres clients.
- Keep-Alive : Pour maintenir la connexion, les clients échangent périodiquement des paquets "PING" pour confirmer que la connexion est toujours active.

Il est important de noter qu'un client peut s'abonner à plusieurs sujets simultanément et qu'un sujet peut avoir plusieurs abonnés. Cela permet un système de messagerie flexible et évolutif.

<img src="/src/assets/mqtt/Capture d’écran de 2025-01-14 11-11-36.png" alt="mqtt official doc" title="schema interaction" style="width: 1000px;">
<img src="/src/assets/mqtt/Capture d’écran de 2025-01-14 11-07-10.png" alt="mqtt official doc" title="schema interaction" style="width: 1000px;">

### Les deux types de jokers sont :

Le joker à un niveau (+), qui correspond à un seul niveau dans un sujet.
Le joker à plusieurs niveaux (#), qui correspond à tous les niveaux après un niveau spécifié dans un sujet.

### Quality of Server (QoS) : 3 levels
**0 | At most once :** Aucune garantie que les paquets seront distribués, pas d'accusé de réception. Paquets très légers, souvent utilisés pour la collecte continue de données (outils de monitoring).

**1 | At least once** : Le paquet est livré au moins une fois. Il est retransmis jusqu'à recevoir un accusé de réception (PUBACK). Des doublons peuvent être générés, nécessitant un traitement chez l'abonné, souvent utilisé pour les notifications.

**2 | Exactly once** : Le paquet est livré une seule fois, retransmis jusqu'à recevoir un accusé de réception. Aucune duplication possible. Ce protocole est le plus lourd mais le plus sûr, utilisé pour les transactions critiques.

### MQTT Message Persistence for Reliable IoT Communication
- **Non-Persistent **: Mode par défaut, les messages ne sont pas sauvegardés. En cas de crash réseau, tout est perdu. Utilisé dans des situations non critiques où les messages peuvent être régénérés facilement.
- **Queued persistent** : Les messages sont stockés sur le serveur jusqu'à ce qu'ils soient envoyés à l'abonné. Si l'abonné est indisponible, les messages sont mis en file d'attente jusqu'à sa reconnexion. Utile lorsque des capteurs peuvent passer hors ligne.
- **Persistent with acknowledgment** : Pareil que Queued persistent sauf qu'ici on attend l'accusé de réception de l'abonné avant d'effacer les messages de la queue. Les messages seront renvoyés jusqu'à ce que l'accusé de réception soit envoyé. Utilisé pour des étapes critiques de publish/subscribe.

### The pub/sub features three dimensions of decoupling for optimal efficiency :
- **Space decoupling** : Publisher et subscriber n’ont pas besoin de se connaître (par exemple, pas d’échange d’adresse IP ou de port).
- **Time decoupling** : Publisher et subscriber n’ont pas besoin d’être actifs en même temps.
- **Synchronization decoupling** : Les opérations des deux composants ne sont pas interrompues lors de la publication ou de la réception.

### MQTT Pub/Sub Message Filtering Feature
Le filtrage des messages est un aspect essentiel de l'architecture pub/sub car il garantit que les abonnés ne reçoivent que les messages qui les intéressent. Le broker pub/sub propose plusieurs options de filtrage, notamment le filtrage basé sur le sujet, sur le contenu ou sur le type.

Par exemple, dans un système de maison intelligente, un abonné peut être intéressé par les mises à jour de la température d'une pièce spécifique. L'abonné s'inscrit à un sujet tel que "smart-home/living-room/temperature", et le broker n'enverra que les messages correspondant à ce sujet à l'abonné.

### Drawbacks of Content-based Filtering in Pub/Sub
Peut être plus complexe à utiliser et à configurer que le filtrage basé sur le sujet.
Nécessite que les publishers incluent des métadonnées supplémentaires dans le message pour permettre le filtrage.
Les performances peuvent être affectées lors du traitement d'un grand nombre d'expressions de filtrage.
Common Challenges in Pub/Sub Architecture and How to Overcome Them
Bien que l'architecture pub/sub offre plusieurs avantages tels que la scalabilité, la flexibilité et le découplage des composants, elle présente également des défis à surmonter pour garantir une implémentation réussie.

**Message Delivery** : Un défi du pub/sub est de s'assurer que les messages sont livrés aux abonnés. Si aucun abonné n'est disponible pour un sujet particulier, le message peut être perdu. Pour y remédier, MQTT propose des niveaux de qualité de service (QoS).

**Message Filtering** : Filtrer efficacement les messages pour que chaque abonné reçoive uniquement les messages d'intérêt. MQTT utilise un filtrage basé sur le sujet, où chaque message contient un sujet que le broker utilise pour déterminer si un client abonné reçoit le message.

**Security** : La sécurité est un aspect crucial de tout système de messagerie, y compris le pub/sub. MQTT propose des options telles que l'authentification des utilisateurs, le contrôle d'accès et le chiffrement des messages pour protéger le système contre les accès non autorisés et les violations de données.

**Scalability** : L'architecture pub/sub doit être conçue pour être évolutive, car le nombre d'abonnés peut croître de façon exponentielle. MQTT propose des fonctionnalités telles que les brokers multiples, le clustering et l'équilibrage de charge pour gérer un grand nombre d'abonnés et de messages.

**Message Ordering** : Maintenir l'ordre des messages dans un système pub/sub peut être difficile, car les messages sont envoyés de manière asynchrone. MQTT utilise des niveaux de QoS pour garantir la livraison des messages, et certaines bibliothèques permettent de gérer les messages de manière synchrone si nécessaire.

**Real-time Constraints** : Dans certains cas, les contraintes de temps réel sont critiques et l'architecture pub/sub peut ne pas être le meilleur choix. Par exemple, une architecture requête/réponse peut être plus adaptée si une faible latence est essentielle.


### MQTT Connection Through a NAT
In many cases, MQTT clients live behind routers that use network address translation (NAT) to convert private network addresses (such as 192.168.x.x or 10.0.x.x) to publicfacing addresses. As mentioned, the MQTT client starts the connection by sending a CONNECT message to the broker. Since the broker has a public address and maintains the connection open to enable bidirectional sending and receiving of messages (after the initial CONNECT), MQTT clients located behind NAT routers will have no difficulties. 
For those unaware, NAT is a common networking technology that routers use to allow devices on a private network to access the internet through a single public IP address. NAT works by translating the IP addresses of devices on the private network to the public IP address of the router and vice versa.





PAGE 24

<!-- FORMATION CEDALO -->

What is the MQTT broker responsible for?
The primary responsibilities of the MQTT broker include the following:

Keep track of the the current state of the MQTT system, including which clients are connected, which topics are being published and subscribed to, etc. 
Ensure that only authenticated clients have access to the MQTT system. 
Ensure that clients can only receive data on topics where they are authorized. 
Process all the flags (special MQTT parameters with a true or false value (1 or 0) representing some packet metadata) in the MQTT packet

MQTT packet format
The MQTT packet format consists of a:

Fixed header: Made up of the packet type, packet flags, and length of the remaining packet.
Variable header: The content and length of the variable header will vary according to the packet type and includes packet-type specific meta-data.
Payload: The packet-type specific payload data.
All other components are optional, apart from the fixed header, which can be broken down further into:

A control field, also known as the MQTT control packet.
A remaining length denotes the remaining length of the variable header and payload data.
An MQTT packet needs a minimum packet size of 2 bytes (defined by the fixed header) and a maximum of 256MB.


<img src="/src/assets/mqtt/course1_5-1.png" alt="mqtt official doc" title="schema interaction" style="width: 1000px;">


The control field is mandatory and the first byte in each MQTT packet. It is separated into two 4-bit fields:

The first 4-bits represent the packet type.
The last four bits represent the so-called flags, which are fixed corresponding to the used packet type and cannot be changed by the client – except for the PUBLISH packet type.


<img src="/src/assets/mqtt/course_15-2.png" alt="mqtt official doc" title="schema interaction" style="width: 1000px;">



Lastly, the payload holds all user data related to the packet being sent. For a PUBLISH packet this is the actual message being sent. The message can be in any kind of format, but is most often in ASCII-encoded characters formatted as JSON, XML, or text.

The three main MQTT message exange are connect subscribe publish

The **CONNECT request** includes the three **must-have parameters**: 

<img src="/src/assets/mqtt/image37.jpg" alt="mqtt official doc" title="schema interaction" style="width: 1000px;">

**clientID** – a parameter that identifies each MQTT client connecting to the MQTT broker. If the clientID value is blank, the broker will generate a unique parameter for this client.

**cleanSession** – a boolean parameter that indicates whether the client intends to establish a persistent session (a broker keeps unsent messages when the connection is interrupted) with the MQTT broker (false) or not (true). 

**keepAlive** – a parameter that identifies the maximum interval in seconds to maintain the MQTT connection without any data transmission from the client.

The **conversation** between the **MQTT broker** and **clients can end in two ways**:

proper closure when a client sends a DISCONNECT packet unexpected closure without first sending a DISCONNECT packet


### Glossaire:
**CONNACK** : Abréviation de CONection + ACKnowledgment 
exemples de code de retour CONNACK: 
0x00 : Connexion acceptée.
0x01 : Connexion refusée - Version du protocole incorrecte.
0x02 : Connexion refusée - Identifiant client incorrect.
0x03 : Connexion refusée - Serveur inaccessible.
0x04 : Connexion refusée - Nom d'utilisateur/mot de passe incorrect.
0x05 : Connexion refusée - Non autorisé.

**SUBACK**: Subscribe back, when a subscription is accepted by the broker

**OASIS** : Organization for the Advancement of Structured Information Standards. OASIS est un consortium international à but non lucratif qui développe, adopte et promeut des standards pour l'interopérabilité des systèmes d'information. Ces standards couvrent un large éventail de domaines, notamment :
- Messagerie (comme MQTT ou AMQP),
- Web services,
- Sécurité,
- Gestion de documents

**retainFlag** – the value that indicates whether the message will be retained (true) or not (false). Retaining a message makes sense when a subscribed client cannot wait until the next message is published. For example, a car door sensor can be monitored in real-time without waiting. In this case, retaining a message enables new subscribers to receive the latest status of the sensor when subscribing to the topic. 
 
**dupFlag** – the value that indicates whether the message duplicate was re-sent (true) or not (false).

**PUBREC** - PUBlication RECieved 

### Usual dev fact 

Despite its name, the “Message Queue” component was never fully utilized in the protocol naming since the MQTT protocol relies on a publish and subscribe messaging pattern, where message queuing in a traditional sense is not observed. :--) 
PS: On se croirait chez NPM 