/* MongoDB Comment model */

var mongoose = require('mongoose');
var User = require('./user');
var generator = require('mongoose-gen');

var schema = mongoose.Schema({

  text    : String,
  upvote  : [String],
  author  : String /* uid of the comment creator */

});

schema.methods.addUpVote = function(user, cb) {
  // TODO: Implement this function later.
  var self = this;
  user_obj = user.getUser();
  if (!user_obj.upvotes_post) user_obj.upvotes_post = {};
  if (!user_obj.upvotes_post[self._id]) {
    self.upvote.push(user._id);
    user_obj.upvotes_post[self._id] = 1;
  } else {
    // TODO: Figure out what to do...
    console.log("User has already upvoted");
  }
  user.getUser().upvotes_cmts.push(self._id);
  user.save();
  self.save(function(err) {
    cb(err, self.upvote);
  });
};

schema.methods.getUpVotes = function() {
  return this.upvote;
};

// create the model for comments and expose it to our app
module.exports = mongoose.model('Comment', schema);
