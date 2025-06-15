---
layout: ../../../layouts/BaseLayout.astro
title: Understanding MQTT
description: Un guide pour comprendre les méchanismes dans MQTT 
---

### Etapes d'installation
• **Client Initialization:** The MQTT client initializes its MQTT library and sets up the required parameters, such as the broker's address and port.

• **Connection to the broker:** The client establishes a TCP/IP connection with the MQTT broker. The default port for MQTT is 1883 (or 8883 for encrypted connections using TLS/SSL).

• **Handshake:** Once the TCP/IP connection is established, an MQTT handshake occurs. This involves exchanging control packets to establish the connection and deal  with parameters.

• **Connect packet:** The client sends a "CONNECT" packet to the broker, indicating its intention to establish a connection. This packet includes information such as client ID, connection flags, and other settings.

• **Acknowledgment (CONNACK):** The broker responds with a "Connack" packet, indicating whether the connection request is accepted or rejected.

• **Subscriptions (optional):** If the client is a subscriber, it can then send "Subscribe" packets to the broker, indicating the topics it wants to subscribe to.

• **Publishing messages:** Once the connection is established, clients can publish messages to topics or subscribe to topics to receive messages from other clients.

• **Keep-Alive:** To maintain the connection, clients periodically exchange "Ping" packets to confirm that the connection is still active.

It’s important to note that a client can subscribe to multiple topics at once, and a topic can have multiple subscribers. This allows for a flexible and scalable  messaging system. 

The two types of wildcards are the single-level wildcard (+), which matches a single level in a topic, and the multi-level wildcard (#), which matches all levels after the specified level in a topic.

## Quality of Server (QoS) 3 levels:
- **0 At most once**: pas de garantie que les packets seront distribués, pas d'accusé de recpetion, packet très léger notamment utilisé dans la collecte continue d'information (outils de monitoring)
- **1 At least once**: le packet est livré au moins une fois, il est retransmis jusqu'a obtenir un accusé de reception (PUBACK). Il peut arriver que l'envoie se dupliquer et il faudra donc traiter les doublons chez le subscriber, notamment utilisé pour les notification
- **2 Excatly once**: le packet est livré une seule fois, il est retransmis jsuqu'a obtenir un accusé de reception, aucune duplication possible, c'est le protocols le plus lourd mais aussi le plus sécurisé, notamment utilisé pour les transaction 

## MQTT Message Persistence for Reliable IoT Communication :

- **Non-Persistent:** Default mode, les messages ne sont pas sauvegardé. Si le réseau crash, tout sera perdu, utilisé dans des situation non critique où les messages peuvent facilement être régénérer
- **Queued persistent**: Les messages sont stocké dans le server jusqu'a ce qu'ils soient envoyés au subscriber. Si le subscriber n'est pas disponible, les messages seront mit dans une file d'attente jusqu'a la reconnexion du subscriber. Bien a utilisé dès lors qu'un capteur peut se mettre en mode hors ligne/en veille
- **Persistent with acknowledgment**: Pareil que Queued persistent sauf qu'ici on attend l'accuser de reception du subscriber avant d'effacer les message de la queue. Les messages seront renvoyé jusqu'a ce que l'accusé de reception soitr envoyé. Utilisé pour des étapes critiques de publish/subscribe

<img src="/thotify/src/assets/mqtt/Capture d’écran de 2025-01-14 11-11-36.png" alt="mqtt official doc" title="schema interaction" style="width: 1000px;">
<img src="/thotify/src/assets/mqtt/Capture d’écran de 2025-01-14 11-07-10.png" alt="mqtt official doc" title="schema interaction" style="width: 1000px;">


### The pub/sub features three dimensions of decoupling for optimal efficiency:
• Space decoupling: Publisher and subscriber do not need to know each other (for example, no exchange of IP address and port).
• Time decoupling: Publisher and subscriber do not need to run at the same time.
• Synchronization decoupling: Operations on both
components do not need to be interrupted during publishing or receiving.

### MQTT Pub/Sub Message Filtering Feature 
Message filtering is a crucial aspect of the pub/sub architecture as it ensures subscribers only receive messages
they are interested in. The pub/sub broker offers several filtering options, including subject-based filtering, contentbased filtering, and type-based filtering.

For example, in a smart home system, a subscriber may be interested in receiving updates about the temperature of a specific room. The subscriber would subscribe to a topic like "smart-home/living-room/temperature," and the broker would only send messages that match this topic to the subscriber.

### Drawbacks of Content-based Filtering in Pub/Sub:
• Can be more complex to use and set up than subjectbased filtering
• Requires publishers to include additional metadata in the message to enable filtering
• Performance may suffer when processing large numbers of filter expressions


### Common Challenges in Pub/Sub Architecture and How to Overcome Them
While pub/sub architecture offers several benefits, such as scalability, flexibility, and decoupling of components, it also presents some challenges that must be addressed to
ensure a successful implementation. Below are some of the most common challenges of using pub/sub and solutions to overcome them:
1. Message Delivery: One challenge of using pub/sub is ensuring that messages are delivered to subscribers. In some instances, no subscribers may be available to
receive a particular topic, resulting in the message being lost. To overcome this, MQTT provides quality of service (QoS) levels.

2. Message Filtering: Another challenge of pub/sub is filtering messages effectively so that each subscriber receives only the messages of interest. As discussed
earlier, pub/sub provides three filtering options: subjectbased, content-based, and type-based filtering. Each option has its benefits and drawbacks, and the choice of filtering method will depend on the use case. MQTT uses subject-based filtering of messages and every message contains a topic that the broker uses to determine whether a subscribing client receives the message or not.

3. Security: Security is a crucial aspect of any messaging system, and pub/sub is no exception. MQTT allows for several security options, such as user authentication, access control, and message encryption, to protect the system from unauthorized access and data breaches.
   
4. Scalability: Pub/Sub architecture must be designed with scalability in mind, as the number of subscribers can grow exponentially in a large-scale system. MQTT provides features such as multiple brokers, clustering, and load balancing to ensure that the system can handle a large number of subscribers and messages.
   
5. Message Ordering: In a pub/sub system, message ordering can be challenging to maintain. As messages are sent asynchronously, it’s difficult to ensure that
subscribers receive messages in the correct order. However, MQTT provides QoS levels that ensures messages are successfully delivered from the client to
the broker or from the broker to a client. Because MQTT works asynchronously, tasks are not blocked while waiting for or publishing a message. Most
client libraries are based on callbacks or a similar model, making the flow of messages usually asynchronous. In certain use cases, synchronization is desirable and
possible, and some libraries have synchronous APIs to wait for a specific message. 

6. Real-time Constraints: In some use cases, real-time constraints are critical, and pub/sub architecture may not be the best choice. For example, a request/response architecture may be a better option if low latency is essential.