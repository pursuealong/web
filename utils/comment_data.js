var Comment = require('../models/comment');
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
  getCommentById : function(cid, cb) {
    Comment.findOne({ '_id':  cid }, function (err, comment) {
      cb(err, comment);
    });
  },

  /* Add a comment given Content obj */
  addComment : function(content, uid, text, cb) {
    content.addComment(uid, text, function (err, comment) {
      cb(err, comment);
    });
  },

  /* Get upvotes given Comment obj */
  getUpvotes : function(comment, cb) {
    comment.getUpVotes(function (upvotes) {
      cb(null, upvotes);
    });
  },

  /* Add aa upvote to a Comment obj */
  addUpvote : function(comment, user, cb) {
    comment.addUpVote(user, function (err, upvotes) {
      cb(err, upvotes);
    });
  }

}
