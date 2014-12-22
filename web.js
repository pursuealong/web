var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var path = require('path');

var handler = require('./handler.js');

var app = express();
var http = require('http').Server(app);
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');

// REST API
app.get('/', handler.index);
app.get('/geo/:lat/:lng', handler.geo);

// Server
var server = http.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});

