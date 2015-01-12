/* MongoDB Content model */

var mongoose = require('mongoose');
var _ = require('underscore');
var util = require('../utils/user_data');

//TODO: JS Number is 53 bit decimal, 11 bit floating point.
// Maybe we should consider using full 64 bit integer scheme.
var schema = mongoose.Schema({

  pid       : String,
  content   : Object,
  tag       : String,
  author    : String, /* uid of the content creator */
  timestamp : Number,
  city      : String,
  upvote    : Number,
  comments  : [String], /* [ cid1, cid2, ... ] */
  views     : Number,
  priority  : Number

});

schema.methods.getTag = function(cb) {
  return this.tag;
};

schema.methods.getCity = function(cb) {
  return this.city;
};

schema.methods.getTimeStamp = function(cb) {
  return this.timestamp;
};

schema.methods.addUpVote = function(user, cb) {
  var self = this;
  console.log(user);
  var user_obj = user.getUser();
  if (!user_obj.upvotes_post) user_obj.upvotes_post = {};
  if (!user_obj.upvotes_post[self._id]) {
    self.upvote++;
    user_obj.upvotes_post[self._id] = 1;
  } else {
    // TODO: Figure out what to do in this case
    console.log("User has already upvoted");
  }
  process.nextTick(function() {
    user.save();
  });
  self.save(function(err) {
    cb(err, self.upvote);
  });
  // TODO: Increment the upvote count for group as well.
};

schema.methods.getUpVotes = function(cb) {
  return this.upvote;
};

schema.methods.addView = function(cb) {
  var self = this;
  self.views++;
  self.save(function(err) {
    cb(err, self.views);
  });
};

schema.methods.getViews = function(cb) {
  return this.views;
};

schema.methods.addComment = function(uid, text, cb) {
  var self = this;
  var newComment = new Comment();
  self.comments.push(newComment._id);
  newComment.upvotes = 0;
  newComment.text = text;
  newComment.author = uid;
  process.nextTick(function() {
    self.save();
  });
  newComment.save(function(err) {
    cb(err, newComment);
  });
};

/* Assume that author field of content in DB
   is set to uid. Change the field to
   username if user is not friend with
   author of the content. */
schema.methods.setMask = function(user, cb) {
  var User = user.getUser();
  var uid = this.author;
  var comments = this.comments;
  var len = comments.length;
  var self = this;
  // need to check both author and comments
  if (!_.contains(User.friends, uid) && user._id != uid) {
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
  // TODO: check for authors of comments
  /*
  (function() {
    for (var i = 0; i < len; i++) {
      if (!_.contains(User.friend, comments[i][0]))
        comments[i][0] = util.getUsername(comments[i][0]);
    }
  })(); */

  return this;
};

// create the model for contents and expose it to our app
module.exports = mongoose.model('Content', schema);
