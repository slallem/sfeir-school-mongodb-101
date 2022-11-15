<!-- .slide: class="with-code"-->
# Création des indexes

- La création d'un index est simple et se fait à l'aide d'une commande
<br/><br/>

Création d'un seul index
```javascript
db.collection.createIndex(index, options)
// db.collection.createIndex({"name": 1}, {"name": "name_idx", sparse: true})
```
<br/>

Création de plusieurs indexes
```javascript
db.collection.createIndexes(indexes, options)
// db.collection.createIndexes([{"name": 1}, {"date": -1}])
```

Notes:
- index est un object => { name: 1 }
- options est également un object => { unique: true }
- toutes les options ne sont pas dispos lorsqu'on créé plusieurs indexes en même temps

##--##

<!-- .slide: class="with-code "-->
# Récupération des indexes
- De même que pour la création, la récupération de la liste des indexes se fait à l'aide d'une simple commande
<br/><br/>

```javascript
db.collection.getIndexes();
```

##--##

<!-- .slide: class="with-code"-->
# Création d'un Single index
Contexte
<!-- .element: class="bold" -->

```json
{
  "_id": ObjectId("570c04a4ad233577f97dc459"),
  "score": 1034,
  "location": { state: "NY", city: "New York" }
}
```
<br/>

Index sur un champ simple
```javascript
db.records.createIndex( { score: 1 } )
```

Index sur un champ imbriqué
```javascript
db.records.createIndex( { "location.state": 1 } )
```

Index wildcard
```javascript
db.records.createIndex( { "location.$**": 1 } )
```

Notes:
- Lorsque l'on crée un index sur un document complet, une requête utilisant la dot notation dudit document n'utilisera pas l'index
- Pour ca il y a les wildcard indexes dans MongoDB 4.2+, mais attention au poids de l'index

##--##

<!-- .slide: class="with-code"-->
# Création d'un Compound index
Contexte
<!-- .element: class="bold" -->
```json
{
  "_id": ObjectId(...),
  "item": "Banana",
  "category": ["food", "produce", "grocery"],
  "location": "4th Street Store",
  "stock": 4,
  "type": "cases"
}   
```
<br/>

Création d'un index composé
```javascript
db.events.createIndex( { "item": 1, "location": 1, "stock": 1 } )
```

Notes:
- Une query qui souhaite utiliser cet index doit être une query basée sur les champs
  - item,
  - item & location
  - item & location & stock

##--##

<!-- .slide: class="with-code"-->
# Création d'un Multikey index
Contexte
<!-- .element: class="bold" -->
```json
  { _id: 5, type: "food", item: "aaa", ratings: [ 5, 8, 9 ] }
  { _id: 6, type: "food", item: "bbb", ratings: [ 5, 9 ] }
  { _id: 7, type: "food", item: "ccc", ratings: [ 9, 5, 8 ] }
  { _id: 8, type: "food", item: "ddd", ratings: [ 9, 5 ] }
  { _id: 9, type: "food", item: "eee", ratings: [ 5, 9, 5 ] }
```
<br/>

Création d'un index multikey
```javascript
db.inventory.createIndex( { ratings: 1 } )
```
<br/><br/>

Restriction: Un seul mutlikey index dans un compound index!
<!-- .element: class="bold center important" -->


##--##

<!-- .slide: class="with-code"-->
# Création d'un Text index
Contexte
<!-- .element: class="bold" -->
```json
{ _id: 1, text: "Nicolas", subject: "banque de luxembourg" }
{ _id: 1, text: "Romain", subject: "banque de l'état" }
```
<br/>

Création de l'index
```javascript
db.reviews.createIndex({ subject: "text" } );
```
Utilisation de l'index
```javascript
db.articles.find( { $text: { $search: "luxembourg" } } )
```

- Un seul text index par collection !
- Les text index sont toujours sparse
- Il est possible de créer un wildcard text index

##--##

<!-- .slide: class="with-code"-->
# Création d'un Geospatial index
Contexte
<!-- .element: class="bold" -->

```json
{ loc : { type: "Point", coordinates: [ -73.97, 40.77 ] }, name: "Central Park", category : "Parks" }
```
<br/>

Création d'un index
```javascript
db.places.createIndex( { loc : "2dsphere" } )
db.places.createIndex( { loc : "2d" } )
```
<br/>

Utilisation de l'index
```javascript
db.places.find( { loc : { $geoWithin : { $centerSphere : [ [ -88 , 30 ] , 10 / 3963.2 ] } } } )
db.places.find( { loc : { $geoWithin : { $box : [ [ 0 , 0 ] , [ 100 , 100 ] ] } } } )
```

Notes: 
- Losque l'on exécute une query sur un index de type géospatial, il est obligatoire de mettre l'opérateur $geoWithin
  - pour l'index de type 2d => l'opérateur $box peut etre remplacé par $polygon ou $center
   ($box spécifie un rectangle, $polygon un poligon et $center un cercle)