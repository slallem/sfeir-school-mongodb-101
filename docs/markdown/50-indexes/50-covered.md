<!-- .slide"-->
# Covered Queries
<b>Définition:</b> Une covered queries est une query qui n'a été résolue qu'en utilsant des indexes !

Il n'a pas été nécessaire d'aller lire le ou les documents: lire l'index a été suffisant car il contenait tous les champs demandés dans la réponse.

##--##

<!-- .slide: class="with-code""-->
# Et concrètement comment ça se matérialise?

- Contexte
```json
{ millis: 1 }
```
<br>

- Les requêtes suivantes
    - db.profiles.find({}) <span class="important"> n'est pas une covered querie</span>
    - db.profiles.find({millis: 0 }) <span class="important"> n'est pas une covered querie</span>
    - db.profiles.find({ millis:0 }, { _id: 0, millis: 1 }) <span class="important"> est une covered querie</span>
    - db.profiles.find({}, { _id: 0, millis: 1 }).sort({ millis: 1 }) <span class="important"> est une covered querie</span>
Notes: 
- Lors de la première requête, je souhaite avoir tous les documents de la collection, le query planner est obligé de lire le document
- Lors de la seconde requête, je souhaite avoir tous les documents avec une millis à 0, le query planner est obligé de lire le document pour me renvoyer tous les champs
- lors de la troisième requête, je souhaite avoir tous les documents avec une millis à 0 en ne projettant que le champs millis, le query planner n'a pas besoin de lire le document
- lors de la quatrième, je souhaite avoir tous les documents mais triés par ordre croissant ne projettant que le champs millis, le query planner se sert de l'index pour faire le sort et n'a également pas besoin d'inspecter les documents pour renvoyer toutes les clés

Prendre MongoDB Compass pour faire une démonstration ;)

##--##

<!-- .slide: class="with-code"-->
# La règle Equality Sort Range

MongoDB va utiliser la règle Equality Sort Range pour déterminer quel index utiliser dans les requêtes, notamment celles ou il y a plusieurs solutions.

Exemple de requête
```javascript
db.products.find({ in_stock: true, price: { $gt: 1, $lt: 5 } }).sort({ name: 1 })
```

<br/>

L'index composé "in_stock", "name", "price" sera utilisé dans cette requête car MongoDB va procéder dans cet ordre:
- Equality
- Sort
- Range

Notes:
- Un index sur un boolean en prefixe est rarement un bon index à cause de la trop faile cardinalité
