```javascript

use school;

let coll = db.getCollection("questions-2019");

// 1.1
coll.findOne(); // document
coll.find().limit(1); // Cursor

// 1.2
coll.findOne({"id": 463067});

// 1.3
coll.findOne({"_id": ObjectId("61aa3c5f28e0b3737cce715d")});

// 1.4
coll.count(); // Deprecated
coll.countDocuments();
coll.estimatedDocumentCount();

// 1.5
coll.countDocuments({"nb_mots": {"$gt": 600}});

// 1.6
coll.countDocuments({"date": {"$gte": ISODate("2019-03-01"), "$lt": ISODate("2019-04-01")}});

// 1.7
coll.countDocuments({"parlementaire": {"$exists": true}});

// 1.8
coll.countDocuments({"parlementaire.nom": {"$ne": ""}}); // <-- insuffisant 
coll.countDocuments({"parlementaire.nom": {"$exists": true, "$ne": ""}}); // <-- ok
coll.countDocuments({"parlementaire.nom": {"$gt": ""}}); // <-- ok 

// 1.9
coll.countDocuments({"$or": [
        {"parlementaire.nom": "Jean Lassalle"},
        {"parlementaire.nom": "Cendra Motin"}
    ]});
// ou
coll.countDocuments({"parlementaire.nom": {"$in": ["Jean Lassalle", "Cendra Motin"]}});

// 1.10
coll.countDocuments({"parlementaire": {}});

// 1.11
coll.distinct("parlementaire.nom").length // distinct retourne un array javascript

// 2

coll.find({}, {"id": 1, "source": 1, "_id":0});
coll.find({}, {"_id": 0, "intervention": 0});
coll.find({}, {"word_count": "$nb_mots"});
coll.find({}, {"word_count": {"$multiply": ["$nb_mots", 2]}});

// 3
coll.find({
    "parlementaire.nom": "Jean Lassalle",
    "date": {"$gte": ISODate("2019-03-01"), "$lt": ISODate("2019-04-01")}}
).sort({
    "nb_mots": -1
});

// 4
coll.find({
    "parlementaire.nom": "Jean Lassalle",
    "date": {"$gte": ISODate("2019-03-01"), "$lt": ISODate("2019-04-01")}
    },
    {"intervention": 0, "source": 0, "parlementaire": 0}
).sort({
    "nb_mots": -1
}).skip(3*12).limit(12);

```