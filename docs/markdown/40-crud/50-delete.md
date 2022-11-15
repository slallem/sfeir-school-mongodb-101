<!-- .slide -->
# Delete

Il existe plusieurs méthodes pour supprimer des documents dans MongoDB:

* via les commandes de bases
<!-- .element: class="list-fragment" -->
  * `db.collection.deleteOne(filter)`
  * `db.collection.deleteMany(filter)`
  * `db.collection.findOneAndDelete(document)`
  * `db.collection.drop()`
  <!-- .element: class="list-fragment" -->

* via les API / les drivers
<!-- .element: class="list-fragment" -->

Notes:
- mentionner également le $out du framework d'aggrégation

##--##
<!-- .slide: class="with-code"-->
# Quelques exemples

```javascript
db.foo.deleteOne({ _id: 1 });
```

```javascript
db.foo.deleteMany({ expired: true });
```

```javascript
db.foo.drop();
```

```javascript
db.empty_collection.aggregate([{"$out": "foo"}])
```

Notes:
- drop() supprime tous les indexes
- l'astuce avec l'aggregation / $out permet de ne pas supprimer les indexes