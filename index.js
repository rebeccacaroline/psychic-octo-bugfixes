var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./routes/index.js')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');

var Book = require('./app/models/book');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

app.use('/', router);

app.listen(port);
console.log("Magic happens on port "+port);