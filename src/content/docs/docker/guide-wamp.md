---
layout: ../../../layouts/BaseLayout.astro
title: Guide docker
description: guide docker sur wamp, apache php mysql phpmyadmin
---

# Guide Docker - Environnement WAMP

## Introduction

Ce guide sur Docker propose une démonstration sur un **environnement WAMP** dockerisé étape par étape tout en s'attardant sur le **raisonnement à adopter**, les erreurs qu'il est possible de rencontrer, comment adapter sa **posture** pour faire des recherches ainsi que les **concepts clés de Docker**.

**Prérequis :**
- Utilisation d'un terminal
- Compréhension des environnements de développement
  
## Exercice 

Dockeriser WAMP ou son équivalent (Apache, MySQL, PHP + phpMyAdmin en bonus)

## Conception 

Dans quel ordre devrais-je dockeriser mes images ? 

Certains services vont dépendre des autres et pour éviter de perdre du temps et sa patience, il vaut mieux réfléchir avant à quelles images dockeriser, dans le bon ordre. Par exemple, il vaut mieux s'occuper du backend avant le frontend car le front dépend directement des serveurs. 

Ici on a besoin de configurer WAMP :

- **MySQL** est prioritaire car il peut être accessible en **standalone** et par la suite accessible via PHP.
- Dès lors, PHP doit être configuré car il permet de requêter MySQL, cependant il est difficile de dockeriser PHP sans serveur prévu pour ce langage. Deux solutions s'offrent à nous : configurer **Apache + PHP** en standalone et faire un pont entre les deux. Typiquement quelque chose qu'il faudrait faire si on utilisait **Nginx**. Ou bien trouver une image qui permet déjà de dockeriser ces deux services simultanément.
- Enfin, il nous restera phpMyAdmin pour visualiser la base de données dont nous nous chargerons en toute dernière étape.

## Étape 1 - Recherche des images officielles

Trouver les bonnes images **officielles** est essentiel pour ne pas devoir configurer tout un pan de la technologie que vous souhaitez utiliser. Vous serez à l'abri des surprises et des failles de sécurité dans la plupart des scénarios que vous rencontrerez.

![dockerhub search](/thotify/docker_guide/dockerhub_search.png)

Il existe une deuxième façon sécurisée de rechercher des images et ça va nous aider à construire nos conteneurs. 
Dans chaque **image officielle** existent des sous-images qui sont des **configurations personnalisées** pour des environnements spécifiques.

![dockerhub tags](/thotify/docker_guide/tags.png) 
![dockerhub recent tags](/thotify/docker_guide/dockerhub_tags.png)

### Les tags

**Les tags** sont comme des variants de l'image sur laquelle vous êtes. Ces variantes d'images sont directement adaptées pour un contexte bien particulier. Ici, on a par exemple l'image taggée avec :

```
8.3-apache
```

*On peut effectuer d'autres recherches en fonction de l'image adossée à PHP que l'on recherche. Les tags sont couramment mis à jour à tel point que pendant la rédaction de ce guide qui a duré 2 jours, les tags ont été mis à jour plusieurs fois, chamboulant les screenshots sur lesquels je m'appuis.*

`8.3` correspond à la version PHP étant donné que nous sommes sur le repository de l'image officielle de PHP. `-apache` correspond à l'édition faite sur cette image. Une image qui comporte ainsi la configuration de **PHP 8.3 et d'Apache préconfigurés** pour accueillir notre version de PHP.

Pour ce projet, il est donc préférable de choisir cette image personnalisée plutôt que d'essayer de réinventer la roue en refaisant la configuration complète de PHP + Apache. 

Pour se rendre compte de ce genre de subtilité, il est important de passer par une étape de conception visant à rassembler les différentes images que l'on souhaite utiliser, puis d'affiner nos résultats en fonction des images custom que l'on va pouvoir trouver pendant nos recherches.

**Mode "difficile"** (pont entre PHP et Apache) :
- [MySQL](https://hub.docker.com/_/mysql)
- [PHP FPM](https://hub.docker.com/_/php)
- [Apache (serveur FastCGI pour PHP)](https://hub.docker.com/_/httpd)
- [phpMyAdmin](https://hub.docker.com/_/phpmyadmin)

**Mode "facile"** (PHP Apache pré-intégré) :
- [php:8.3-apache](https://hub.docker.com/layers/library/php/8.3-apache/images/sha256-1359f4a03703fa5dc17a43eda21cecb5fa9f0bebccaf7cf2e1af2ff7f0695879) 
- [MySQL](https://hub.docker.com/_/mysql)
- [phpMyAdmin](https://hub.docker.com/_/phpmyadmin)

On va partir sur la config facile et on verra par la suite comment configurer WAMP avec Nginx, qui emprunte la façon "difficile" qui revient au même que celle d'Apache tout en étant plus performante.
 
À partir de ces dépendances, commencez à construire le `docker-compose.yaml`.
Sur Docker Hub, il existe pour chaque image un exemple de configuration en docker-compose.
Il est fortement conseillé de s'en inspirer même si cela ne permet pas toujours de réussir du premier coup.

## Étape 2 - Exemple de construction d'une image MySQL dans un docker-compose

La documentation fournit cette base en YAML pour structurer notre docker-compose :

```yaml
services:
    db:
        image: mysql
        restart: always
        environment:
            MYSQL_ROOT_PASSWORD: example
```

Problème : cette configuration est incomplète et ne nous permettra pas de nous connecter comme on le souhaite. Mais dans la suite de la documentation sont évoquées les **variables d'environnement** qui permettent notamment de configurer un utilisateur qui sera notre point d'accès à la base de données. Un **entry point** pour monter un dump de database directement dans notre conteneur, **un port à exposer** pour configurer la connection string.

### Variables d'environnement pour l'image

![variables pour mysql](/thotify/docker_guide/mysql_read.png)

Si je lis attentivement la documentation sur Docker Hub de MySQL, notamment sur le chapitre des "Environment variables", je m'aperçois qu'il y a une variable d'environnement, celle présentée dans l'exemple plus haut :

```
MYSQL_ROOT_PASSWORD
```

Ensuite, malgré que les autres variables soient optionnelles pour permettre le lancement du conteneur, les suivantes sont essentielles pour configurer un point de connection pour notre client (ou consommateur MySQL). Il faut ainsi déclarer comment se nomme la database que l'on souhaite connecter (c'est aussi important pour pouvoir importer une DB existante localement sur notre conteneur) :

```
MYSQL_DATABASE
```

Et on finit par renseigner l'user qui devra être créé lors du montage de notre conteneur tel que :

```
MYSQL_USER
MYSQL_PASSWORD
```

Doivent être égaux aux credentials de l'utilisateur qui viendra se connecter à notre base de données.

À ce stade, voici à quoi devrait ressembler notre `docker-compose.yaml` :

```yaml
services:
    mysql:
        image: mysql:latest # image officielle
        environment:  
            MYSQL_ROOT_PASSWORD: root
            MYSQL_DATABASE: boutique-js # le nom réel de la db qui sera montée
            MYSQL_USER: myuser
            MYSQL_PASSWORD: mypassword
```

### Volumes, Bind mount & docker entrypoint

Les volumes constituent le mécanisme privilégié pour la persistance des données générées et utilisées par les conteneurs Docker. Alors que les montages liés dépendent de la structure des répertoires et du système d'exploitation de la machine hôte, les volumes sont entièrement gérés par Docker. 

Dès lors que vous voulez que les actions soient conservées pendant l'utilisation de votre conteneur MySQL, il faut configurer vos volumes afin que les données ne soient pas perdues entre chaque redémarrage.

Voici comment se configurent les volumes :

```yaml
mysql:
    image: mysql:latest # image officielle
    environment:  
        MYSQL_ROOT_PASSWORD: root
        MYSQL_DATABASE: boutique-js
        MYSQL_USER: myuser
        MYSQL_PASSWORD: mypassword
    volumes:
        - db-data:/var/lib/mysql
```

Lorsqu'un volume est configuré pour faire persister de la donnée, il faut aussi informer notre docker-compose qu'un dossier en physique sera généré.

En effet, si je déclare uniquement le volume dans mon service, il faudra considérer qu'au prochain `docker-compose down`, la mémoire du volume sera vidée (comme une mémoire tampon). Alors que si on déclare aussi un block **volumes** indépendamment de notre service MySQL, on pourra faire persister la mémoire et sortir de la logique d'une mémoire jetable.

En résumé, si je déclare uniquement le volume dans mon service, la mémoire sera de la mémoire jetable, par exemple un dossier qui permet d'enregistrer des images et qui sera vidé à la fermeture du conteneur. Si je déclare un block volumes comme suit qui fait le pont avec le volume de mon service, alors la mémoire sera persistante et je pourrai reprendre là où je m'étais arrêté, même après un redémarrage de conteneur.

À ce stade :

```yaml
services:
    mysql:
        image: mysql:latest
        environment:
            MYSQL_ROOT_PASSWORD: root
            MYSQL_DATABASE: boutique-js
            MYSQL_USER: myuser
            MYSQL_PASSWORD: mypassword
        ports:
            - "3307:3306"
        volumes:
            - db-data:/var/lib/mysql

volumes:
    db-data:
```

Il nous manque encore quelques notions. Tout d'abord, quand on monte un environnement, il faut aussi penser aux ressources annexes, telles que la base de données en elle-même. C'est bien beau d'avoir un conteneur MySQL exécuté mais si celui-ci n'a pas de base de données réelle, alors il sera presque inexploitable par vos environnements. Si vous détenez déjà une base de données, comme dans la plupart de vos projets, alors il est essentiel de pouvoir importer votre BDD au lancement du conteneur. 

Dans le chapitre **"Initializing a fresh instance"**, toujours sur notre Docker Hub de MySQL, est expliquée la notion d'entrypoint. Les **entrypoints** font également partie du chapitre **Bind Mount** qui permet de **monter** tout un tas de choses sur un conteneur lors de son lancement. Les bind mount sont renseignés dans les volumes et font en général référence à un fichier existant dans votre projet.

Voici un exemple que nous donne la documentation :

```
/docker-entrypoint-initdb.d
```

Cette ligne va être montée dans notre docker-compose afin d'informer Docker que notre conteneur doit monter un fichier de type "initdb.d". **Le `.d` est une convention Unix/Linux** qui indique un répertoire de **"fragments de configuration"** ou de scripts à exécuter ou à inclure automatiquement.

Un parallèle avec les volumes nous permet de comprendre comment configurer notre entrypoint. **Chez Docker, tout ce qui est à gauche concerne notre environnement local et tout ce qui est à droite concerne l'environnement du docker engine.**

```
/my/own/datadir:/var/lib/mysql
```

Cet exemple nous permet de faire le lien avec l'entrypoint. Si je souhaite le configurer ça donnera cela :

```
- ./db:/docker-entrypoint-initdb.d
```

Je donne mon dossier local, à la racine de mon projet `./db`, qui détient mon fichier `.sql` me permettant de monter ma base de données au premier démarrage. 

**Important : Dans Docker, lorsque l'on cible un dossier, il faut fournir un chemin de dossier. Si on cible un fichier, il faut fournir un chemin de fichier.**

```
./db/db.sql:/docker-entrypoint-initdb.d 
```

**Cet exemple n'aurait pas pu marcher car je donne une instruction illogique : je dis que je fournis un fichier vers un endroit qui attend un dossier.**

```yaml
services:
    mysql:
        image: mysql:latest # image officielle
        environment:  
            MYSQL_ROOT_PASSWORD: root
            MYSQL_DATABASE: boutique-js
            MYSQL_USER: myuser
            MYSQL_PASSWORD: mypassword
        volumes:
            - db-data:/var/lib/mysql
            - ./db:/docker-entrypoint-initdb.d

volumes:
    db-data:
```

### Ports

Les ports permettent de configurer à la volée l'exposition de nos conteneurs. Encore une fois, à gauche figure l'exposition à ma configuration locale tandis qu'à droite figure la configuration pour l'environnement de Docker, en somme, pour le docker engine (namespace & isolation).

```yaml
mysql:
    image: mysql:latest
    environment:
        MYSQL_ROOT_PASSWORD: root
        MYSQL_DATABASE: boutique-js
        MYSQL_USER: myuser
        MYSQL_PASSWORD: mypassword
    ports:
        - "3307:3306"
    volumes:
        - db-data:/var/lib/mysql
        - ./db:/docker-entrypoint-initdb.d

volumes:
    db-data:
```

L'avantage de mettre 3307 en local me permet de cumuler plusieurs versions de MySQL en live. Par exemple, si j'ai déjà installé MySQL sur mon système, ou bien si j'ai déjà plusieurs conteneurs sous MySQL qui tournent, cela me permet de lancer plusieurs instances de MySQL sans que cela crée de conflit.

Docker s'appuie sur des mécanismes fondamentaux du noyau Linux, et notamment sur les namespaces et les cgroups, pour créer des environnements isolés. Chaque conteneur a son propre environnement Unix et est détecté par Docker à travers son namespace, un peu comme on pourrait faire avec les **namespaces** en PHP/C++ et un **autoloader**.  

## Étape 3 - PHP-Apache

Comme vu précédemment, nous allons prendre l'image custom de PHP qui inclut le **tag** Apache.
À ce stade, nous avons un service défini avec l'image d'Apache :

```yaml
services:
    mysql:
        image: mysql:latest
        environment:
            MYSQL_ROOT_PASSWORD: root
            MYSQL_DATABASE: boutique-js
            MYSQL_USER: myuser
            MYSQL_PASSWORD: mypassword
        ports:
            - "3307:3306"
        volumes:
            - db-data:/var/lib/mysql
            - ./db:/docker-entrypoint-initdb.d

    php-apache: 
        image: php:8.3-apache    
    
volumes:
    db-data:
```

Vous vous doutez bien que ce n'est pas suffisant pour héberger un environnement cumulant à la fois PHP et Apache. Mais qu'est-ce qu'il peut bien manquer ? 

Dès que l'on est sur la page du tag de l'image officielle, on commence à manquer d'informations. Le tag ne précise rien en lui-même à part ce que fait son image. On n'a aucune information sur le reste de la config pour le docker-compose. 

Afin de configurer notre docker-compose, on va obligatoirement devoir retourner sur les différentes images officielles afin de comprendre tout ce qui est "mandatory" (obligatoire) et configurable.

Pas de panique, si cette image custom existe, c'est pour une bonne raison. Tout d'abord, au niveau de PHP, on se rend compte que la documentation ne préconisait rien de spécial à part de configurer un Dockerfile très basique. Et même en fouillant, on a l'impression que tout ça est déjà pris en charge dans notre tag.

Ensuite, on se penche sur le cas d'**Apache**, ou **httpd pour les intimes**. La documentation est assez succincte, il va donc falloir lire chaque ligne pour glaner des informations. À un moment, il est écrit : 

```
Create a Dockerfile in your project

FROM httpd:2.4
COPY ./thotify/public-html/ /usr/local/apache2/htdocs/
```

Cette config en Dockerfile nous permet de comprendre qu'il faut copier nos fichiers de projet vers un virtual directory de Docker, un volume en somme. Cette explication est implicite et sera perçue uniquement par les personnes qui comprennent bien Docker. C'est frustrant au début mais la plupart des documentations fonctionnent ainsi.

On a donc un volume qui va nous permettre de faire évoluer notre Dockerfile vers :

```yaml
services:
    mysql:
        image: mysql:latest
        environment:
            MYSQL_ROOT_PASSWORD: root
            MYSQL_DATABASE: boutique-js
            MYSQL_USER: myuser
            MYSQL_PASSWORD: mypassword
        ports:
            - "3307:3306"
        volumes:
            - db-data:/var/lib/mysql
            - ./db:/docker-entrypoint-initdb.d

    php-apache: 
        image: php:8.3-apache
        volumes:
            - ./mon-site:/usr/local/apache2/htdocs/

volumes:
    db-data:
```

En continuant de fouiller un peu, on tombe également sur :

```
You can then COPY your custom configuration in as /usr/local/apache2/conf/httpd.conf:

FROM httpd:2.4
COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf
```

**Mais ici on parle de custom configuration. On a déjà une configuration par défaut, pas besoin d'aller plus loin pour l'instant.**

Et à part ça ? Rien d'autre, il ne nous manque plus qu'à savoir comment exposer notre conteneur, à la fois à l'environnement du docker engine et à la fois pour y accéder localement depuis notre ordinateur.

Au début de notre documentation sur httpd, on voit ceci : 

```bash
Then, run the commands to build and run the Docker image:

$ docker build -t my-apache2 .
$ docker run -dit --name my-running-app -p 8080:80 my-apache2
```

Ces lignes devraient vous parler. Ici on lance notre conteneur de manière manuelle. Le port 8080 est habituel pour exposer tout ce qui se trouve dans `/htdocs` ou `/html` et le port 80 concerne toujours les interactions internes d'Apache avec HTTP, ce qui ne concerne pas le commun des mortels.

Résultat à ce stade :

```yaml
services:
    mysql:
        image: mysql:latest
        environment:
            MYSQL_ROOT_PASSWORD: root
            MYSQL_DATABASE: boutique-js
            MYSQL_USER: myuser
            MYSQL_PASSWORD: mypassword
        ports:
            - "3307:3306"
        volumes:
            - db-data:/var/lib/mysql
            - ./db:/docker-entrypoint-initdb.d
    
    php-apache: 
        image: php:8.3-apache
        volumes:
            - ./mon-site:/usr/local/apache2/htdocs/
        ports:
            - 8080:80 

volumes:
    db-data:
```

À ce stade, il est possible que WAMP fonctionne même s'il manque phpMyAdmin. Une erreur pourrait survenir car PDO n'est pas toujours activé nativement chez PHP. Il faudra peut-être créer un Dockerfile pour activer PDO manuellement lors du montage des images.

Comment trouver ces sources ? Déjà en lançant votre projet, s'il ne marche pas, vous trouverez sûrement une erreur liée à PDO. Si cela arrive, cela devrait vous mettre la puce à l'oreille sur le fait qu'il manque des packages à votre configuration.

Utilisez :

```bash
docker logs -f nom_du_conteneur
```

pour logger le conteneur PHP et voir si une erreur en lien avec PDO a été générée.

Dans le Docker Hub officiel de PHP, il y a écrit en tout petit : 

**How to install more PHP extensions**

En lisant un petit peu, on tombe sur :

```
If you are having difficulty figuring out which Debian or Alpine packages need to be installed before docker-php-ext-install, then have a look at the install-php-extensions project.
```

Cela peut vous sembler compliqué mais en tant que développeur, il faut savoir chercher au bon endroit. On y parvient.

[Extension PDO](https://github.com/mlocati/docker-php-extension-installer)

Sur ce GitHub sont renseignées toutes les extensions que peut utiliser Apache pour configurer PHP et son utilisation de SQL. À ce stade, on ne sait pas forcément quelles extensions utiliser et installer. Sans les LLM (IA ChatGPT), il faudrait pas mal de recherches afin de trouver les bons packages. Avant l'ère des IA, c'était typiquement le genre de recherche qui pouvait demander plusieurs jours à errer sur des forums. 

Dans un souci de simplicité, s'il vous manque les extensions PDO, utilisez l'IA, sinon il faudra s'attarder sur les dépendances de PDO dans Apache/PHP pour pouvoir configurer un Dockerfile qui activera PDO dans notre conteneur.

Pour lancer les extensions **PDO** au démarrage de notre image PHP, nous sommes obligés de créer une image personnalisée ou de chercher une image PHP contenant **PDO**. Parfait, c'est l'occasion d'utiliser un **Dockerfile**.

Le Dockerfile est une image personnalisée dans laquelle on peut fournir des instructions supplémentaires avant de build notre Dockerfile pour finalement lancer notre conteneur.

**Attention : la configuration du Dockerfile peut générer des erreurs car des instructions en doublon peuvent être renseignées.**

**Dockerfile :**

```dockerfile
FROM php:8.3-apache

RUN docker-php-ext-install pdo pdo_mysql mysqli
```

Ici j'indique l'image que l'on va éditer. Celle issue de notre docker-compose.
Ensuite je lui fournis une liste de dépendances à activer sous l'environnement Linux de notre conteneur. Normalement, si tout se passe bien, notre conteneur devrait aller dans un fichier de module PHP et activer les modules PDO qui sont désactivés par défaut. Dans le cas où ces packages ne seraient pas installés dans notre image, on pourrait demander à notre image custom de le faire puis de RUN (activer) nos packages.

Autre exemple (normalement pas utile, celui du haut devrait suffire) :

```dockerfile
FROM php:8.3-apache

RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    && docker-php-ext-install zip pdo pdo_mysql mysqli
```

Une fois que le Dockerfile est prêt, il ne nous reste plus qu'à modifier notre docker-compose pour l'y intégrer. On remplace notre image de base par un build local (notre Dockerfile) :

```yaml
php-apache: 
    build: .
    ports:
        - "8080:80"
    volumes:
        - ./:/var/www/html
    depends_on:
        - mysql
```

### Premier lancement test

Juste avant de lancer notre docker-compose, il nous reste une question à élucider : 

Est-ce que mes conteneurs peuvent tous démarrer en même temps ou risque-t-il d'y avoir un conflit entre ceux qui dépendent des autres ? 

Pour répondre à cela, Docker possède tout un tas d'annotations et notamment le **depends_on** qui nous permet de chaîner nos conteneurs pour qu'ils démarrent dans le bon ordre. Comme on l'a dit dès le début, MySQL peut être lancé en standalone, on va donc faire dépendre php-apache de MySQL.

```yaml
services:
    mysql:
        image: mysql:latest
        environment:
            MYSQL_ROOT_PASSWORD: root
            MYSQL_DATABASE: boutique-js
            MYSQL_USER: myuser
            MYSQL_PASSWORD: mypassword
        ports:
            - "3307:3306"
        volumes:
            - db-data:/var/lib/mysql
            - ./db:/docker-entrypoint-initdb.d

    php-apache: 
        build: .
        ports:
            - "8080:80"
        volumes:
            - ./:/var/www/html
        depends_on:
            - mysql

volumes:
    db-data:
```

**À ce stade, vous pouvez rencontrer plusieurs problèmes :**

- Vous n'avez pas mis votre fichier `.sql` dans votre dossier d'entry point `./db`, ce qui fait que votre base de données est créée mais vide
- Vous avez un conflit de port car l'un d'entre eux est déjà utilisé dans votre environnement local (changez l'exposition ex: 8180 jusqu'à ne plus être en "already used")
- Votre fichier SQL provient de MariaDB et non de MySQL donc votre encodage n'est pas compatible
- Si quand vous accédez à `localhost:8080` vous êtes en "forbidden", c'est sûrement que vos fichiers n'ont pas été copiés à la racine de `/html` de votre serveur Apache. Il faut revoir les chemins dans votre docker-compose. Peut-être modifier la racine de votre projet.

Normalement, ça devrait être tout et vous devriez être capable d'accéder à votre site sur `localhost:8080`.
Si vos credentials de base de données sont bons, vous devriez pouvoir voir vos requêtes.

Essayez de logger vos conteneurs en cas de besoin ou d'y faire un tour avec :

```bash
docker logs -f nom_du_conteneur
docker ps
docker exec -it "container_id" /bin/bash 
```

Puis naviguez jusqu'à `html` pour voir si votre projet a bien été copié.

## Conteneur phpMyAdmin 

Dernière étape : pouvoir visualiser votre base de données.

[phpMyAdmin](https://hub.docker.com/_/phpmyadmin)

En scrollant légèrement, on tombe sur ce YAML :

```yaml
phpmyadmin:
    image: phpmyadmin
    restart: always
    ports:
        - 8080:80
    environment:
        - PMA_ARBITRARY=1
```

Normalement, c'est presque parfait, il y a uniquement le port à modifier et ça devrait fonctionner.

Ce qui nous donne :

```yaml
services:
    mysql:
        image: mysql:latest
        environment:
            MYSQL_ROOT_PASSWORD: root
            MYSQL_DATABASE: boutique-js
            MYSQL_USER: myuser
            MYSQL_PASSWORD: mypassword
        ports:
            - "3307:3306"
        volumes:
            - db-data:/var/lib/mysql
            - ./db:/docker-entrypoint-initdb.d

    php-apache: 
        build: .
        ports:
            - "8080:80"
        volumes:
            - ./:/var/www/html
        depends_on:
            - mysql

    phpmyadmin:
        image: phpmyadmin
        restart: always
        ports:
            - 8081:80
        environment:
            - PMA_ARBITRARY=1

volumes:
    db-data:
```

Quand vous accéderez à phpMyAdmin, pensez à bien mettre `mysql` en nom de serveur puis vos credentials et vous pourrez vérifier facilement si votre BDD a bien été montée au démarrage.

## Pour aller plus loin

Recherchez les commandes de base, lisez les définitions sur la documentation officielle sur les divers concepts mal compris comme : 

- Dockerfile
- Docker compose
- Volumes
- Networks
- Logging
- Config serveur (Apache2, Nginx) 
- Docker Hub