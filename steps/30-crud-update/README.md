# Lab - CRUD - Update

## Init lab

```javascript
use school;

var coll = db.getCollection("lab-03");

coll.drop();

coll.insertMany([
    {
        "_id": NumberInt(1337),
        "tags": ["one"],
        "user": {
            "birthdate": ISODate("1984-04-26"),
            "firstname": "Sophie",
            "lastname": "Fonfec",
            "children": [
                {"firstname": "Kat", "age": NumberInt(3)},
                {"firstname": "Troy", "age": NumberInt(1)}
            ]
        },
        "date_in": ISODate()
    },
    {
        "_id": NumberInt(911),        
        "tags": ["two"],
        "user": {
            "birthdate": ISODate("1969-07-20"),
            "name": "Philippe Martin",
            "children": []
        },
        "date_in": ISODate()
    },
    {
        "_id": NumberInt(666),
        "tags": ["three", "one"],
        "user": {
            "birthdate": ISODate("2012-12-21"),
            "firstname": "Jean",
            "lastname": "Valjean"
        },
        "date_in": ISODate()
    }
]);

```

## 3.1 / Single, simple update

In the `lab-03` collection from the `school` database, update the following documents using these instructions:

+ Update document with _id `666` and add the field `new` with the boolean value `true`
+ Update document with _id `666` and remove the whole `user` field
+ Update all documents with the tag `one` and create a new field `key` with value `rickroll`
+ Rename the field "user" to "contact" and "tags" to "labels" in all documents   
+ Update document with _id `42`and set the user name to `l33t`. Create a new document if it does not exists, and add a date_in field only if it's a new document.

## 3.2 / Array updates

+ Update all documents with at least one value in `tags` field, and add a new value "four"
+ Update all documents with exactly 2 in `tags` field, and add a new value "two" *without duplicates*

## 3.10 / Expert

+ Update all documents with the tag `one` and create a new field `year` with the **year** part of `date_in`
+ Update all documents to sort the tags in alphabetical orders