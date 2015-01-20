/* MongoDB Comment model */

var _ = require('underscore');
var mongoose = require('mongoose');

var User = require('./user');
var util = require('../utils/user_data');

var schema = mongoose.Schema({

  text    : String,
  upvote  : [String],
  author  : String, /* uid of the comment creator */
  pid     : String 
});

schema.methods.addUpVote = function(user, cb) {
  // TODO: Implement this function later.
  var self = this;
  user_obj = user.getUser();
  if (!user_obj.upvotes_cmts) user_obj.upvotes_cmts = {};
  if (!user_obj.upvotes_cmts[self._id]) {
    self.upvote.push(user._id);
    user_obj.upvotes_cmts[self._id] = 1;
    user.markModified('local');
  } else {
    // TODO: Figure out what to do...
    console.log("User has already upvoted");
  }
  user.save();
  self.save(function(err) {
    cb(err, self);
  });
};

schema.methods.getUpVotes = function() {
  return this.upvote;
};

schema.methods.setMask = function(user, cb) {
  var user_obj = user.getUser();
  var uid = this.author;
  var self = this;
  // need to check both author and comments
  if (!_.contains(user_obj.friends, uid) && user._id != uid) {
    util.getUsername(uid, function (username) {
      self.author = username;
      cb();
    });
  } else {
    util.getRealname(uid, function (realname) {
      self.author = realname;
      cb();
    });
  }
};
// create the model for comments and expose it to our app
module.exports = mongoose.model('Comment', schema);
