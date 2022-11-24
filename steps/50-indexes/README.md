# Lab - Indexes

## Init lab

Au cours de ce lab, vous effectuerez des requêtes dans la base de données `school`, sur les collections `restaurants` et `questions-2019`.

## 1 / Index simple

Dans la collection `restaurants`, cherchez le document avec `restaurant_id` égal à `"40391528"`.

+ Cette requête utilise-t-elle un index ?
+ Comment le savoir ?

Mêmes questions pour la requête qui permet de trouver tous les restaurants de type "Hamburgers".

+ Si l'une des requêtes n'utilisait pas d'index, le créer avec un tri décroissant.

## 2 / Index composé et multikey

Toujours dans la collection `restaurants`, créer l'index avec les spécifications suivantes:

+ Nom de l'index: `grade_idx`
+ Propriété de l'index: `sparse`  
+ Premier champ: `grades.grade`
+ Deuxième champ: `grades.date`

Ces requêtes utiliseront-elles l'index ainsi créé ?

+ `db.restaurants.find({"grades.score": 3})`
+ `db.restaurants.countDocuments({"grades.grade": "B"})`
+ `db.restaurants.find({"grades.grade": "C", "grades.date": {"$gte": ISODate("2014-01-01")}})`
+ `db.restaurants.find({"borough": "Bronx", "grades.score": {"$gte": 3}})`

## 3 / Covered queries

La collection `restaurants` possède l'index suivant:

+ db.restaurants.createIndex({"cuisine": 1, "borough": 1})

Les requêtes suivantes sont-elles des covered queries:

+ db.restaurants.find({"cuisine": "Hamburgers", "borough": "Bronx"}, {"restaurant_id": 1})
+ db.restaurants.find({"cuisine": "Hamburgers", "borough": "Bronx"}, {"cuisine": 1, "borough": 1})
+ db.restaurants.find({"cuisine": "Hamburgers", "borough": "Bronx"}, {"cuisine": 1, "_id": 0})

## 4 / Text index

Dans la collection `questions-2019`, les utilisateurs vont avoir à chercher dans le champ "section" de manière textuelle.

+ Avec une recherche de type "commence par"
+ Avec une recherche avancée des mots contenus dans le champ, peu importe l'emplacement

Proposez une solution pour les 2 cas de recherche.