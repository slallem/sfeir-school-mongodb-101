```javascript

use school;

// 1
db.flights.aggregate([
    {
        "$match": {"origin": "01IA", "destination": "01IA"}
    }
]);


db.flights.aggregate([
    {
        "$match": {"origin": "01IA", "destination": "01IA"}
    },
    {
        "$count": "count"
    }
]);

db.flights.aggregate([
    {
        "$match": {"origin": "01IA", "destination": "01IA"}
    },
    {
        "$project": {
            "_id": 0,
            "origin": 1,
            "destination": 1,
            "month": {"$month": "$day"}
        }
    }
]);

// 2

db.flights.aggregate([
    {
        "$match": {
            "day": {"$gte": ISODate("2021-04-28"), "$lt": ISODate("2021-04-29")}
        }
    },
    {
        "$group": {
            "_id": null,
            "avg": {"$avg": "$altitude_1"},
            "min": {"$min": "$altitude_1"},
            "max": {"$max": "$altitude_1"}
        }
    }
]);

db.flights.aggregate([
    {
        "$match": {
            "day": {"$gte": ISODate("2021-07-01"), "$lte": ISODate("2021-07-14")}
        }
    },
    {
        "$project": {"day": 1, "_id": 0}
    },
    {
        "$group": {
            "_id": "$day",
            "count": {"$sum": 1}
        }
    },
    {
        "$match": {"count": {"$lte": 90000}}
    },
    {
        "$sort": {"count": -1}
    },
    {
        "$limit": 3
    }
]);

// 3

db.flights.aggregate([
    {
        "$match": {
            "day": {"$gte": ISODate("2021-07-01"), "$lte": ISODate("2021-07-14")}
        }
    },
    {
        $group: {
            _id: '$destination',
            count: {
                $sum: 1
            }
        }
    },
    {
        $match: {
            _id: {
                $ne: null
            }
        }
    },
    {
        $sort: {
            count: -1
        }
    },
    {
        $limit: 3
    },
    {
        $lookup: {
            from: 'airports',
            localField: '_id',
            foreignField: 'ident',
            as: 'airport'
        }
    },
    {
        $set: {
            airport: {
                $getField: {
                    field: 'name',
                    input: {
                        $arrayElemAt: [
                            '$airport',
                            0
                        ]
                    }
                }
            }
        }
    }
]);

// 4

db.restaurants.aggregate([
    {
        "$match": {
            "restaurant_id": "40364681"
        }
    },
    {
        "$project": {
            "_id": 0,
            "name": 1,
            "grades": 1
        }  
    },
    {
        "$unwind": "$grades"
    },
    {
        "$group":{
            "_id": "$grades.grade",
            "avg": {"$avg": "$grades.score"},
            "name": {"$first": "$name"}
        }
    },
    {
        "$set": {
            "grade": "$_id"
        }
    },
    {
        "$unset": ["_id"]
    }
])

```