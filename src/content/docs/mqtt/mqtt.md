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
