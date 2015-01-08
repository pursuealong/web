/* MongoDB Group Model */

var mongoose = require('mongoose');
var _ = require('underscore');
var util = require('../util/user_data');

var schema = mongoose.Schema({
  gid        : String,
  tag        : String,
  author     : String,
  timestamp  : Number,
  priority   : Number,
  members    : [String], // [uid0, uid1, ...]
  upvote     : Number,
  posts      : [String] // [pid0, pid1, ...]
});

schema.methods.getTag = function() {
  return this.tag;
}

schema.methods.upvote = function() {
  this.upvote++;
}

schema.methods.addPost(pid) {
  posts.push(pid);
}

module.exports = mongoose.model("Group", schema);
