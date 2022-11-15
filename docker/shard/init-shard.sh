#!/usr/bin/env bash

docker exec mongoconfig1 /scripts/init-replicaset.sh

docker exec mongoshard1 /scripts/init-replicaset.sh
docker exec mongoshard2 /scripts/init-replicaset.sh
docker exec mongoshard3 /scripts/init-replicaset.sh

