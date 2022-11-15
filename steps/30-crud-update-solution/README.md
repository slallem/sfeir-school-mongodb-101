```javascript

var coll = db.getCollection("lab-03");

// 3.1

coll.updateOne(
    {"_id": 666},
    {
        "$set": {
            "new": true
        }
    }
);

coll.updateOne(
    {"_id": 666},
    {
        "$unset": {
            "user": 1
        }
    }
);

coll.updateMany(
    {"tags": "one"},
    {
        "$set": {
            "key": "rickroll"
        }
    }
);

coll.updateMany(
    {},
    {
        "$rename": {
            "user": "contact",
            "tags": "labels",
        }
    }
);


coll.updateOne(
    {"_id": 42},
    {
        "$set": {
            "name": "l33t"
        },
        "$setOnInsert": {
            "date_in": ISODate()
        }
    },
    {
        "upsert": true
    }
);

// 3.2

coll.updateMany(
    {"tags.0": {"$exists": true}},
    {
        "$push": {
            "tags": "four"
        }
    }
);

coll.updateMany(
    {"tags": {"$size": 2}},
    {
        "$addToSet": {
            "tags": "two"
        }
    }
);

// 3.9


coll.updateMany(
    {"tags": "one"},
    [
        {
            "$set": {
                "year": {"$year": "$date_in"}
            }
        }
    ]
);


coll.updateMany(
    {},
    {
        "$push": {
            "tags": {
                "$each": [],
                "$sort": 1
            }
        }
    }
);

```