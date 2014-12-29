/* MongoDB Content model */

var mongoose = require('mongoose');
var _ = require('underscore');

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
    comments   : Array, /* [ [ username, comment ] ] */
    views      : Number,
    priority   : Number
  }

});

schema.methods.getTag = function() {
  return this.local.tag;
};

schema.methods.upVote = function(user) {
  this.local.upvote++;
  // keep in track of who upvoted
  // TODO: we need a unique id for each content
};

schema.methods.addComment = function(username, text) {
  this.local.comments.push([username, text]);
  // keep in track of who made comment
  // TODO: we need a unique id for each content
};

schema.methods.upViews = function() {
  this.local.views++;
};

/* Assume that author field of content in DB
   is set to real name. Change the field to
   'anonymous' if user is not friend with
   author of the content. */
schema.methods.setMask = function(user) {
  var author = this.local.author;
  var comments = this.local.comments;
  var len = comments.length;

  // need to check both author and comments
  if (!_.contains(user.friend, author))
    this.local.author = 'anonymous';

  // TODO: optimization perhaps?
  for (var i = 0; i < len; i++) {
    if (!_.contains(user.friend, comments[i][0]))
      comments[i][0] = 'anonymous';
  }

  return this;
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Content', schema);
