/* MongoDB Comment model */

var mongoose = require('mongoose');
var User = require('./user');
var generator = require('mongoose-gen');

var schema = mongoose.Schema({

  text    : String,
  upvote  : Number,
  author  : String /* uid of the comment creator */

});

schema.methods.toModel = function(json, cb) {
  try {
    var comment = generator.schema('Comment', json);
    cb(comment);
  } catch(err) {
    throw err;
  }
};

schema.methods.addUpVote = function(json, cb) {
  var self = this;
  self.upvote++;
  User.toModel(JSON.parse(json), function (user) {
    user.getUser().upvotes_cmts.push(self._id);
  });
  process.nextTick(function() {
    user.save();
  });
  self.save(function(err) {
    cb(err, self.upvote);
  });
};

schema.methods.getUpVotes = function() {
  return this.upvote;
};

// create the model for comments and expose it to our app
module.exports = mongoose.model('Comment', schema);
