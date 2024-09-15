---
title: Guide pour Minio Client (client S3 AWS)
description: A guide in Minio Client.
---

### A quoi ça sert ?
MinIO Client (ou mc) est un outil en ligne de commande utilisé pour interagir avec les serveurs de stockage d'objets compatibles avec Amazon S3. Il est conçu pour simplifier la gestion des objets dans les buckets de stockage en fournissant une interface en ligne de commande pour effectuer des opérations courantes telles que la gestion des buckets et le transfert de fichiers.

### Télécharger le client
- https://min.io/docs/minio/linux/reference/minio-mc.html
### Configurer minioCLient et Démarrer le serveur 
```bash
 mc alias set <alias> <URL> <AccessKey> <SecretKey> --debug
```
- Le flag  **--debug** est utilisé pour afficher les détails des requêtes envoyées par le client
- Le flag  **--json** peu aussi être utilisé pour afficher d'autres détails des requêtes envoyées par le client

#### **Exemples** :
```bash
  mc alias set myminio http://localhost:8080 '' ''
  ```