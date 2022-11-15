<!-- .slide: class="transition underline"-->
# Framework d'aggrégation

##--##

<!-- .slide"-->
# Qu'est ce qu'une aggrégation ?

Une aggrégation est un ensemble d'étapes ("*stages*") qui s'enchaînent dans un *pipeline*, l'input de chaque étape étant l'output de l'étape précédente.

En réalité, il y a 3 méthodes pour faire des aggrégats dans MongoDB:
- Les pipelines du framework d'aggrégation 👍
- Le map reduce 👎
- Les *single purpose aggregation methods* (`count` et `distinct`)

![center h-300](assets/images/mongodb/aggregation-pipeline.gif)

Notes:
- On ne fait plus de Map Reduce, dur à écrire, lire et maintenir

##--##
<!-- .slide -->
# Aggregation Pipelines

- Un pipeline d'aggrégation est composée de **stages**
- Chaque stage est composé d'un ou plusieurs **opérateurs**
- Le résultat du stage N sont passés au stage N+1 et ainsi de suite
<!-- .element: class="list-fragment" -->
<br/><br/>
- Un pipeline d'aggrégation peut lire des données mais aussi en écrire
- Les pipelines d'aggrégation utilisent les indexes
- On peut faire des *jointures* dans un pipeline d'aggrégation
- On peut enregistrer des pipelines d'aggrégation sous forme de vues
<!-- .element: class="list-fragment" -->

##--##
<!-- .slide: class="with-code"-->
# Exécuter une requête d'aggrégation

Comme pour les autres requêtes, on lance un pipeline d'aggrégation sur une collection via une simple commande:

```javascript
db.collection.aggregate(pipeline)
```

Exemple
```javascript
db.scores.aggregate([
    {"$match": {"score": {"$gte": 140}}},
    {"$group": {"_id": "$player", "score": {"$sum": "$score"}, "count": {"$sum": NumberInt(1)}}},
    {"$sort": {"score": -1}}
])
```
