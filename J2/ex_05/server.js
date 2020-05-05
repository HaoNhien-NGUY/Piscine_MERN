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

app.post('/', function (req, res) {
     var fname = req.body.fname;
     console.log(fname);
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
               console.log(student);
               db.collection("students").insertOne(student, function (err, res) {
                    if (err) {
                         console.log('Failed to save the collection');
                    } else {
                         console.log('Collection saved.');
                         client.close();
                    }
               });
          }
     });

     res.send('idk kev');

});


app.listen(4242);