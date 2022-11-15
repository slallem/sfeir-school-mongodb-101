<!-- .slide -->
# Update

La mise à jour des documents dans MongoDB peut se faire:

* via les commandes de bases
<!-- .element: class="list-fragment" -->
  * `db.collection.updateOne(filter, update, options)`
  * `db.collection.updateMany(filter, update, options)`
  * `db.collection.findAndModify(document)`
  * `db.collection.findOneAndReplace(filter, replacement, option)` (ou `replaceOne`)
  * `db.collection.findOneAndUpdate( filter, update, options )`<br><br>
  <!-- .element: class="list-fragment" -->

* via les API / les drivers
<!-- .element: class="list-fragment" -->

Notes:
- mentionner également le $merge du framework d'aggrégation
- on peut aussi faire de l'update via mongoimport avec les bonnes conditions dans la commande
- Lorsqu'on veut simplement mettre à jour un document, il faut utiliser les "update operators"

##--##
<!-- .slide-->
# Les opérateurs d'update sur les champs simples

* `$set`
* `$unset`
* `$inc`
* `$setOnInsert`
* `$rename`
* `$currentDate`
* `$min`
* `$max`
* `$mul`

Notes:
- Remplacer totalement un document ou mettre à jour / ajouter des champs uniquement
- Mentionner l'upsert lorsque le document à mettre à jour n'existe pas
- Mentionner la possibilité de récupérer les documents avant ou après l'update.
- $set : remplace la valeur d'un champ par une valeur spécifiée
- $unset : supprime un champ d'un object
- $rename : renomme un champ
- $setOnInsert : insère un champ avec une valeur spécifiée si la méthode update résulte à une insertion
- $inc : incrémente une valeur d'un champ par la valeur spécifiée
- $mul : multiplie une valeur d'un champ par la valeur spécifiée
- $min : remplace la valeur d'un champ si et seulement si la valeur spécifiée est plus petite que la valeur du champ
- $max : remplace la valeur d'un champ si et seulement si la valeur spécifiée est plus grande que la valeur du champ

##--##

<!-- .slide: class="with-code"-->
# Quelques exemples

```javascript
db.products.updateOne({ _id: 100 },
    { $set:{ quantity: 500, details: { model: "14Q3", make: "xyz" }, tags: ["coats", "outerwear", "clothing" ] } }
)
```
<br>

```javascript
db.products.updateOne({ _id: 100},
    { $unset: { quantity: "" } }
)
```
<br>

```javascript
db.products.updateMany({},
    { $rename: { "quantity": "total", "total": "sum" } }
)
```
<br>

```javascript
db.products.updateMany({ _id: 100 },
    { $inc: { quantity: 1 } }
)
```

##--##
<!-- .slide-->
# Les opérateurs d'update sur les tableaux

* `$push`
* `$addToSet`
* `$pop`
* `$pull`
* `$pullAll`
* `$slice`
* `$sort`
* `$each``$position`
* `$[]`
* `$[\<identifier\>]`
* `$`

Notes:
- $pull : suppression des éléments via des conditions 
- $pullAll : suppression des élements simplement via une liste
- array.$[] : mettre à jour tous les éléments du tableau
- { $set: { "grades.$" : 82 } }


##--##

<!-- .slide: class="with-code"-->
# Quelques exemples

```javascript
db.inventory.updateOne({ _id: 1 }, { $push: { tags: "camera" } });
db.inventory.updateOne({ _id: 1 }, { $addToSet: { tags: "camera" } });
```

```javascript
db.inventory.updateOne({ _id: 1 }, { $pop: { tags: 1 } })
```

```javascript
db.inventory.updateMany( { _id: 1 }, { $pull: { votes: { $gte: 6 } } } )
```

```javascript
db.inventory.updateMany( { _id: 1 }, { $pullAll: { scores: [ 0, 5 ] } } )
```

```javascript
db.inventory.updateMany({ _id: 1 }, { $push: { quizzes: { $each: [ { id: 3, score: 8 }, { id: 4, score: 7 }, { id: 5, score: 6 } ], $sort: { score: 1 } } } })
```

##--##

<!-- .slide: class="exercice" -->

# Update
## Lab
<br/>

1. Simple update
2. Array updates
3. Aggregation updates

<br/>
