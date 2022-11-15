```javascript
use school;

let coll = db.getCollection("lab-02");

// 1
coll.insertOne({
    "firstname": "Sophie",
    "lastname": "Fonfec",
    "birthdate": ISODate("1984-04-26"),
    "account_id": NumberInt(1337)
});

// 3
coll.insertOne({
    "firstname": "Sophie",
    "lastname": "Fonfec",
    "birthdate": ISODate("1984-04-26"),
    "_id": NumberInt(1337),
    "date_in": ISODate()
});

// 4
coll.insertOne({
    "_id": NumberInt(1337),
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
});

// 5
let legumes = [
    "Artichaut", "Aubergine", "Betterave", "Blette", "Brocoli",
    "Carotte", "Céleri", "Chou-fleur", "Concombre", "Courgette",
    "Épinard", "Fenouil", "Fève", "Haricot vert", "Laitue",
    "Maïs", "Navet", "Oignon", "Poireau", "Poivron", "Pomme de terre",
    "Potiron", "Radis", "Salade", "Tomate"
];

db.getCollection('miam').drop();
db.getCollection('miam').insertMany(legumes.map(x=>[{"_id": x}][0]));


// 6
let legumes = [
    "Artichaut", "Aubergine", "Betterave", "Blette", "Brocoli", "Brocoli",
    "Carotte", "Céleri", "Chou-fleur", "Concombre", "Courgette",
    "Épinard", "Fenouil", "Fève", "Haricot vert", "Laitue",
    "Maïs", "Navet", "Oignon", "Poireau", "Poivron", "Pomme de terre",
    "Potiron", "Radis", "Salade", "Tomate"
];

db.getCollection('miam').drop();
db.getCollection('miam').insertMany(legumes.map(x=>[{"_id": x}][0]), {"ordered": false});

```