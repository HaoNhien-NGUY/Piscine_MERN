var express = require('express');
var config = require('config');
const fs = require('fs');

process.env.NODE_ENV = "development";

var app = express();

app.get('/', function(req, res) {
    fs.readFile(__dirname + '/index.html', 'utf8', (err, text) => {
        if (err) throw err;
        res.send(text);
    });
});

app.listen(config.app.port);