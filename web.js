var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var _ = require('underscore');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var RedisStore = require('connect-redis')(session);
var mongoose = require("mongoose");
var dbKeys = require('./auth/keys.js');
//var handler = require('./handler.js');
var app = express();
var http = require('http').Server(app);
//connect to MongoDB
mongoose.connect(dbKeys.mongo);
// pass in passport for configuration
require('./auth/passport')(passport);

// express application configuration
app.use(logger('dev')); // log every request to the console
app.use(cookieParser()); // read cookies need for the authenticatiom
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); 

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');

// required for passport
app.use(session({ secret: 'temporary' }));
//TODO: store session in Redis
/*
    session({ 
  secret: "our_redis_secret", 
  store : new RedisStore({
    host: 'localhost',
    port: 6379
    //user: 'redis user name'
    //pass: 'radis password'
  }), // only store session in Redis
  secret: 'local', // create session local
  cookie : {
    maxAge : 604800 // one week
  }
}));*/
app.use(passport.initialize()); // passport intialize
app.use(passport.session()); // persistent login sessions of passport
app.use(flash()); // use connect-flash for flash messages stored in session

// REST API
//app.get('/', handler.index);
//app.get('/geo/:lat/:lng', handler.geo);

// load our routes for work routes file
require('./controller/page_controller.js')(app, passport); // load our routes and pass in our app and fully configured passport

// Server
var server = http.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});

