<!-- .slide -->

# Les objets principaux

* Clusters
* Bases de données
* Collections
* Documents
* Champs
<!-- .element: class="list-fragment" -->

* MongoDB stocke les documents en *BSON* = Binary JSON
  <!-- .element: class="list-fragment" -->
  * Étend les types classiques JSON et en ajoute de nouveaux
  <!-- .element: class="list-fragment" -->

Notes:
- Clusters organisés en single node (dev only), replicasets ou shards
- En opposition évidemment aux tables / lignes / colonnes
- Quelques bases de données réservées (admin, config, oplog)
- En réalité, plus ont s'éloigne des 16Mo, mieux c'est

##--##
<!-- .slide: class="with-code"-->

```javascript[|3,4,9,11,12,16,18-20|25|26|5,7-23|13|2,6]
{
	"_id": ObjectID("507c7f79bcf86cd7994f6c0e"),
	"firstname": "Sophie",
	"lastname": "Fonfec",
    "tags": ["chi", "fou", "mi"],
    "company": ObjectID("507c7f79bcf86cd7993f5c0b"),
    "address": [
        {
            "type": "work",
            "number": NumberInt(74),
            "street": "rue des arts",
            "zipcode": "59000",
            "location": { "type": "Point", "coordinates": [ 50.6397, 3.0655 ] }
        },
        {
            "type": "home",
            "number": NumberInt(1),
            "ext": "B",
            "street": "Pl. des Patiniers",
            "zipcode": "59000",
            "city": "Lille"
        }
    ],
    "dates": {
        "opt-in": ISODate("2021-08-08T13:37:00Z"),
        "opt-out": null
    }
}
```
<!-- .element: class="full-height" -->

##--##

# Pour bien commencer

* Une base de données *schemaless*
<!-- .element: class="list-fragment" -->
  * En réalité on parle plutôt de *dynamic schema*
  * Il est aujourd'hui possible de forcer des contraintes sur les documents<br/><br/>
  <!-- .element: class="list-fragment" -->
* Regrouper les champs ensemble s'ils ont vocation à l'être
<!-- .element: class="list-fragment" -->
  * Les *arrays*, *nested* fields et *nested* docs sont une des forces du modèle document
  * Gain de lisibilité et logique métier visible immédiatement
  * Gain de performance potentiel si correctement structuré<br/><br/>
  <!-- .element: class="list-fragment" -->
* Se poser les questions avant de stocker une donnée dans un document
<!-- .element: class="list-fragment" -->
  * Est-ce bien sa place ?
  * Est-ce que cette donnée devra être modifiée ? Souvent ?
  * Est-ce que cette donnée doit être associée à un timestamp ? Doit être historisée ?
  * Est-ce qu'il faut la répliquer à plusieurs endroits ?
  <!-- .element: class="list-fragment" -->
  
Notes:
- Dynamic Schema parce qu'avec le temps, le contenu des collections va évoluer et que schemaless insite trop à faire n'importe quoi
- Les validators = des contraintes, avec un coût en performnce  
- Exemple: une commande, les lignes de commandes, les produits
- Exemple: une liste de tags, est-ce intéressant de les trier au stockage, de les trier par une date d'entrée ?  
- Exemples de modélisation à suivre

##--##

# Simple rules

## Ca n'est pas parce qu'on peut le faire qu'on doit le faire

* Ne *jamais* stocker différents types de données dans le même champ
<!-- .element: class="list-fragment" -->
  * Ne pas mélanger les types de nombres (`Int64`, `Float`, `Decimal`, etc.)
  * Ne pas stocker des dates en `string` et des objets ISODate dans le même champ
  * Ne pas mélanger des éléments de types différents dans les mêmes tableaux<br><br>
  <!-- .element: class="list-fragment" -->
* Ne pas stocker les date/datetime en `string`, utiliser toujours le type `ISODate`
<!-- .element: class="list-fragment" -->
  * Moins lourd, plus rapide et offre toutes les possibilités de manipulation, dont les timezones<br><br>
  <!-- .element: class="list-fragment" -->
* Utiliser la notation *GeoJSON* avec les données géographiques
* Ne pas donner des noms à rallonge inutilement aux champs, et toujours des noms clairs
<!-- .element: class="list-fragment" -->
  * "a_decide_de_se_desabonner": true
  * "who": "repeat"
  <!-- .element: class="list-fragment" -->
  
Notes:
- Il existe des solutions, dans le code ou via des validators JSON Schema

##--##

# Les risques si on oublie ces règles

* Requêtes qui ne fonctionnent pas
<!-- .element: class="list-fragment" -->
  * "1980-04-28" != ISODate("1980-04-28T00:00:00Z")
  * "2022" != 2022  
  * MongoDB ne va rien retourner, mais ne va pas planter
  <!-- .element: class="list-fragment" -->
* Problèmes de performance
<!-- .element: class="list-fragment" -->
  * Manipuler le bon type, qui pèse le bon poids est toujours + performant
  <!-- .element: class="list-fragment" -->
* Maintenance compliquée
<!-- .element: class="list-fragment" -->

Notes:
- En SQL, le typage est aussi vérifié à la requête, pas uniquement à l'écriture
- Maintenance compliquée car aller corriger des données dans un modèle est souvent très pénible
