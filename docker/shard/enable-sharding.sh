#!/bin/bash

mongosh --port 29002 --quiet <<EOF
use admin;
sh.enableSharding("school");

sh.shardCollection("school.questions-2019", { id: "hashed" } )

EOF

mongorestore --host localhost --port 29002 --archive=../../data/restaurants.agz --gzip
mongorestore --host localhost --port 29002 --archive=../../data/questions-2019.agz --gzip