<!-- .slide: class="transition underline"-->
# Les binaires et les outils

##--##
<!-- .slide -->
# Les indispensables
Le serveur
* `mongod`
* `mongos` (sharding)<br><br>
  
Le terminal / shell
* `mongosh`<br><br>

Les IDEs
* MongoDB Compass
* Studio3T<br><br>

##--##
<!-- .slide -->
# mongotools
Faire des backups en binaire:
* `mongodump`
* `mongorestore`<br><br>

Exporter / Importer des données JSON ou CSV:  
* `mongoexport`
* `mongoimport`<br><br>

Suivre des metrics:
* `mongotop`
* `mongostat`

##--##
<!-- .slide: class="exercice"-->
# Premiers pas
## Lab

1. Démarrer l'instance seule avec docker
2. Se connecter à cette instance via le shell ou Compass
3. Lister les bases de données   
4. Insérer des données en provenance d'un petit JSON
5. Restaurer les premières bases


##--##
<!-- .slide: class="with-code"-->
# Premiers pas

Démarrer un simple serveur sans docker (MongoDB installé localement)
```bash
# Port 27017 par défaut
mongod --dbpath /path/to/data

# Avec un fichier de config mais un override du port
mongod --f /path/to/config --port 28666
```
<br/>

Démarrer une instance simple avec docker

```bash
# Démarrer l'instance
docker-compose -f ./docker/docker-single.yaml up

# Arrêter l'instance
docker-compose -f ./docker/docker-single.yaml down
```

Notes:
- Le fichier docker-compose se trouve dans le dossier `/docker` du repository

##--##
<!-- .slide: class="with-code"-->
# Connexion

Se connecter à une instance
```bash
# Localhost sur le port 28001, base de données "school"
mongosh school --port 27017 --quiet

# À une instance Atlas
mongosh "mongodb+srv://sfeir-school-mongodb-10.66yzg.mongodb.net/school" --apiVersion 1 --username school
```

Lister et choisir une base de données
```javascript
// Lister les bases
show dbs;

// Choisir une base
use school;

// Lister les collections de cette base
db.getCollectionNames();
```


##--##
<!-- .slide: class="with-code"-->

Importer un fichier JSONL (cf. https://jsonlines.org/)
```bash
# Importer un fichier json en passant par jq pour le convertir en jsonl
jq -c '.[]' < data/days.json | mongoimport --port 27017 --db school --collection days --drop --maintainInsertionOrder
```
<br/>

Restaurer un fichier de backup
```bash
# Restaurer une copie de la base "school" dans "school2"
mongorestore mongodb://localhost:27017 --gzip --archive=school.archive.gz --nsFrom='school.*' --nsTo='school2.*'
```
<br/>

Faire un backup de base
```bash
# Backup de toute la base de données "school" depuis localhost
mongodump mongodb://localhost:27017 --gzip --archive=backup.archive.gz --db school
```

Notes:
- Mongoimport ne supporte les arrays JSON que de 16Mo max
- Convertir les fichiers en JSONL avec jq pour pouvoir injecter + de volume

##--##

<!-- .slide: class="exercice" -->

# Importer des données
## Lab
<br/>

1. importer des collections
2. importer un fichier JSON

<br/>
