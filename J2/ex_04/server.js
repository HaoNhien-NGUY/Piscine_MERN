MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27042/students", { useUnifiedTopology: true }, function (err, db) {
     err ? console.log('connection failed.') : console.log('Connection successfull.');    
});