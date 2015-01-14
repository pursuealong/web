/* MongoDB Comment model */

var mongoose = require('mongoose');
var User = require('./user');

var schema = mongoose.Schema({

  text    : String,
  upvote  : [String],
  author  : String /* uid of the comment creator */

});

schema.methods.addUpVote = function(user, cb) {
  var self = this;
  User.findOne({'_id': user._id}, function(err, user_obj) {
    var user_obj = user_obj.getUser();
    if (!user_obj.upvotes_post) user_obj.upvotes_post = {};
    if (!user_obj.upvotes_post[self._id]) {
      self.upvote.push(user._id);
      user_obj.upvotes_post[self._id] = 1;
      user_obj.markModified('local');
    } else {
      // TODO: Figure out what to do...
      console.log("User has already upvoted");
    }
    user_obj.save();
  });
  self.save(function(err) {
    cb(err, self);
  });
};

schema.methods.getUpVotes = function() {
  return this.upvote;
};

// create the model for comments and expose it to our app
module.exports = mongoose.model('Comment', schema);
