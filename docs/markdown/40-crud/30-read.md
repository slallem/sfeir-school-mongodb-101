<!-- .slide -->
# Read - Find

Comme pour l'insertion de documents, il existe plusieurs méthodes pour lire dans MongoDB:

* via les commandes de bases
<!-- .element: class="list-fragment" -->
  * `db.getCollection("foo").findOne({}, {})`
  * `db.getCollection("foo").find({}, {})`
  * `db.getCollection("foo").countDocuments({})`
  * `db.getCollection("foo").estimatedDocumentCount()`
  * `db.getCollection("foo").distinct("bar")`<br/><br/>
  <!-- .element: class="list-fragment" -->

* via le framework d'aggrégation
  * `db.getCollection("foo).aggregate([...], {})`<br/><br/>
  <!-- .element: class="list-fragment" -->
* via les API / les drivers
<!-- .element: class="list-fragment" -->

Notes:
- findOne() retourne un document
- find() et aggregate retourne des curseurs

##--##

# Quelques exemples
<!-- .slide: class="with-code"-->

Simple comptage
```javascript
db.users.countDocuments({"active": true})
```

Champ simple
```javascript
db.users.find({"user_id": 1337})
```

Nested fields
```javascript
db.users.find({ name: { first: "Sophie", last: "Fonfec" } })

db.users.find({ "name.first": "Sophie", "name.last": "Fonfec" })
```

Projection
```javascript
db.users.find( { }, { "name": 1, "last_login": 1 } )
```

Notes: 
- La première requête va chercher **exactement** le sous-document name / first / last, dans le même ordre 
- La deuxième requête ne prend pas en compte l'ordre des champs et il peut y avoir d'autres champs dans "name"
- La troisième requête projette seulement les champs name et last_login

##--##

# Requête sur les tableaux
<!-- .slide: class="with-code"-->

```bash
db.users.find( { tags: ["red", "blank"] } )
```
<br>

```bash
db.users.find( { tags: {"$in": ["red", "blank"]} } )
```
<br>

```bash
db.users.find( { tags: {"$all": ["red", "blank"]} } )
```
<br>

```bash
db.users.find( { tags: {"$nin": ["red", "blank"]} } )
```
<br>

Notes:
- La première requête va rechercher exactement le tableau en paramètre
- La deuxième va chercher les docs avec au moins un des tags
- La troisième va chercher les docs avec tous ces tags mais peut-être d'autres aussi
- La quatrième va chercher les docs sans les tags dans la liste


##--##

<!-- .slide-->
# Exemples d'opérateurs disponibles

* `$eq` / `$ne`
* `$gt` / `$lt`
* `$gte` / `$lte`
* `$in` / `$nin` / `$all` / `$size` / `$elemMatch`
* `$exists`
* `$regex`
* `$type`
* `$near`
<br><br>
* `$and` / `$or`


##--##
<!-- .slide: class="with-code"-->
# Exemples avec les opérateurs

Simple égalité ou inégalité
```bash
db.inventory.find( { qty: { $eq: 20 } } );

db.inventory.find( { qty: { $ne: 20 } } );
```
<br/>

"$and" implicite et array
```bash
db.inventory.find( { qty: { $exists: true, $nin: [ 5, 15 ] } } );
```
<br/>

Regular expression
```bash
db.products.find( { sku: { $regex: /^ABC/i } } );
```

##--##

<!-- .slide: class=" with-code"-->
# Sort, Skip, Limit
- <b>Sort</b>: Trie les documents suivant un ordre croissant ou décroissant d'un ou plusieurs champs
- <b>Skip</b>: "Saute" un certain nombre de documents
- <b>Limit</b>: Limite le nombre de documents à afficher
<br/><br/>

```javascript
db.users.find( { moyenne: { $lt: 10 } } ) .sort( { name: -1 } ).limit( 2 ).skip(9)
```
<br/>

* MongoDB exécutera toujours ces déclarations dans l'ordre `sort` > `skip` > `limit`
* Pour les grosses opérations de tri, il est nécessaire de préciser l'option allowDiskUse() ou la requête échouera

##--##

<!-- .slide-->
# Distinct et count
<br><br>
- <b>Distinct</b>: Permet de récupérer les valeurs distinctes d'un champs<br><br>
- <b>Count</b>: Permet d'avoir le nombre total de documents matchant à votre query


##--##

<!-- .slide: class="exercice" -->

# Read - find / count / distinct
## Lab
<br/>

1. Find, count et distinct
2. Projection
3. Limit, Skip et Sort

<br/>
