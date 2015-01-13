/* MongoDB User model */

var mongoose = require('mongoose');
var crypto = require('crypto');
var generator = require('mongoose-gen');
var bcrypt   = require('bcrypt-nodejs');

//TODO: Add more on current schema
var schema = mongoose.Schema({

  local      : {
    online        : Boolean,
    email         : String,
    password      : String,
    gender        : String,
    first_name    : String,
    last_name     : String,
    username      : String,
    profile_photo : String,
    interests     : [String],
    friends       : [String],
    upvotes_post  : [String], /* [ pid1, pid2, ... ] */
    upvotes_cmts  : [String] /* [ cid1, cid2, ... ] */
  },

  facebook   : {
    id            : String, /* only for facebook account users */
    online        : Boolean,
    token         : String,
    email         : String,
    gender        : String,
    first_name    : String,
    last_name     : String,
    username      : String,
    profile_photo : String,
    interests     : [String],
    friends       : [String],
    upvotes_post  : [String], /* [ pid1, pid2, ... ] */
    upvotes_cmts  : [String] /* [ cid1, cid2, ... ] */

  }
});

schema.methods.toModel = function(json, cb) {
  try {
    var user = generator.schema('User', json);
    cb(user);
  } catch(err) {
    throw err;
  }
};

schema.methods.getUser = function() {
  if (!this.local.token)
    return this.local;
  else
    return this.facebook;
};

// generating a hash
schema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
schema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', schema);
