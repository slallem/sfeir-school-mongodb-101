#!/bin/bash

mongosh --quiet <<EOF
var config = {
    "_id": "sfeir-school-rs",
    "version": 1,
    "members": [
        {
            "_id": 0,
            "host": "mongors1:27017",
            "priority": 30
        },
        {
            "_id": 1,
            "host": "mongors2:27017",
            "priority": 20
        },
        {
            "_id": 2,
            "host": "mongors3:27017",
            "priority": 10
        }
    ]
};
rs.initiate(config, {"force": true});
rs.status();
EOF

# Run this script after startup of all the replicaset members
# docker exec mongors1 /scripts/init-replicaset.sh