#!/usr/bin/env bash


mongorestore --host localhost --port 27017 --archive=../../data/restaurants.agz --gzip
mongorestore --host localhost --port 27017 --archive=../../data/questions-2019.agz --gzip