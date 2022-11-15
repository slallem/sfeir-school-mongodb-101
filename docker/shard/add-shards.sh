#!/bin/bash

mongosh --port 29002 --quiet <<EOF
sh.addShard( "shardrs1/mongoshard1:27017");
sh.addShard( "shardrs2/mongoshard2:27017");
sh.addShard( "shardrs3/mongoshard3:27017");
EOF