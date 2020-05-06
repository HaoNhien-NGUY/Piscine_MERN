#!/bin/sh
DIR=`date +%m%d%y`
mkdir $DIR
mongodump --host=localhost  --port=27017 -d mern-pool -o $DIR