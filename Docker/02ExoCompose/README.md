
# Introduction
Cette application Nodejs/express/mysql définit deux ``endpoint`` qui correspondent à des requêtes SQL (select et insert) en base de données sur la table User (cf index.js) exécutées à l'aide de l'ORM ``Sequelize``. 

docker-compose.yml définit deux services (app et mysqldb) qui correspondent à deux containers différents
Vous remarquerez que ces deux services partagent :
- un même volume : ``mysql-data`` - il sera utilisé pour stocker les données de la base de données MySQL. Le chemin /var/lib/mysql dans le conteneur MySQL est mappé à ce volume. Cela permet de conserver les données de la base de données même si le conteneur est arrêté ou supprimé. Lorsque le conteneur est redémarré, les données seront toujours disponibles dans le volume.

- un même réseau Docker ``nodejs-mysql-network`` - il permet aux conteneurs de communiquer entre eux de manière sécurisée et isolée du reste de l'hôte Docker.


Cette configuration garantit la persistance des données de la base de données et l'isolation réseau des différents composants de l'application.

# Dockeriser NodeJS et MySQL avec Docker Compose&nbsp;[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fnumerica-ideas%2Fcommunity%2Ftree%2Fmaster%2Fdocker%2Fdocker-compose-nodejs-mysql&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://numericaideas.com/blog/docker-compose-nodejs-mysql)


**Lire l'article écrit par  "Orleando Dassi" en relation avec cette application**: https://numericaideas.com/blog/docker-compose-nodejs-mysql


## Variables d'environnement

Le fichier ``.env`` définit les 2 variables d'environnement nécesssaires à l'exécution de l'application :
- MYSQL_DATABASE
- MYSQL_PASSWORD



## Démarrage des containers
Pour cela, il suffit d'entrer la commande :
```bash
docker compose up
```


## Arrêt des containers

```bash
docker compose down
```

Arrêter et supprimer tout ce qui a été créé par **Docker Compose** : **containers**, **images**, and **networks**:
```bash
docker compose down --rmi all
```
# Test de l'application avec Thunder Client ou POSTMAN
- Method : POST
- URL : http://localhost:3000/users/
- body : 
```json
{
  "firstName": "Bob",
  "lastName": "Dylan",
  "email": "bob@diginamic.fr"
}
```

# optionnal
## Run
It's a normal **NodeJS** project, so you can run it via `npm start` but Docker Compose takes care of this by linking it to a **MySQL** instance.

## Docker Images
- The project uses the official **MySQL** Docker image available in the [Docker Hub](https://hub.docker.com/_/mysql).
- A [Dockerfile](./Dockerfile) exists to create an image of the NodeJS App.

Build the NodeJS App **image** with: `docker build . `.