# Lab - Importer des données 

## Init lab

Si vous ne pouvez pas faire tourner MongoDB localement, utilisez le cluster MongoDB Atlas fourni par SFEIR avec votre propre base.

## 1 / restaurer un backup

Le dossier /data du repository contient 2 backups binaire et compressé de 2 collections.

* restaurants
* questions-2019

Utilisez `mongorestore` pour restaurer ces collections dans la base `school` de votre instance 

Analysez les logs pour comprendre les différentes opérations effectuées.

## 2 / JSON

La dossier /data contient aussi un fichier JSON et un fichier JSONL.

Utilisez un des 2 fichiers pour injecter dans la base school une nouvelle collection `days`, en respectant l'ordre d'insertion comme dans le fichier JSON.