```bash

# 1
mongorestore mongodb://localhost:27017 --gzip --archive=./data/restaurants.agz
mongorestore mongodb://localhost:27017 --gzip --archive=./data/questions-2019.agz

# 2
# Avec le JSONL
mongoimport --port 27017 --db school --collection days --drop --maintainInsertionOrder ./data/days.jsonl

# Avec l'array JSON
jq -c '.[]' < data/days.json | mongoimport --port 27017 --db school --collection days --drop --maintainInsertionOrder

```