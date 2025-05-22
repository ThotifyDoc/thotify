---
layout: ../../../layouts/BaseLayout.astro
title: Guide docker
description: guide docker sur wamp, apache php mysql phpmyadmin
---


# Demo docker

# Introduction

Ce guide sur docker propose une démonstration sur un **environnement WAMP** dockerisé étape par étape tout en s'attardant sur le **raisonnement a à adopter**, les erreurs qu'il est possible de rencontrer, comment adapter sa **posture** pour faire des recherches ainsi que les **concepts clés de docker**.

Prérequis: 
- Utilisation d'un terminal
- Compréhension des environnement de développement
  
# Exercice 

Dockeriser WAMP ou son équivalent (apache mysql php + phpmyadmin en bonus)


# Conception 

Dans quel ordre devrais-je dockeriser mes images ? 
Certains services vont dépendre des autres et pour éviter de perdre du temps et sa patience il vaut mieux réfléchir avant à quelles images dockeriser, dans le bon ordre. 
Par exemple il vaut mieux s'occuper du backend avant le frontend car le front dépend directement des serveurs. 

Ici on a besoin de configurer WAMP. 
    - **MySql** est prioritaire car il peut etre accessible en **standalone** et part la suite accessible via php.
    - Dès lors php doit etre configuré car il permet de requêter mysql, cependant il est difficile de dockeriser php sans serveur prévu pour ce langage. Deux solutions s'offrent à nous, configurer **Apache + Php** en standalone et faire un pont entre les deux. Typquement quelque chose qu'il faudrait faire si on utilisais **Nginx**. Ou bien trouver une image qui permet déjà de dockeriser ces deux services simultanément.
    - Enfin il nous restera phpmyadmin pour visualiser la base de données dont nous nous chargerons en toute dernière étape.

# Step 1 - Recherche des images officiels

Trouver les bonnes images **officielles** est essentiel pour ne pas devoir configurer tout un pant de la technologie que vous souhaitez utiliser. Vous serez à l'abri des surprises et des failles de sécurité dans la plupart des scénarios que vous rencontrerez.

![dockerhub search](/public/docker_guide/dockerhub_search.png)

Il existe une deuxieme façon sécurisée de rechercher des images et ça va nous aider à construire nos conteneurs. 
Dans chaque **image officiel** existe des sous images qui sont des **configurations personnalisées** pour des environnement spécifiques
![dockerhub tags](/public/docker_guide/tags.png) 
![dockerhub recent tags](/public/docker_guide/dockerhub_tags.png)

## Les tags

**Les tags** sont comme des variants de l'image sur laquelle vous êtes. Ces variantes d'images sont directement adaptées pour un contexte bien particulier, ici on a par exemple l'image taggé avec 
    8.3-apache

*On peut effectuer d'autres recherches en fonction de l'image adossé à php que l'on recherche, les tags sont couramment mis à jour a tel point que pendant la rédaction de ce guide qui a durée 2 jours, les tags on été mis a jour plusieurs fois, chamboulant les screen sur lesquels je m'appuie.*

8.3 correspond a la version php étant donné que nous sommes sur le repository de l'image officielle de php, **-apache** correspond a l'édition faite sur cette image. Une image qui comporte ainsi la configuration de **php-8.3 et de apache pré-configurer** pour accueillir notre version de php.

Pour ce projet il est donc préférable de choisir cette image personnalisée plutôt que d'essayer de réinventer la roue en re-faisant la configuration complete de php + apache. 

Pour se rendre compte de ce genre de subtilité il est important de passer par une étape de conception visant a rassembler les différentes images que l'on souhaite utiliser, puis d'affiner nos résultats en fonction des images custom que l'on va pouvoir trouver pendant nos recherches.

mode "**difficile**" (pont entre php apache)
- [MySql](https://hub.docker.com/_/mysql)
- [Php fpm](https://hub.docker.com/_/php)
- [Apache (serveur fastcgi pour php)](https://hub.docker.com/_/httpd)
- [PhpMyAdmin](https://hub.docker.com/_/phpmyadmin)

ou bien 

mode "**facile**" (php apache près intégré)
- [php:8.3-apache](https://hub.docker.com/layers/library/php/8.3-apache/images/sha256-1359f4a03703fa5dc17a43eda21cecb5fa9f0bebccaf7cf2e1af2ff7f0695879) 
(les élèves qui utilisent chatgpt vont sortir cette config)
- [MySql](https://hub.docker.com/_/mysql)
- [PhpMyAdmin](https://hub.docker.com/_/phpmyadmin)

On va partir sur la config facile et on verra par la suite comment configurer wamp avec nginx, qui emprunte la façon "difficile" qui revient au meme que celle de apache tout en étant plus performante
 
A partir de ces dépendances, commencez à construire le docker-compose.yaml
Sur dockerhub, il existe pour chaque image un exemple de configuration en docker-compose.
Il est fortement conseillé de s'en inspirer même si cela ne permet pas toujours de réussir du premier coup

# Step 2 - exemple de construction d'un image mysql dans un docker-compose

La documentation fourni cette base en yaml pour structurer notre docker-compose 

    services:
        db:
            image: mysql
            restart: always
            environment:
            MYSQL_ROOT_PASSWORD: example

Problème, cette configuration est incomplète et ne nous permettra pas de nous connecter comme on le souhaite. Mais dans la suite de la documentation sont évoqués les **variables d'environnement** qui permettent notamment de configurer un utilisateur qui sera notre point d'accès à la base de données. Un **entry point** pour monter un dump de database directement dans notre conteuneur, **un port à exposer** pour configurer la connection string

## Variable d'environnement pour l'image

![variables pour mysql](/thotify/public/docker_guide/mysql_read.png)

Si je lis attentivement la documentation sur dockerhub de mysql notamment sur le chapitre des "Environment variables" je m'aperçois qu'il y a une variable d'environnement, celle présenté dans l'exemple plus haut

    MYSQL_ROOT_PASSWORD

Ensuite, malgrès que les autres variables soit optionnelles pour permettre le lancement du conteneur, les suivantes sont essentielles pour configurer un point de connection pour notre client (ou consommateur mysql). Il faut ainsi déclarer comment se nomme la database que l'on souhaite connecter (c'est aussi important pour pouvoir importer une db existante localement sur notre conteneur).

    MYSQL_DATABASE

Et on fini par renseigner l'user qui devra être créer lors du montage de notre conteneur tel que:

    MYSQL_USER
    MYSQL_PASSWORD

Doivent être égaux aux crédential de l'utilisateur qui viendra se connecter a notre base de données.

à ce stade, voici a quoi devrait ressembler notre docker-compose.yaml

    services:
        mysql:
            image: mysql:latest # image officielle
            environment:  
            MYSQL_ROOT_PASSWORD: root
            MYSQL_DATABASE: boutique-js # le nom réel de la db qui sera mount
            MYSQL_USER: myuser
            MYSQL_PASSWORD: mypassword

## Volumes, Bind mount & docker entrypoint

Les volumes constituent le mécanisme privilégié pour la persistance des données générées et utilisées par les conteneurs Docker. Alors que les montages liés dépendent de la structure des répertoires et du système d'exploitation de la machine hôte, les volumes sont entièrement gérés par Docker. 
Dès lors que vous voulez que les actions soit conservées pendant l'utilisation de votre conteneur mysql il faut configurer vos Volumes afin que les données ne soient pas perdu entre chaque rédémarrage.
Voici comment se configure les volumes 

    mysql:
        image: mysql:latest # image officielle
        environment:  
        MYSQL_ROOT_PASSWORD: root
        MYSQL_DATABASE: boutique-js
        MYSQL_USER: myuser
        MYSQL_PASSWORD: mypassword
        volumes:
        - db-data:/var/lib/mysql


lorsqu'un volume est configuré pour faire persister de la donnée il faut aussi informer notre docker-compose qu'un dossier en physique sera généré.
En effet, si je déclare uniquement le volume dans mon service, il faudra considérer qu'au prochain docker-compose down, la mémoire du volume sera vidée (comme une mémoire tampon). Alors que si on déclare aussi un block **volumes** indépendamment de notre service mysql, on pourra faire persister la mémoire et sortir de la logique d'une mémoire jetable.

En résumé, si je déclare uniquement le volume dans mon service, le mémoire sera de la mémoire jetable, par exemple un dossier qui permet d'enregistrer des images et qui sera vidé a la fermeture du conteneur. Si je déclare un block volumes comme suit qui fait le pont avec le volume de mon service alors la mémoire sera persistante et je pourrais reprendre la ou je m'étais arreté, meme après un redémarrage de conteneur.

A ce stade: 

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

Il nous manque encore quelques notions, tout d'abord quand on monte un environnement il faut aussi penser aux ressources annexe, tel que la base de donnée en elle meme. C'est bien beau d'avoir un conteneur mysql executé mais si celui n'a pas de base de donnée réelle alors il sera presque inexploitable par vos environnements. Si vous détenez déjà une base de données, comme dans la plupart de vos projets, alors il est essentiel de pouvoir importer votre bdd au lancement du contenenur. 

Dans le chapitre **"Initializing a fresh instance"** toujours sur notre dockerhub de mysql, est expliqué la notion d'entrypoint. Les **entrypoints** font également parti du chapitre **Bind Mount** qui permet de **monter** tout un tas de chose sur un conteneur lors de son lancement. Les bind mount sont renseigné dans les volumes et font en général référence a un fichier existant dans votre projet.
Voici un exemple que nous donne la documentation 
    /docker-entrypoint-initdb.d
Cette ligne va être monté dans notre docker-compose afin d'informer docker que notre conteneur doit monter un fichier de type "initdb.d". **Le .d est une convention Unix/Linux** qui indique un répertoire de **"fragments de configuration"** ou de scripts à exécuter ou à inclure automatiquement.

Un parralèle avec les volumes nous permet de comprendre comment configurer notre entrypoint. **Chez docker, tout ce qui est à gauche concerne notre environnement local et tout ce qui est a droite concerne l'environnement du docker engine.**
    
    /my/own/datadir:/var/lib/mysql

Cet exemple nous permet de faire le lien avec l'entrypoint. Si je souhaite le configurer ça donnera cela
      
      - ./db:/docker-entrypoint-initdb.d
je donne mon dossier local, a la racine de mon projet ./db, qui détient mon fichier .sql me permettant de monter ma base de donnée au premier démarrage. 

**Important: Dans docker lorsque l'on cible un dossier il faut fournir un chemin de dossier, si on cible un fichier il faut fournir un chemin de fichier**
    
    ./db/db.sql:/docker-entrypoint-initdb.d 
**Cet exemple n'aurait pas pu marcher car je donne une instruction illogique, je dise que je fourni un fichier vers un endroit qui attend un dossier**

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

## Ports

Les ports permettent de configurer à la volé l'exposition nos conteneurs. Encore une fois, a gauche figure l'exposition a ma configuration locale tandis qu'à droite figure la configuration pour l'environnement de docker, en somme, pour le docker engine (namespace & isolation).

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
  
L'avantage de mettre 3307 en local me permet de cumuler plusieurs version de mysql en live. Par exemple si j'ai déjà installé mysql sur mon systeme, ou bien si j'ai déjà plusieurs conteneurs sous mysql qui tourne cela me permet de lancer plusieurs instances de mysql sans que cela créer de conflit.
Docker s’appuie sur des mécanismes fondamentaux du noyau Linux, et notamment sur les namespaces et les cgroups, pour créer des environnements isolés. 
Chaque conteneur a son propre environnement unix et est détecté par docker a travers son namespace, un petit peu comme on pourrait faire avec les **namespace** en php/C++ et un **autoloader**.  

# Step 3 - php-apache

Comme vu précédement nous allons prendre l'image custom de php qui inclut le **tag** apache.
A ce stade nous avons un service défini avec l'image d'apache

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
                image:php:8.3-apache    
        
        volumes:
            db-data:

Vous vous doutez bien que ce n'est pas suffisant pour héberger un environnement cumulant a la fois php et apache, mais qu'est-ce qu'il peut bien manquer ? 

Dès que l'on est sur la page du tag de l'image officielle on commence a manquer d'information. Le tag ne précise rien en lui même à part ce que fait son image. On a aucune information sur le reste de la config pour le docker-compose. 

Afin de configurer notre docker-compose on va obligatoirement devoir retourner sur les différentes images officilles afin de comprendre tout ce qui est "mandatory" (obligatoire) et configurable.

Pas de panique, si cette image custom existe c'est pour une bonne raison. 
Tout d'abord au niveau du php on se rend compte que la documentation ne préconisais rien de spécial à part de configurer un dockerfile très basique. Et meme en fouillant on a l'impression que tout ça est déjà pris en charge dans notre tag.

Ensuite on se penche sur le cas de **apache**, ou **httpd pour les intimes**.
La documentation est assez succinte il va donc falloir lire chaque ligne pour glaner des informations
à un moment il est écrit : 

        Create a Dockerfile in your project

        FROM httpd:2.4
        COPY ./thotify/public-html/ /usr/local/apache2/htdocs/

Cette config en dockerfile nous permet de comprendre qu'il faut copier nos fichiers de projet vers un virtual directory de docker, un volume en somme. 
Cette explication est implicite et sera perçu uniquement par les personnes qui comprennent bien Docker. C'est frustrant au début mais la plupart des documentations fonctionnent ainsi

On a donc un volume qui va nous permettre de faire évoluer notre dockerfile vers 
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
                image:php:8.3-apache
                volumes:
                    - ./mon-site:/usr/local/apache2/htdocs/
        volumes:
            db-data:

En contiuant de fouiller un peu on tombe également sur 

    You can then COPY your custom configuration in as /usr/local/apache2/conf/httpd.conf:

        FROM httpd:2.4
        COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf

**Mais ici on parle de custom configuration. On a déjà une configuration par défaut, pas besoin d'aller plus loin pour l'instant.**

Et a part ça ? Rien d'autre, il ne nous manque plus qu'a savoir comment exposer notre conteneur, a la fois a l'environnement du docker engine et a la fois pour y accéder localement depuis notre ordinateur.

au début de notre documentation sur httpd on voit ceci: 

    Then, run the commands to build and run the Docker image:

    $ docker build -t my-apache2 .
    $ docker run -dit --name my-running-app -p 8080:80 my-apache2

Ces lignes devrait vous parler. ici on lance notre conteneur de manière manuelle. Le port 8080 est habituel pour exposer tout ce qui se trouve dans /htdocs ou /html et le port 80 concerne toujours les interaction interne de apache avec http, ce qui ne concerne pas le commun des mortels.

Resultat a ce stade: 

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
                image:php:8.3-apache
                volumes:
                    - ./mon-site:/usr/local/apache2/htdocs/
                ports:
                    - 8080:80 
        volumes:
            db-data:

A ce stade il est possible que wamp fonctionne meme s'il manque phpMyAdmin. 
Une erreur pourrait survenir car PDO n'est pas toujours activé nativement chez php. 
Il faudra peut etre créer un dockerfile pour activer PDO manuellement lors du montage des images.

comment trouver ces sources ? Déjà en lançant votre projet si il ne marche pas vous trouverez surement une erreur liée a PDO, si cela arrive cela devrait vous mettre la puce a l'oreille sur le fait qu'il manque des packages a votre configuration.

Utilisez :

    docker logs -f nom_du_conteneur

pour logger le conteneur php et voir si une erreur en liens avec PDO a été générée

Dans le dockerhub officiel de php il y a écrit en tout petit: 

**How to install more PHP extensions**

en lisant un petit peu on tombe sur 
    If you are having difficulty figuring out which Debian or Alpine packages need to be installed before docker-php-ext-install, then have a look at the install-php-extensions project⁠.

Cela peut vous sembler compliqué mais en tant que développeur il faut savoir chercher au bon endroit. On y parvient.

[extension pdo](https://github.com/mlocati/docker-php-extension-installer)

sur ce github sont renseignées toutes les extensions que peut utiliser apache pour configurer php et son utilisation de sql. 
A ce stade on ne sait pas forcément quelles extensions utiliser et installer. Sans les LLM (ia chatgpt) il faudrait pas mal de recherches afin de trouver les bons packages. Avant l'ère des ia c'était typiquement le genre de recherche qui pouvait demander plusieurs jours a errer sur des forums. 
Dans un soucis de simplicité, s'il vous manque les extension pdo utilisez l'ia , sinon il faudra s'attarder sur les dépendances de pdo dans apache/php pour pouvoir configurer un dockerfile qui activera pdo dans notre conteneur.

Pour lancer les extension **PDO** au démarrage de notre image php nous sommes obligé de créer une image personnalisée ou de chercher une image php contenant **PDO**. Parfait c'est l'occassion d'utiliser un **Dockerfile**.

Le dockerfile est une image personnalisée dans laquelle on peut fournir des instruction supplémentaire avec de build notre Dockerfile pour finalement lancer notre conteneur.

**Attention la configuration du Dockerfile peut générer des erreurs car des instructions en doublons peuvent être renseignées**

Dockerfile: 

    FROM php:8.3-apache

    RUN docker-php-ext-install pdo pdo_mysql mysqli

Ici j'indique l'image que l'on va éditer. Celle issu de notre docker-compose
Ensuite je lui fourni une liste de dépendance a activer sous l'environnement linux de notre conteneur. Normalement si tout se passe bien notre conteneur devrais aller dans un fichier de module php et activer les modules PDO qui sont désactivés par defaut. Dans le cas ou ces packages ne serait pas installés dans notre image on pourrait demander a notre image custom de le faire puis de RUN (activer) nos packages 

Autre exemple (normalment pas utile, celui du haut devrait suffire)
    FROM php:8.3-apache

    RUN apt-get update && apt-get install -y \
        libzip-dev \
        zip \
        && docker-php-ext-install zip pdo pdo_mysql mysqli


Une fois que le dockerfile est pret il ne nous reste plus qu'a modifier notre docker-compose pour l'y intégrer. On remplace notre image de base par un build local (notre Dockerfile)

tel que : 
   
    php-apache: 
        build: .
        ports:
        - "8080:80"
        volumes:
        - ./:/var/www/html
        depends_on:
        - mysql



## Premier lancement test
Juste avant de lancer notre docker compose il nous reste une question à élucider. 

est-ce que mes conteneurs peuvent tous démarrer en meme temps ou risque-t-il d'y avoir un conflit entre les un qui dépendent des autres ? 

Pour répondre à cela docker possède tout un tas d'annotations et notamment le **depends_on** qui nous permet de chaîner nos conteneur pour qu'ils démarrent dans le bon ordre. Comme on l'a dit dès le début, mysql peut être lancé en standalone, on va donc faire dépendre php-apache de mysql

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

**A ce stade vous pouvez rencontrer plusieurs problèmes**
- Vous n'avez pas mis votre fichier .sql dans votre dossier d'entry point ./db ce qui fait que votre base de données est créer mais vide
- Vous avez un conflit de port car l'un d'entre eux est déjà utilisé dans votre environnement local (changez l'exposition ex:8180 jusqu'a ne plus etre en already used)
- Votre fichier sql provient de Mariadb et non de mysql donc votre encodage n'est pas compatible
- Si quand vous accédez a localhost:8080 vous etes en forbidden c'est surement que vos fichier n'ont pas été copiés a la racine de /html de votre server apache, il faut revoir les chemins dans votre docker compose. Peut etre modifier la racine de votre projet.

Normalement ça devrait être tout et vous devriez etre capable d'accéder a votre site sur localhost:8080
si vos crédentials de bases de données sont bon vous devriez pouvoir voir vos requetes

essayez de logger vos conteneurs en cas de besoin voir d'y faire un tour avec 

    docker logs -f nom_du_conteneur
    docker ps
    docker exec -it "container_id" /bin/bash 
puis naviguez jusqu'a html pour voir si votre projet a bien été copié.

## conteneur phpmyadmin 

Derniere étape, pouvoir visualiser votre base de données.

[PhpMyAdmin](https://hub.docker.com/_/phpmyadmin)

En scrollant légèrement on tombe sur ce yaml 
 
    phpmyadmin:
        image: phpmyadmin
        restart: always
        ports:
        - 8080:80
        environment:
        - PMA_ARBITRARY=1

Normalment c'est presque parfait, il y a uniquement le port a modifier et ça devrait fonctionner

Ce qui nous donne 

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

Quand vous accéderez a PhpMyAdmin pensez a bien mettre mysql en nom de serveur puis vos crédentials et vous pourrez vérifier facilement si votre BDD a bien été monté au démarrage.