var Comment = require('../models/comment');
var Content = require('../models/content');
var async = require('async');
var _ = require('underscore');

module.exports = {

  /* set list of Comments given Content */
  getComments : function(content, cb) {
    Comment.find({
      '_id': { $in: content.comments }
    }, function (err, cmts) {
      cb(err, cmts);
    });
  },

  /* return a Comment obj given cid */
  getCommentById : function(comment, cb) {
    Comment.findOne({ '_id':  comment._id }, function (err, comment) {
      cb(err, comment);
    });
  },

  /* Add a comment given Content obj */
  addComment : function(content, uid, text, cb) {
    Content.findOne({'_id': content._id}, function(err, content_obj) {
      content_obj.addComment(uid, text, function (err, comment) {
        cb(err, comment);
      });
    });
  },

  /* Get upvotes given Comment obj */
  getUpvotes : function(comment, cb) {
    Comment.findOne({ '_id':  comment._id }, function (err, comment) {
      cb(null, comment.getUpVotes());
    });
  },

  /* Add aa upvote to a Comment obj */
  addUpvote : function(comment, user, cb) {
    Comment.findOne({ '_id':  comment._id }, function (err, comment) {
      comment.addUpVote(user, function (err, upvotes) {
        cb(err, upvotes);
      });
    });
  }

}
