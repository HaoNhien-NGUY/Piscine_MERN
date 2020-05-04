var express = require('express');
var config = require('config');
process.env.NODE_ENV = "development";

var app = express();

app.listen(config.app.port);