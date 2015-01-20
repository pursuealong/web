/* MongoDB Content model */

var mongoose = require('mongoose');
var User = require('./user');
var _ = require('underscore');
var util = require('../utils/user_data');
var Group = require('./group');
var Comment = require('./comment');
var City = require('./city');

//TODO: JS Number is 53 bit decimal, 11 bit floating point.
// Maybe we should consider using full 64 bit integer scheme.
var schema = mongoose.Schema({

  content   : Object,
  tag       : String,
  author    : String, /* uid of the content creator */
  timestamp : Number,
  city      : String,
  upvote    : [String], /* [uid1, uid2, ..] */
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

schema.methods.getTimeStamp = function() {
  return this.timestamp;
};

schema.methods.addUpVote = function(user, cb) {
  var self = this;
  user_obj = user.getUser();
  if (!user_obj.upvotes_post) user_obj.upvotes_post = {};
  if (!user_obj.upvotes_post[self._id]) {
    self.upvote.push(user._id);
    user_obj.upvotes_post[self._id] = 1;
    user.markModified('local');
    
    // TODO: Increment the upvote count for group and city as well.
    Group.findOne({"tag" : self.tag}, function(err, group) {
      if (!_.isNull(group)) {
        group.addUpvote(user, function(err, group_complete) {
          console.log("group upvote done");
        });
      } else {
        console.log("No Groups found for: " + self);
      }
    });
    City.findOne({"cityname" : self.city}, function(err, city) {
        if (!_.isNull(city)) {
          city.addUpvote(user, function(err, city_complete) {
            if (err) console.log("city upvote for: " + city + user + "unsuccessful");
            else console.log("city upvote done"); 
          });
        } else {
          console.log("No city found for: " + self);
        }
    });
  } else {
    // TODO: Figure out what to do in this case
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

schema.methods.addView = function(cb) {
  var self = this;
  self.views++;
  self.save(function(err) {
    cb(err, self.views);
  });
};

schema.methods.getViews = function() {
  return this.views;
};

schema.methods.addComment = function(uid, text, cb) {
  var self = this;
  var newComment = new Comment();
  self.comments.push(newComment._id);
  newComment.upvotes = [];
  newComment.text = text;
  newComment.author = uid;
  newComment.pid = self._id;
  self.markModified('comments');
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
  var user_obj = user.getUser();
  var uid = this.author;
  var comments = this.comments;
  var len = comments.length;
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

// create the model for contents and expose it to our app
module.exports = mongoose.model('Content', schema);
