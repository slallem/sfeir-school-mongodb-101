```javascript

use school;

// 1

db.getCollection("restaurants").explain().find({"restaurant_id": "40391528"})
db.getCollection("restaurants").explain().find({"cuisine": "Hamburgers"})

db.getCollection("restaurants").createIndex({"restaurant_id": -1});


// 2

db.getCollection("restaurants").createIndex({"grades.grade": 1, "grades.date": 1}, {"name": "grade_idx", "sparse": true});

// `db.restaurants.find({"grades.score": 3})`
+ NON
// `db.restaurants.countDocuments({"grades.grade": "B"})` 
+ OUI
// `db.restaurants.find({"grades.grade": "C", "grades.date": {"$gte": ISODate("2014-01-01")}})`
+ OUI
// `db.restaurants.find({"borough": "Bronx", "grades.score": {"$gte": 3}})`
+ OUI

//3

// db.restaurants.find({"cuisine": "Hamburgers", "borough": "Bronx"}, {"restaurant_id": 1})
+ NON
// db.restaurants.find({"cuisine": "Hamburgers", "borough": "Bronx"}, {"cuisine": 1, "borough": 1})
+ NON
// db.restaurants.find({"cuisine": "Hamburgers", "borough": "Bronx"}, {"cuisine": 1, "_id": 0})
+ OUI

// 4

// Pour la recherche "start_with":
db.getCollection("questions-2019").createIndex({"section": 1});
db.getCollection("questions-2019").explain().find({"section": {"$regex": /^dém/}});

// Pour la recherche texte:
db.getCollection("questions-2019").createIndex({"section": "text"}, { default_language: "french" });
db.getCollection("questions-2019").find({"$text": {"$search": "député"}});



```