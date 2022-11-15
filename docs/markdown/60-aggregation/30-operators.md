<!-- .slide: class="transition underline"-->
# Exemple d'opérateurs / accumulateurs d'aggrégation

##--##

<!-- .slide: class="with-code"-->
# L'opérateur: $add
L'opérateur <b>$add</b> permet d'ajouter plusieurs nombres ensemble ou plusieurs nombres et une date entre eux.
```javascript
{ $add: [ <expression1>, <expression2>, ... ] }
```
<br/>

Exemple
<!-- .element: class="bold" -->
```javascript
db.sales.aggregate([{ $project: { item: 1, billing_date: { $add: [ "$date", 3*24*60*60000 ] } } }])
```

##--##

<!-- .slide: class="with-code"-->
# L'opérateur: $addToSet
L'opérateur <b>$addToSet</b> ajoute dans un tableau une valeur si elle n'existe pas. Uniquement disponible dans le stage $group
```javascript
{ $addToSet: <expression> }
```
<br/>

Exemple
<!-- .element: class="bold" -->
```javascript
db.sales.aggregate(
   [
     {
       $group:{ _id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } }, itemsSold: { $addToSet: "$item" } }
     }
   ]
)
```
##--##

<!-- .slide: class="with-code"-->
# L'opérateur: $push
L'opérateur <b>$push</b> permet d'ajouter dans un tableau une valeur, disponible uniquement dans le stage $group
```javascript
{ $push: <expression> }
```
<br/>

Exemple
<!-- .element: class="bold" -->
```javascript
db.sales.aggregate(
   [
     {
       $group: { _id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } }, itemsSold: { $push:  { item: "$item", quantity: "$quantity" } }}
     }
   ]
)
```

##--##

<!-- .slide: class="with-code"-->
# L'opérateur: $avg
L'opérateur <b>$avg</b> permet de réaliser la moyenne de plusieurs valeurs
```javascript
{ $avg: <expression> }
```
<br/>

Exemple
<!-- .element: class="bold" -->
```javascript
db.students.aggregate([
   {
     $project: {
       quizAvg: { $avg: "$quizzes"},
       labAvg: { $avg: "$labs" },
       examAvg: { $avg: [ "$final", "$midterm" ] }
     }
   }
])
```

##--##

<!-- .slide: class="with-code"-->
# L'opérateur: $sum
L'opérateur <b>$sum</b> permet de faire la somme de plusieurs valeurs
```javascript
{ $sum: <expression> }
```
<br/>

Exemple
<!-- .element: class="bold" -->
```javascript
db.students.aggregate([
   {
     $project: {
       quizTotal: { $sum: "$quizzes"},
       labTotal: { $sum: "$labs" },
       examTotal: { $sum: [ "$final", "$midterm" ] }
     }
   }
])
```

##--##

<!-- .slide: class="with-code"-->
# L'opérateur $multiply
L'opérateur <b>$multiply</b> permet de multiplier des valeurs entre elles
```javascript
{ $multiply: [ <expression1>, <expression2>, ... ] }
```
<br/>

Exemple
<!-- .element: class="bold" -->
```javascript
db.sales.aggregate(
   [
     { $project: { date: 1, item: 1, total: { $multiply: [ "$price", "$quantity" ] } } }
   ]
)
```


