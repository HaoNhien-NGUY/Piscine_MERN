var express = require('express');
var config = require('config');

process.env.NODE_ENV = "development";

var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Great ! It works.');
});

app.listen(config.app.port);