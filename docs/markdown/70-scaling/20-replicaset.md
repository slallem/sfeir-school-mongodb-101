<!-- .slide: class="transition underline"-->
# Replicaset

##--##
# Les bases

* 1 **Primary** member + N **Secondary** members (+ N **Arbiter** members)
* Les opérations d'écritures se font exclusivement sur le primaire 
* Les secondaires écoutent un "oplog" du primary pour répliquer les écritures

![center h-500](assets/images/mongodb/replicaset/concept.svg)

Notes:
- Max 50 nodes par replicaset
- Max 7 arbiters replicaset
-En production, on déploie **toujours au minimum** un replicaset à 3 data-bearing members.

##--##
# L'élection du primaire

Une élection pour déterminer le noeud primaire se déclenche lors de certains événements:
* Au démarrage du cluster
* Lors de l'ajout d'un noeud au cluster
* Si les secondaires perdent la connexion au primaire

![center h-500](assets/images/mongodb/replicaset/election.svg)

Notes:
- On peut donner des priorités aux membres pour qu'ils deviennent primaires
- On peut changer le poids de chaque noeud dans le vote
- Il faut toujours avoir un nombre de noeuds impaire, sous peine de n'avoir jamais la majorité pour l'élection

##--##
<!-- .slide: class="with-code"-->
# Le writeConcern

* Le writeConcern de définir le niveau de persitence exigé d'une requête d'écriture
* Options définie à la connexion ou par commande
* Par défaut: `majority`
* Beaucoup d'influence sur la performance en écriture d'un cluster
<br/><br/>

Exemples
```javascript
db.gs.insertOne({"foo": "bar"}, {"writeConcern": {"w": 0, "j": false}});
db.gs.insertOne({"foo": "bar"}, {"writeConcern": {"w": 1}}); // Uniquement le primaire
db.gs.insertOne({"foo": "bar"}, {"writeConcern": {"w": "majority"}}); // Une majorité de membres
db.gs.insertOne({"foo": "bar"}, {"writeConcern": {"w": 4}}); // Erreur, pas assez de node
```

Notes:
- O : pas de confirmation d'écriture
- 1 : standalone ou primary OK
- N : primary + n-1 secondaries
- majority: en fonction du nombre de members
- j : journal wiredTiger
- Avec un writeConcern à 0, il n'est pas possible de récupérer les _id d'insert par exemple

##--##
<!-- .slide: class="with-code"-->
# Read Preference

Lors de la connexion à un cluster, on peut préciser l'option Read Preference en fonction de la fraicheur de données dont on veut disposer.

* primary (par défaut)
* secondary<br/><br>
* primaryPreferred
* secondaryPreferred<br/><br>
* nearest<br/><br/>
  
Changement de Read Preference dans `mongosh`
```javascript
db.getMongo().setReadPref('secondary');
```

Notes:
- prefered: si le primary ou secondary n'est pas dispo, il est acceptable de lire sur l'autre type
- nearest: basé sur la latency, maxStalenessSeconds et les tags

##--##
# Initialiser un replicaset

Pour démarrer un replicaset, il faut:<br><br>
* 3 serveurs mongod qui peuvent communiquer ensemble<br><br>
* Connaitre les hostnames et les ports de ces serveurs<br><br>
* Avoir choisi un nom pour le replicaset<br><br>
* mongosh pour se connecter à un des serveurs<br><br>

--\> Fichier `docker-replicaset.yaml` pour lancer les serveurs facilement

##--##
<!-- .slide: class="with-code"-->

Une fois connecté à l'un des futurs membres du replicaset, on l'initialise

```javascript
rs.initiate({
        "_id": "sfeir-school-rs",
        "version": 1,
        "members": [
            {
                "_id": 0, "host": "mongors1:27017", "priority": 30
            },
            {
                "_id": 1, "host": "mongors2:27017", "priority": 20
            },
            {
                "_id": 2, "host": "mongors3:27017", "priority": 10
            }
        ]
    }, {"force": true});
```

Commandes spéciales sur les replicaset
```javascript
rs.status(); // Voir le statut complet du replicaset (très verbeux)
rs.printReplicationInfo(); // Afficher des infos sur la réplication, surtout sur l'oplog

rs.stepDown(); // Forcer au member en cours à ne plus être primary et déclencher une élection
```

##--##
<!-- .slide: class="with-code"-->
# Replicaset

## Fonctionnement de l'oplog

Exemple d'opération d'écriture unique
```javascript
db.collection.insertOne({"user_id": 1337, "foo": ["bar", "baz"]});
```

```json[|3|4|6-10|13]
{
    // ...
    op: 'i',
    ns: 'test.collection',
    ui: new UUID("6618f51f-abc8-4d4b-a047-205282ff6615"),
    o: {
      _id: ObjectId("637f3bc1c9e33e40dd0008b0"),
      user_id: 1337,
      foo: [ 'bar', 'baz' ]
    },
    o2: { _id: ObjectId("637f3bc1c9e33e40dd0008b0") },
    stmtId: 0,
    ts: Timestamp({ t: 1669282753, i: 2 }),
    prevOpTime: { ts: Timestamp({ t: 0, i: 0 }), t: Long("-1") }
    // ...
}
```

Notes:
- L'oplog est une collection spéciale qui inventorie toutes les opérations d'écriture **unitaires**
- La taille de l'oplog doit être suffisante pour contenir N heures ou jours de données
- On peut modifier la taille de l'oplog désormais, ca n'était pas le cas avant la version 4.x de MongoDB

##--##
<!-- .slide: class="with-code"-->
# Replicaset

Exemple d'opération d'écriture multiple
```javascript
coll.updateMany({"grades.grade": "C"}, {"$set": {"oplog": true}}); // modifiedCount: 2707
```

```json[|2,9|3,10|5,12|4,11]
  {
    op: 'u',
    ns: 'school.restaurants',
    o: { '$v': 2, diff: { i: { oplog: true } } },
    o2: { _id: ObjectId("5eb3d669b31de5d588f4850f") },
    ts: Timestamp({ t: 1669283147, i: 879 }),
  },
  {
    op: 'u',
    ns: 'school.restaurants',
    o: { '$v': 2, diff: { i: { oplog: true } } },
    o2: { _id: ObjectId("5eb3d669b31de5d588f484b9") },
    ts: Timestamp({ t: 1669283147, i: 878 })
  }
```

Notes:
- Chaque document modifié sur le primaire = 1 écriture dans l'oplog
- Attention aux arrays avec les méthodes $push et $addToSet qui écrivent de très gros documents dans l'oplog
- Ne PAS lire l'oplog directement : utiliser les change stream !


##--##
<!-- .slide: class="exercice"-->

## Lab
# Replicaset
<br/>

1. Démarrer et init d'un replicaset
2. Faire tomber un membre
3. Importer une base et relancer le membre
4. Faire tomber 2 membres et analyser la situation

<br/>