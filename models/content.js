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
  timestamp : String,
  city      : String,
  upvote    : Number,
  comments  : [String], /* [ cid1, cid2, ... ] */
  views     : Number,
  priority  : Number

});

schema.methods.getTag = function() {
  return this.tag;
};

schema.methods.getCity = function() {
  return this.city;
};

schema.methods.upVote = function(user) {
  this.upvote++;
  user.getUser().upvotes_post.push(this._id);
};

schema.methods.addComment = function(uid, text) {
  var newComment = new Comment();
  newComment.upvotes = 0;
  newComment.text = text;
  newComment.author = uid;
  newComment.save();
  newComment.save(function(err) {
    if (err)
      throw err;
    this.comments.push(newComment._id);
  });
};

schema.methods.upViews = function() {
  this.views++;
};

/* Assume that author field of content in DB
   is set to uid. Change the field to
   username if user is not friend with
   author of the content. */
schema.methods.setMask = function(user) {
  var User = user.getUser();
  var uid = this.author;
  var comments = this.comments;
  var len = comments.length;

  // need to check both author and comments
  if (!_.contains(User.friends, uid) && user._id != uid)
    this.author = util.getUsername(uid);
  else
    this.author = util.getRealname(uid);

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
