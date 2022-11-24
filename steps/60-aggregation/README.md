# Lab - Aggregation framework

## Init lab

Pour ce lab, nous effectuerons les requêtes sur un cluster MongoDB Atlas dont voici l'URL:

`mongodb+srv://sfeir-school-mongodb-10.66yzg.mongodb.net/school`

Vous pouvez vous y connecter via `mongosh` ou avec MongoDB Compass.

## 1 / Aggregate à la place de find

Avec `aggregate` à la place de `find` et `findOne`:

+ Trouver le nom de vol au départ et à l'arrivée de l'aéroport "01IA"
+ Pouvez-vous les compter ?
+ N'en garder que les champs `origin`, `destination` et `callsign` et le mois du jour de vol ?

## 2 / Les accumulateurs

Toujours avec `aggregate`:

+ Calculer la moyenne, le min et le max de l'altitude des aéroports de départs des vols du 28 avril 2021.

+ Compter le nombre de vols par jour...
  + entre le 1er juillet 2021 et le 14 juillet 2021 inclus
  + ne retourner que les 3 jours les plus denses
  + mais de moins de maximum 90000 vols par jour
  
## 3 / Jointure

Avec le builder de pipeline de MongoDB Compass:

+ Lister les 3 aéroports de destination les plus fréquent dans la base
  + entre le 1er juillet 2021 et le 14 juillet 2021 inclus
+ Faire une jointure avec la liste des aéroports (collection `airports`) pour en récupérer **uniquement** le nom
  + Attention à ne pas faire la jointure n'importe quand !
  
Résultat final attendu:
```json
{ _id: 'KORD',
  count: 15689,
  airport: 'Chicago O\'Hare International Airport' }
{ _id: 'KATL',
  count: 13857,
  airport: 'Hartsfield Jackson Atlanta International Airport' }
{ _id: 'KDFW',
  count: 12904,
  airport: 'Dallas Fort Worth International Airport' }
```

## 4 / Explosion de tableaux

Cette fois ci dans la collection `restaurants`, analysez le restaurant d'id "40364681":

+ En commençant par exploser le tableau "grades" pour avoir 1 document par grade
+ En regroupant ensuite par grade afin de calculer le score moyen par grade
  + et en gardant uniquement ce score moyen
  + et le nom du restaurant
  + renommant le champ de $group en "grade"
  
Résultat final attendu:
```json
{ grade: 'A', avg: 10, name: 'Chez Jaja' }
{ grade: 'B', avg: 21.666666666666668, name: 'Chez Jaja' }
```


