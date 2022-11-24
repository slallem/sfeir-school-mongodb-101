# Lab - CRUD - Update

## Init lab

```javascript
use school;

var coll = db.getCollection("lab-03");

coll.drop();

coll.insertMany([
    {
        "_id": NumberInt(1337),
        "tags": ["one"],
        "user": {
            "birthdate": ISODate("1984-04-26"),
            "firstname": "Sophie",
            "lastname": "Fonfec",
            "children": [
                {"firstname": "Kat", "age": NumberInt(3)},
                {"firstname": "Troy", "age": NumberInt(1)}
            ]
        },
        "date_in": ISODate()
    },
    {
        "_id": NumberInt(911),        
        "tags": ["two"],
        "user": {
            "birthdate": ISODate("1969-07-20"),
            "name": "Philippe Martin",
            "children": []
        },
        "date_in": ISODate()
    },
    {
        "_id": NumberInt(666),
        "tags": ["three", "one"],
        "user": {
            "birthdate": ISODate("2012-12-21"),
            "firstname": "Jean",
            "lastname": "Valjean"
        },
        "date_in": ISODate()
    }
]);

```

## 1 / Update de champs simples

Dans la collection crée à l'init de ce lab, mettez à jour les documents en suivant ces instructions:

+ Mise à jour du document d'_id `666`: ajout du champ `new` avec la valeur `true`
+ Mise à jour du document d'_id `666`: suppression du champ `user`
+ Mise à jour de tous les documents avec le tag `one` et création d'un champ `key` avec la valeur `rickroll`
+ Renommer le champ `user` en `contact` et le champ `tags` en `labels` dans tous les documents
+ Mise à jour du coument d'id `42` et y ajouter le user name `l33t`. Créer un nouveau document s'il n'existe pas, et y ajouter le champ date_in uniquement si c'est une création.

## 2 / Update dans des tableaux

+ Mettre à jour tous les documents avec au moins une valeur dans `tags` (ou `labels`) et y ajouter la valeur "four"
+ Mettre à jour tous les documents avec exactement 2 éléments dans `tags` (ou `labels`) et y ajouter la valeur "two", sans doublon

## 3 / Expert

+ Mettre à jour tous les documents avec le tag `one` et y ajouter un champ `year` qui ne contient que la partie "année" de `date_in`
+ Mettre à jour tous les documents et trier les valeurs du champs `tags` par ordre alphabétique