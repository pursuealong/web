/* MongoDB Group Model */

var mongoose = require('mongoose');
var _ = require('underscore');
var Content = require('../models/content');

var schema = mongoose.Schema({
  gid        : String,
  tag        : String,
  author     : String,
  timestamp  : Number,
  priority   : Number,
  members    : [String], // [uid0, uid1, ...]
  upvote     : [String],
  posts      : [String] // [pid0, pid1, ...]
});

schema.methods.getTag = function() {
  return this.tag;
}

schema.methods.addUpvote = function() {
  //TODO: Implement this function later
}

schema.methods.addPost = function(pid) {
  posts.push(pid);
}

schema.methods.getPosts = function(cb) {
  var query = {};
  this.posts.forEach(function(elem, index) {
    query['_id'] = elem;
  });
  Content.find(query, function(posts) {
    cb(posts);
  });
}

schema.methods.getPost = function(pid, cb) {
  Content.findOne({'_id': pid}, function(err, post) {
    cb(post);
  });
}
module.exports = mongoose.model("Group", schema);
