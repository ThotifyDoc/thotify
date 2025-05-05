---
title: UX UI Design - Infos design system
description: Infos sur la création de design system
---


# Nginx

## Structure du fichier de configuration
    Nginx est composé de modules contrôlés par des directives spécifiées dans le fichier de configuration. Les directives sont divisées en directives simples et directives de bloc. Une directive simple se compose du nom et des paramètres, séparés par des espaces, et se termine par un point-virgule ( ;). Une directive de bloc a la même structure qu'une directive simple, mais au lieu du point-virgule, elle se termine par un ensemble d'instructions supplémentaires entourées d'accolades ( {et }). Si une directive de bloc peut contenir d'autres directives entre accolades, on parle de contexte (exemples : events , http , server et location ).

    Les directives placées dans le fichier de configuration en dehors de tout contexte sont considérées comme faisant partie du contexte principal . Les directives eventset httprésident dans le maincontexte, server dans http, et locationdans server.

    Le reste d'une ligne après le #signe est considéré comme un commentaire.

### Location
    Définit la configuration en fonction d'un URI de demande. Les blocs Location peuvent être imbriqués pour des cas d'utilisation particulier (routing).
    Pour trouver l'emplacement correspondant à une requête donnée, nginx vérifie d'abord les emplacements définis à l'aide des chaînes de préfixe (emplacements de préfixe). Parmi eux, l'emplacement avec le préfixe correspondant le plus long est sélectionné et mémorisé. Les expressions régulières sont ensuite vérifiées, dans l'ordre de leur apparition dans le fichier de configuration. La recherche d'expressions régulières s'arrête à la première correspondance et la configuration correspondante est utilisée. Si aucune correspondance avec une expression régulière n'est trouvée, la configuration de l'emplacement de préfixe mémorisé précédemment est utilisée.

    Exemple 1 : 
        location / {
        try_files $uri $uri/ =404;

    }
    Charger l'uri demdandé ou revoyer 404 (navigation dossier/fichier)
     

    Exemple 2 :
        location / {
        try_files $uri $uri/ /index.php?$args;

    }
    Tente de servir le fichier dedmandé dans l'uri. S'il n'est pas trouvé, renvoie vers l'index.php qui se trouve a la racine du root (root du block server)


#### Types de serveurs 

##### Serveur statique 

Idéal pour les applications déjà buildé (react / html/Css)

server {
    listen 80;
    root /var/www/mon-site;
    
    location / {
        try_files $uri $uri/ =404;
    }
}


##### Serveur Dynamique (PHP) fastcgi

En 2025, on peut considérer que seul PHP utilise encore massivement FastCGI.

Dans les années 2000, PHP était exécuté via le module mod_php d'Apache. Avec l’arrivée de Nginx, qui ne prend pas en charge les modules comme mod_php, il a fallu adapter le fonctionnement de PHP à l’aide d’outils comme php-fpm (FastCGI Process Manager) communiquant via FastCGI.

Aujourd’hui, malgré les évolutions du langage, PHP ne possède toujours pas de serveur HTTP intégré. Il repose sur une exécution déléguée via php-fpm, utilisant FastCGI. Cette architecture, bien que moins flexible que celles des langages modernes, repose sur une séparation claire entre le traitement HTTP (via Nginx) et l’exécution du code (via PHP-FPM), ce qui apporte robustesse, sécurité et scalabilité.


location ~ \.php$ {
    include fastcgi_params;
    fastcgi_pass unix:/run/php/php8.2-fpm.sock;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
}

fastcgi_pass ≈ langage spécialisé que seuls certains serveurs comprennent (comme PHP-FPM).

##### Serveur proxy 

    Définit le protocole et l'adresse d'un serveur proxy, ainsi qu'une URI facultative vers laquelle un emplacement doit être mappé. Le protocole peut être «http » ou «https ». L'adresse peut être un nom de domaine ou une adresse IP, et un port facultatif :

    exemple 1 : 
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
    }


    exemple 2 : Reverse proxy || Gateway
    server {
        listen 80;
        server_name monsite.com;

        location /app1/ {
            proxy_pass http://192.168.1.10:9000; # Serveur PHP 1
        }

        location /app2/ {
            proxy_pass http://192.168.1.11:9000; # Serveur PHP 2
        }

        location / {
            root /var/www/mon-site;
            try_files $uri $uri/ =404;
        }
    }

proxy_pass ≈ langage universel que tous les serveurs web modernes comprennent (HTTP).

##### Serveur GRPC

location /grpc.Service/ {
    grpc_pass grpc://localhost:50051;
}

Idéal pour les serveur utilisant du GRPC. A creuser


### Les modules 

    Définit la configuration d'un serveur virtuel. Il n'existe pas de distinction claire entre les serveurs virtuels basés sur l'adresse IP (basée sur l'adresse IP) et ceux basés sur le nom (basé sur le champ d'en-tête de requête « Host »). À la place, les directives listen décrivent toutes les adresses et tous les ports devant accepter les connexions pour le serveur, et la directive server_name répertorie tous les noms de serveurs. Des exemples de configuration sont fournis dans le document « Comment nginx traite une requête ».

Exemple 1 : 

server {
    server_name example.com www.example.com;
}

Le premier nom dans server_name sera la premier nom utilité dans la liste.

Nginx va utiliser le bloc server dont le server_name correspond le mieux à l’Host de la requête HTTP, en partant du premier jusqu'au dernier.

On peut ajouter des jokers (*) pour faire des correspondances partielles :

server_name *.example.com;       # sous-domaines comme app.example.com, www.example.com
server_name example.*;           # domaines comme example.com, example.net (rarement utilisé)
server_name ~^www\d+\.example\.com$;  # regex pour www suivi d’un nombre


### Http

http {
    gzip on;
    server_tokens off;
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
    '$status $body_bytes_sent "$http_referer" '
    '"$http_user_agent" "$http_x_forwarded_for"';
    
    include /etc/nginx/sites-enabled/*;
}

Fournit le contexte du fichier de configuration dans lequel les directives du serveur HTTP sont spécifiées c'est le contexte global de Nginx
C’est dans ce bloc que l'on va placer des directives qui affectent l'ensemble des serveurs HTTP (comme les paramètres de compression, de cache, de log, MIME,etc.).

Dans ce bloc, on peut aussi inclure des directives communes comme gzip, server_tokens, log_format, etc., qui s'appliquent à toutes les requêtes HTTP traitées par Nginx.

### Events

Ce bloc est utilisé pour configurer la gestion des processus de gestion de requêtes et l'optimisation des ressources en fonction des événements, comme le nombre de connexions simultanées et le traitement des événements réseau. Le bloc events est utile pour ajuster les performances du serveur dans des environnements à forte charge.

Exemple : 
worker_connections 1024; 
worker_processes 4;

use epoll*;         # Utilisation d'epoll pour une meilleure gestion des événements réseau sur Linux
multi_accept* on;   # Accepter plusieurs connexions simultanément
accept_mutex* on;   # Utiliser un mutex pour protéger l'acceptation des connexions

Chaque processus de travail (**worker**) Nginx pourra gérer jusqu'à 1024 connexions simultanées.
Nginx créer 4 worker pour multiplier le flux entrant, soit 1024*4

epoll: L'usage d'epoll permet à Nginx de gérer efficacement un grand nombre de connexions sans être bloqué, tout en utilisant peu de ressources système (car il évite de créer des threads ou de process supplémentaires pour chaque connexion).

multi_accept*: Permet à Nginx de accepter plusieurs connexions simultanément au lieu d'en accepter une par une. Si cette option est activée, lorsqu'un worker est prêt à accepter une connexion, il peut accepter plusieurs connexions d'un coup.

accept_mutex*: Est une directive de synchronisation qui permet de protéger l'acceptation des connexions par un mutex (verrou).
Cette directive est activée pour éviter que plusieurs workers tentent d'accepter une connexion en même temps. Sans cette protection, plusieurs workers pourraient tenter d'accepter une même connexion simultanément, ce qui pourrait entraîner des comportements indésirables.

# Sources 
[nginx beginner guide](https://nginx.org/en/docs/beginners_guide.html)
