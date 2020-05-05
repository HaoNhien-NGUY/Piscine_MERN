MongoClient = require('mongodb');
const fs = require('fs');
const express = require('express');
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {

     MongoClient.connect("mongodb://localhost:27042", { useUnifiedTopology: true }, function (err, client) {
          if (err) {
               console.log('connection failed.');
               throw err;
          } else {
               console.log('Connection successfull.');
               var db = client.db("mern-pool");
               db.collection("students").find({validated: 'in progress'}).sort({lastname: 1}).toArray(function(err, result) {
                    if (err) throw err;
                    console.log(result);
                    res.send(result);
                    client.close();
                  });
          }
     });
});

app.listen(4242);