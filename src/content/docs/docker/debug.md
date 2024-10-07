---
title: Docker
description: Docker debug 
---

Voir si docker est lancé en exécutant n'importe quelle commande Docker
```bash
docker ps
```

Sur linux, est-ce que docker est bien ajouté au groupe des sudo ?
```bash
docker login
``` 

## build 
```bash 
docker build . #pour les dockerfile

docker compose --build #pour les compose 
```

## Mariadb & user permission

Mariadb: votre user n'a pas tous les droits comparé a votre root. C'est normal, mais cela implique que vous ne pouvez pas vous connecter avec localhost:3306
Afin d'accéder depuis votre pc à votre container sql il faut utilise l'adresse public 0.0.0.0:3306 et non pas localhost. Si vous voulez utiliser localhost il faudra augmenter les droit de votre utilisateur 'user'

## Composer PHP 
Si vous souhaitez dockeriser un projet contenant du composer il faudra également configurer & builder la dockerisation de composer 

# Exemple de dockerfile pour composer 
```bash
# Utiliser l'image PHP officielle
FROM php:8.2-apache

# Installer les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    git \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-install pdo pdo_mysql # pour activer l'extension


# Installer Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier les fichiers du projet
COPY ./ /var/www/html

# Copier le fichier composer.json
# COPY ./composer.json /var/www/html

# Installer les dépendances PHP via Composer
RUN composer install

# Exposer le port 80
EXPOSE 80
```

## Symfony
Pour dockeriser Symfony on peut utiliser le dockerfile fournit par la documentation officielle, cependant cette technique est difficile à implémenter. 
Au final une simple dockerisation de composer peut permettre l'utilisation et le lancement de symfony
A l'aide de dockerfile il faudra dockeriser certaines commande qui s'éxécute au lancement de l'application tel que le 
**dockerfile**:
```bash
CMD symfony server:start
``` 
## Ca ne build pas mais tu ne le sais pas !
Verifier si l'utilisation de différentes version docker est présente tel que 
```bash
    docker compose up --build
```
```bash
    docker-compose up --build
```

Deuxieme façon de faire, tester si des ajout des log/print sont pris en compte lors de build puis des up