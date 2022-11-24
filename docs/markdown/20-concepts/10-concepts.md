<!-- .slide: class="transition underline"-->
# Introduction

## La base de données MongoDB

##--##

<!-- .slide -->

# Les bases de données

* Deux grands types de base de données
<!-- .element: class="list-fragment" -->
  * SQL (Structured Query Language)
  * NoSQL (Not Only Structured Query Language)<br/><br/>
  <!-- .element: class="list-fragment" -->

* Occupent une place majeure dans les stacks techiques<br/><br/>
<!-- .element: class="list-fragment" -->
* Son choix est un choix technique critique
<!-- .element: class="list-fragment" -->
  * Pour les features disponibles maintenant ou dans le futur
  * Pour atteindre les performances qu'on cherche ou dont on rêve
  * Parce qu'on veut pouvoir scaler et ne pas passer son temps en maintenance
  <!-- .element: class="list-fragment" -->

Notes:
- Bases SQL: Orable, SQLServer, mySQL, Postgres, etc.
- Bases NOSQL: Cassandra, HBase, neo4j, Google Firestore, etc.
- Data Warehouse / Lake / Lakehouse qu'on interroge en SQL: BigQuery, Snowflake, etc. 

##--##

# ...et MongoDB dans tout ça ?

* Base de données NOSQL orientée *document*<br/><br/>
* Écrite en C++, GO, Javascript et Python par la société Mongo<br/><br/>
* Première version en 2009, version actuelle 6.0 (été 2022)
<!-- .element: class="list-fragment" -->
  * Support des transactions depuis 2018 (4.0)
  * MongoDB Atlas lancé en 2017
  * Serverless lancé en 2021  
  * Rapid Release depuis la version 5.x
  <!-- .element: class="list-fragment" -->

Notes:
- Multi-document Transactions depuis 2018 (4.0)
- Distributed multi-document transactions depuis 2019 (4.2)

##--##

# Pourquoi MongoDB ?

* La *Flexibilité* du document model<br><br>
* La *Lisibilité* des données<br><br>
* La *Scalabilité*<br><br>
* La *Rapidité* de mise en place<br><br>
* La *Communauté* et le taux d'adoption
<!-- .element: class="list-fragment" -->

Notes:
- Atomicity: transactions as a whole (either succeeds completely or fails completely)
- Consistency: from one consistent state to another
- Isolation: concurrent execution would be the same as of sequential execution
- Durability: once a transaction has been committed, it will remain committed even in the case of a system failure

##--##

# Un environnement complet

* La base de données: MongoDB
<!-- .element: class="list-fragment" -->
  * Community
  * Enterprise
  * et...<br/><br/>
  <!-- .element: class="list-fragment" -->
* MongoDB Atlas: cloud database et data services<br/><br/>
* MongoDB Compass: IDE fournit par MongoDB<br/><br/>
* MongoDB University: plateforme de formation et certification<br/><br/>
<!-- .element: class="list-fragment" -->

Notes:
- Enterprise --> Ops Manager
- MongoDB Atlas permet de créer un cluster MongoDB et placer ce cluster dans le cloud (GCP, AWS, Azure) + Serverless (2021)
- MongoDB Stitch permet de réaliser des clouds functions facilement pluggable à une base de données MongoDB
- MongoDB Compass, client MongoDB
- MongoDB University
