# Lab - CRUD - Read

use school;

var coll = db.getCollection("questions-2019");

## 1 / Commandes de base

Avec la collection `questions-2019` de la base de données `school`, écrire les requêtes dans `mongosh` pour:

1. **Lire** le premier document avec find().limit(1) et avec findOne(). Quelle est la différence ?
2. **Lire** le document dont la valeur du champ `id` est égale à `463067`
3. **Lire** le document dont la valeur du champ `_id` est `61aa3c5f28e0b3737cce715d`
4. **Compter** le nombre total de documents dans la collection   
5. **Compter** le nombre de documents qui mentionnent plus de 600 mots
6. **Compter** les questions posées en mars 2019
7. **Compter** les documents qui possèdent le champ `parlementaire`
8. **Compter** les documents qui possèdent le champ `parlementaire.nom` et non vide
9. **Compter** les documents qui possèdent le champ `parlementaire.nom` est "Jean Lassalle" ou "François Fillon"
10. **Compter** les documents pour lesquels le champ `parlementaire` est un objet vide
11. **Lister** les valeurs distinctes du champ `type`

## 2 / Projection

Lire des documents dans la collection `questions-2019` de la base de données `school` mais avec les contraintes suivantes:

1. Uniquement les champ `id` et `source`
2. Sans les champs `_id` et `intervention`
3. Avec uniquement le champ `nb_mots` renommé en `word_count`
4. (Bonus) Avec uniquement le champ `word_count` égal au double de la valeur du champ `nb_mots`

## 3 / Tri

Lire des documents dans la collection `questions-2019` de la base de données `school` mais avec les contraintes suivantes:

1. Le nom du parlementaire : "Jean Lassalle"
2. Questions posées en Mars 2019
3. Tri par nombre de mots décroissant

## 4 / Limit et skip

Même question que précemment, mais avec la page 3 des résultats, sachant qu'il doit y avoir 12 résultats par page.
