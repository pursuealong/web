/* MongoDB User model */

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

//TODO: Add more on current schema
var schema = mongoose.Schema({

  local      : {
    email     : String,
    password  : String,
    first_name: String,
    last_name : String,
    username  : String,
    interests : [String]
  },
  facebook   : {
    id        : String,
    token     : String,
    email     : String,
    first_name: String,
    last_name : String,
    interests : [String]
  }
});

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
