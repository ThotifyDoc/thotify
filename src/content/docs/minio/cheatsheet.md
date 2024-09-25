---
layout: ../../../layouts/BaseLayout.astro
title: Cheat Sheet pour Minio Client
description: Cheat Sheet.
---


### Lister les alias 
```bash
  mc ls
```
##

### Créer un bucket 
```bash
  mc mb <alias>/<bucket_name>
```
#### **Exemples** :
```bash
  mc mb myminio/bucket1
  ```
##

### Lister les buckets : 
```bash
  mc ls <alias>
```
##

### Lister les objets dans un bucket : 
```bash
  mc ls <alias>/<bucket-name>
```
#### **Exemples** :
```bash
  mc ls myminio/bucket1
  ```
##

### Supprimer un bucket : 
```bash
  mc rb <alias>/<bucket-name>

```
#### **Exemples** :
```bash
  mc rb myminio/bucket1
  ```
##

### Ajouter un fichier à un bucket : 
```bash
  mc cp <file-path> <alias>/<bucket-name>

```
#### **Exemples** :
```bash
  mc cp myminio/bucket2/thot.jpg myminio/bucket1/thot_copy.jpg
  ```
##

### Copier un fichier à partir d'un bucket : 

```bash
  mc cp <alias>/<bucketname>/<filename> <urlfinaldestination>
```
#### **Exemples** :
- **Téléchargement** d'un bucket au dossier Download de la machine :
```bash
  mc cp myminio\bucket2\thot.jpg myminio\bucket1\thot_copy.jpg
```
- **Téléchargement** d'un bucket a un autre bucket :
```bash
  mc cp myminio\bucket2\thot.jpg myminio\bucket1\thot_copy.jpg
```

##

### Supprimer un fichier dans bucket : 

```bash
  mc rm <alias>/<bucketName>/<fileName>
```
#### **Exemples** :
```bash
  mc rm myminio/bucket2/thot.jpg
```

##

### Supprimer un bucket et son contenu : 

```bash
  mc rb <alias>/<bucketName>
```
#### **Exemples** :
```bash
  mc rb myminio/bucket1
```

##