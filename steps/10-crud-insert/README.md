# Lab - CRUD - Insert

## Init lab

```javascript
// Utilisez votre propre base de données si vous utilisez Atlas, pour ne pas vous télescoper avec les autres
use school;

let coll = db.getCollection("lab-02");
```

*Note: videz la collection avec `coll.drop();` à chaque exercice pour être sûr d'écrire dans une collection vide.*

## 1 / insertOne

Dans la collection `lab-01` de votre base de données, créer un document avec les champs suivants:

* firstname: "Sophie"
* lastname: "Fonfec"
* birthdate: April 26th 1986
* account_id: 1337

## 2 / custom `_id`

Sans avoir vidé la collection, relancer exactement la même insertion que précédemment.
Est-ce que cela fonctionne ? Est-ce que le document inséré est le même ?

Cette fois après avoir vidé la collection, insérer de nouveau le même document mais en remplaçant "account_id" par "_id".

Relancer la même insertion une deuxième fois. Que se passe-t-il ?

## 3 / Champ `_id` personnalisé et timestamp de création

En remplaçant le type ObjectId du champ _id, nous avons perdu une information importante, le timestamp de création du document.

Refaire l'insertion précedente mais en ajoutant un champ, "date_in" qui contient le timestamp d'insertion.

## 4 / Nested and array fields

Retravailler la structure du document pour y ajouter cette fois de la structure:

* un champ `user` avec les champs `birthdate`, firstname et lastname 
* dans le champ `user`, ajouter également un champ `children` qui liste les 2 enfants de Sophie (Kat 3 ans et Troy 1 an).

## 5 / insertMany

En une seule requête, insérer la liste des légumes d'été suivant (1 par document) dans la collection `miam`.

```javascript
let legumes = [
    "Artichaut", "Aubergine", "Betterave", "Blette", "Brocoli",
    "Carotte", "Céleri", "Chou-fleur", "Concombre", "Courgette",
    "Épinard", "Fenouil", "Fève", "Haricot vert", "Laitue",
    "Maïs", "Navet", "Oignon", "Poireau", "Poivron", "Pomme de terre",
    "Potiron", "Radis", "Salade", "Tomate"
];

```

## 6 / Doublons

Après avoir vidé la collection `miam`, ajouter dans la liste de légumes de l'exercice précédent un doublon de Brocoli juste après le premier.

Relancer l'import et observer le résultat.

Essayer la même requête mais cette fois avec l'option `{"ordered": false}`, et observer le résultat.
