#!/bin/bash

mongosh --quiet <<EOF
rs.initiate({}, {"force": true});
EOF