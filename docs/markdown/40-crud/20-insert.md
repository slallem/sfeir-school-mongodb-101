<!-- .slide -->
# Create - Insert

Il existe plusieurs manières d'insérer des documents dans une base MongoDB:

* via les commandes de bases
<!-- .element: class="list-fragment" -->
  * `db.getCollection("xxx").insertOne()`
  * `db.getCollection("xxx").insertMany()`
<!-- .element: class="list-fragment" --><br/><br/>
* via `mongoimport` ou `mongorestore`<br/><br/>
* via les API / les drivers<br/><br/>
<!-- .element: class="list-fragment" -->

Notes:
- mentionner également le $out et le $merge du framework d'aggréation
- Retryable writes à évoquer
##--##

<!-- .slide: class="exercice" -->

# Create - Insert
## Lab
<br/>

1. Insertions basiques
2. Custom `_id`
3. Insertions multiples

<br/>
