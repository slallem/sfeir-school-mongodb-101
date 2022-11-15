<!-- .slide: class="transition underline"-->
# Les stages d'aggrégation

##--##

<!-- .slide: class="with-code"-->
# Stage: $match
Le stage <b>$match</b> permet de sélectionner les documents en appliquant des filtres.

- La syntaxe est globalement la même que les *filter* des requêtes find, update, etc.
- Placé en début de pipeline, les $match utilisent les indexes des collections cibles
- On peut enchaîner autant de $match que nécessaire, à la suite ou non
<br/><br/>

```javascript
{ $match: { <query> } }
```
<br/>
Exemple

```javascript
db.articles.aggregate([ { $match : { author : "dave" } } ]);
```


##--##

<!-- .slide: class="with-code"-->
# Stage: $project
Le stage <b>$project</b> permet d'inclure ou exclure certains champs. Par défaut _id est toujours inclus, il faut l'exclure explicitement.
```javascript
{ $project: { <specification(s)> } }
```

<br/><br/> 

Exemple
<!-- .element: class="bold" -->
```javascript
db.books.aggregate( [ { $project : { title : 1 , author : 1 } } ] )
```
<br/>

- On peut aussi utiliser un enchaînement de stage `$set` et/ou `$unset`
- `$set` est un synonymes de `$addFields`

##--##

<!-- .slide: class="with-code"-->
# Stage: $addFields
Le stage <b>addFields</b>
```javascript
{ $addFields: { <newField>: <expression>, ... } }
```
<!-- .element: class="medium-code"-->
<br/>

Exemple
<!-- .element: class="bold" -->
```javascript
db.scores.aggregate( [
   {
     $addFields: { totalHomework: { $sum: "$homework" } , totalQuiz: { $sum: "$quiz" } }
   },
   {
     $addFields: { totalScore:
       { $add: [ "$totalHomework", "$totalQuiz", "$extraCredit" ] } }
   }
] )
```
<!-- .element: class="medium-code" -->


##--##

<!-- .slide: class="with-code"-->
# Stage: $skip
Le stage <b>$skip</b> permet de passer un certain nombre de documents
```javascript
{ $skip: <positive integer> }
```

<br/><br/>

Exemple
<!-- .element: class="bold" -->
```javascript
db.article.aggregate({ $skip : 5 });
```


##--##

<!-- .slide: class="with-code"-->
# Stage: $limit
Le stage <b>$limit</b> permet de limiter le nombre de documents retournés
```javascript
{ $limit: <positive integer> }
```

<br/><br/>

Exemple
<!-- .element: class="bold" -->
```javascript
db.article.aggregate({ $limit : 5 });
```


##--##

<!-- .slide: class="with-code"-->
# Stage: $sort
Le stage <b>$sort</b> permet de réaliser un tri en fonction d'un ou plusieurs champs par ordre croissant ou décroissant
```javascript
{ $sort: { <field1>: <sort order>, <field2>: <sort order> ... } }
```

<br/><br/>

Exemple
<!-- .element: class="bold" -->
```javascript
db.users.aggregate([{ $sort : { age : -1, posts: 1 } }])
```


##--##

<!-- .slide: class="with-code"-->
# Stage: $unwind
Le stage <b>$unwind</b> permet de ventiler un tableau et de retourner un document pour chaque valeur de ce tableau
```javascript
{ $unwind: { path: <field path>, includeArrayIndex: <string>, preserveNullAndEmptyArrays: <boolean> } }
```

<br/><br/>

Exemple
<!-- .element: class="bold" -->
```javascript
db.inventory.insertOne({"marque": "beer", "volume": ["25", "33", "50"]});
db.inventory.aggregate([{"$unwind": "$volume"}, {"$unset":["_id"]}]);
/* Resultat:
[
  { marque: 'beer', volume: '25' },
  { marque: 'beer', volume: '33' },
  { marque: 'beer', volume: '50' }
]
*/
```


##--##

<!-- .slide: class="with-code"-->
# Stage: $group
Le stage <b>$group</b> permet de regrouper les documents et se combine avec des accumulateurs ($sum, $avg, $first, $push, etc.)</span>
```javascript
{ $group: { _id: <expression>, <field1>: { <accumulator1> : <expression1> }, ... } }
```

<br/><br/>

Exemples
<!-- .element: class="bold" -->
```javascript
db.books.aggregate([{ $group : { _id : "$author", books: { $push: "$title" } } }]);

db.books.aggregate([{ $group : { _id : {"author": "$author", "editor": "$editor"}, books: { $push: "$title" } } }]);
```

- Le champ _id du stage $group porte la définition du regroupement à faire
- On peut regrouper sur plusieurs champs en créer un objet dans le champ _id du $group



##--##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Stage: $lookup
Le stage <b>$lookup</b> permet de réaliser une jointure avec une collection ou une vue
```javascript
{ $lookup: {
    from: <collection to join>,
    localField: <field from the input documents>,
    foreignField: <field from the documents of the "from" collection>,
    as: <output array field>
  }
}
```
<!-- .element: class="medium-code" -->
<br/>

Exemple
<!-- .element: class="bold" -->
```javascript
db.orders.aggregate([
   {
     $lookup:{ from: "inventory", localField: "item", foreignField: "sku", as: "inventory_docs"}
   }, 
   {
     $set: {"inventory_docs": {"$arrayElemAt": ["$inventory_docs", 0]}}
   }
])
```
<!-- .element: class="medium-code" -->


##--##

<!-- .slide: class="with-code"-->
# Stage: $out
Le stage <b>$out</b> permet d'écrire le résultat de l'aggrégation dans une collection au lieu de le retourner comme curseur.
```javascript
{ $out: "new_collection_name" }
```

<br/><br/>

Exemple
<!-- .element: class="bold" -->
```javascript
db.people.aggregate([{ $match:{"gender": "M"} }, {$out: "men"}]);
```

- Il est possible d'écrire dans une collection existante mais elle sera totalement vidée
- Il est possible d'écrire dans une collection dans une autre base
- On peut utiliser le stage $merge pour fusionner avec une collection existante au lieu de la vider