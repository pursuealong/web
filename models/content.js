/* MongoDB Content model */

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

//TODO: Add more on current schema
var schema = mongoose.Schema({

  local        : {
    content    : Object,
    author     : String,
    timestamp  : String,
    coordiante : Object,
    upvote     : Number,
    comments   : Array,
    views      : Number,
    priority   : Number
  }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Content', schema);
