<!-- .slide: class="transition underline"-->
# Sharding

##--##
# Qu'est ce que le sharding ?

* Le sharding consiste en distribuer la données entre plusieurs replicasets
* Il augmente les performances en lecture et en écriture
* Mais il coute beaucoup plus cher en terme de ressources
* ... et il amène son lot de contraintes

![center h-500](assets/images/mongodb/sharding/concept.svg)

Notes:
* C'est le scaling horizontal dans MongoDB

##--##
# Principe de fonctionnement

Un *sharded cluster* est composé des éléments suivants:<br/><br/>

* un replicaset de *config servers*
    * ce sont des mongod qui portent une base de données qui contient les metadata du cluster<br/><br/>
* un replicaset par *shard*
    * les données peuvent être éclatés entre les shards (ou non, c'est optionnel)<br/><br/>
* des *routeurs*, les `mongos`

Notes:
- on ne monte généralement pas de sharded cluster pour moins de 3 shards
- les config servers sont critques, s'ils sont perdus, la récupération des données devient très compliquées
- les shards n'ont pas connaissance des autres shards, ils font partie d'un cluster shardé, mais seuls les mongos et les cfgsrv ont connaissance de tout

##--##
# Activation du sharding

* Par défaut, les collections ne sont pas shardées.<br/><br/>
* Chaque base se voit attribuer un **primary shard** qui portera toutes ses collections non shardées.<br/><br/>

Pour sharder une collection, il faut:

* activer le sharding sur la **base** avec `sh.enableSharding()`
* sharder la **collection** en créant l'index de sharding avec `sh.shardCollection(ns, index)`

<br><br>
Mais avant de songer à sharder une collection, il faut d'abord définir sa *shard key*...


##--##
# Stratégie de sharding

Il existe 3 stratégies de sharding différentes:

* Range sharding<br/>
* Hashed sharding<br/>
* Zone sharding<br/>

Notes:
- range sharding: idéal pour les requêtes d'aggregats par range, pour localiser les données avec corélation au même endroit
- hashed sharding : idéal pour répartir de manière totalement uniforme la données entre les shards
- zone sharding: on créée des zones (groupements de shards) et on attribue des ranges de clés à ces zones


##--##
# Clé de sharding

- La shard key conditionne la bonne distribution des documents entre les différents shards
- Tous les indexes avec la propriété "unique" doivent intégrer la shard key comme préfixe
- Une bonne shard key permet d'orienter efficacement les requêtes vers les shards et éviter les "scatter gather"<br><br>

![center h-500](assets/images/mongodb/sharding/sharded-queries-targeting.svg)

Notes:
- Il est possible de changer la shard key après coup, mais c'est une opération très lourde<br/><br/>


##--##
# Chunks

MongoDB découpe les collections en chunks qui sont répartis entre les shards en fonction de la shard key.

Les chunks ont une taille maxi par défaut (64Mo) et sont découpés et/ou déplacés en fonction de l'évolution de la base par un process nommé "balancer".

![center h-500](assets/images/mongodb/sharding/hashed-sharding.svg)

Notes:
- Le balancer tourne sur le primary du replica set de config
- Il est possible de le désactiver et de lui donner des plages horaires de fonctionnement

##--##
<!-- .slide: class="with-code"-->

# Commandes utiles

Récupérer le statut global du shard
```javascript
sh.status();
```

Récupérer le statut d'activité du balancer
```javascript
sh.isBalancerRunning();
sh.balancerCollectionStatus();
```

Récupérer les infos de sharding d'une collection précise
```javascript
db.collection.getShardDistribution();
```

Notes:
- Le balancer peut très bien être activé mais ne pas être en train de tourner

## Lab
# Sharding
<br/>

1. Analyser les fichiers docker-compose et les script d'init
2. Démarrer un shard, sharder une collection et restaurer un backup
3. Exécuter les commandes d'analyse du statut du shard

<br/>