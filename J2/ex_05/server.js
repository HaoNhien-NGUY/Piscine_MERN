MongoClient = require('mongodb');
const fs = require('fs');
const express = require('express');
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
     fs.readFile(__dirname + '/index.html', 'utf8', (err, text) => {
          if (err) throw err;
          res.send(text);
     });
});

app.post('/', async function (req, res) {
     MongoClient.connect("mongodb://localhost:27042", { useUnifiedTopology: true }, function (err, client) {
          if (err) {
               console.log('connection failed.');
               throw err;
          } else {
               console.log('Connection successfull.');
               var db = client.db("mern-pool");
               var student = {
                    firstname: req.body.fname,
                    lastname: req.body.lname,
                    email: req.body.email,
                    phone: req.body.phone,
                    validated: 'in progress',
                    admin: false
               };
               db.collection("students").insertOne(student, function (err, resultat) {
                    if (err) {
                         console.log('Failed to save the collection');
                         res.send('Failed to save the collection');
                    } else {
                         console.log('Collection saved.');
                         client.close();
                         res.send('Collection saved.');
                    }
               });
          }
     });
});


app.listen(4242);