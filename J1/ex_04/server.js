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

app.get('/name', function(req, res) {
    fs.readFile(__dirname + '/index.html', 'utf8', (err, text) => {
        if (err) throw err;
        text = text.replace('<%name%>', 'Hello unknown');
        res.send(text);
    });
});

app.get('/name/:name', function(req, res) {
    var name = req.params.name;
    fs.readFile(__dirname + '/index.html', 'utf8', (err, text) => {
        if (err) throw err;
        text = text.replace('<%name%>', name);
        res.send(text);
    });
});

app.listen(config.app.port);