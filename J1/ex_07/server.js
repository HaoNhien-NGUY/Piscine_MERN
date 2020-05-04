var express = require('express');
var config = require('config');
var myMERN_module = require('./my_MERN_module.js');

process.env.NODE_ENV = "development";

var app = express();

app.get('/files/:name', async function(req, res) {
    content = await myMERN_module.read(req.params.name);
    res.setHeader('Content-Type', 'text/plain');
    res.send(content);
});

app.post('/files/:name', async function(req, res) {
    content = await myMERN_module.create(req.params.name);
    res.setHeader('Content-Type', 'text/plain');
    res.send(content);
});

app.put('/files/:name/:content', async function(req, res) {
    content = await myMERN_module.update(req.params.name, req.params.content);
    res.setHeader('Content-Type', 'text/plain');
    res.send(content);
});

app.delete('/files/:name', async function(req, res) {
    content = await myMERN_module.delete(req.params.name);
    res.setHeader('Content-Type', 'text/plain');
    res.send(content);
});

app.listen(config.app.port);