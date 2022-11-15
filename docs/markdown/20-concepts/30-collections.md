<!-- .slide: class="transition underline"-->
# Les collections

##--##
<!-- .slide -->

# Les différents types de collections

Il existe 3 grands types de *collections*:

* Standard
* Capped
* Timeseries
<br/><br/>

Auxquelles s'ajoutent les *vues*:
* Ce ne sont pas des collections: elles ne stockent rien
* Read-Only
* Utilisent les indexes des collections sous-jacentes

Notes:
* Les vues sont très pratiques pour enregistrer des pipelines d'aggrégation complexes

##--##
<!-- .slide class="with-code"-->

## Les collections standards

* Créées à la volée la première fois qu'on y écrit<br/><br/>
* Taille maximale d'un document: 16Mo<br/><br/>
* Aucune contrainte particulière

<br/><br/>

```javascript
use mydb;

// Création d'une collection à la volée
db.getCollection("basic").insertOne({});

// On peut aussi la créer explicitement si on veut y ajouter des propriétés
db.createCollection("basic", {collation: {...}});
```

##--##
<!-- .slide: class="with-code"-->

## Les "capped" collections

* Collection FIFO (**F**irst **I**n  **F**irst **O**ut)
* ✔ Maintien l'ordre d'insertion lors de la lecture
* ✔ Tailable Cursors
* ❌ Écriture lors de transactions
* ❌ Sharding<br/><br/>

```javascript
// Max 1.000.0000 de documents dont le poids moyen serait 5Ko
db.createCollection("log", { capped: true, size: 1000000, max: 5 } );

db.getCollection("log").insertMany([{"a": 1}, {"a": 2}, {"a": 3}, {"a": 4}, {"a": 5}, {"a": 6}]);
// --> 6 inserts OK

db.getCollection("log").find();
// --> [2, 3, 4, 5, 6]
```

##--##
<!-- .slide -->

## Les collections timeseries

* 🏁 À partir de MongoDB 5.x
* ⚠️ Taille maximale d'un document: 4Mo
* ❌ Change Stream
* ❌ Schema validation 
* ❌ Atlas Search
* ❌ `$out` et `$merge`

Notes:
- les timeseries servent à stocker des données IoT ou des données de type événements
- elles sont structurées spécialement pour ça et pour les requêtes de type windows et aggregation sur les champs de temps


##--##
<!-- .slide: class="with-code"-->

## Création et insertion dans une collection *timeseries*

```javascript

db.createCollection(
    "weather",
    {
       timeseries: {
          timeField: "timestamp",
          metaField: "metadata",
          granularity: "hours"
       }
    }
);

db.weather.insertMany([
   {
      "metadata": { "sensorId": 1337, "type": "temperature" },
      "timestamp": ISODate("2022-11-25T08:00:00.000Z"),
      "temp": 700
   },
   {
      "metadata": { "sensorId": 1337, "type": "temperature" },
      "timestamp": ISODate("2022-11-25T04:00:00.000Z"),
      "temp": 632
   }
   ]
);
```

##--##
<!-- .slide: class="with-code"-->

## Exemple de requête d'aggrégation

```javascript
db.weather.aggregate( [
   {
      $project: {
          date: {$dateToParts: { date: "$timestamp" }},
          temp: 1
      }
   },
   {
      $group: {
         _id: {
             date: {year: "$date.year"}
         },
         avgTmp: { $avg: "$temp" }
      }
   }
]);
```
<!-- .element: class="max-height" -->