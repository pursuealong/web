/* MongoDB Content model */

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

//TODO: JS Number is 53 bit decimal, 11 bit floating point.
// Maybe we should consider using full 64 bit integer scheme.
var schema = mongoose.Schema({

  local        : {
    content    : Object,
    tag        : String,
    author     : String,
    timestamp  : String,
    coordiante : Object,
    upvote     : Number,
    comments   : Object, /* key: username, value: comment */
    views      : Number,
    priority   : Number
  }

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Content', schema);
