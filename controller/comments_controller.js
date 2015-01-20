var utils = require('../utils/comment_data');

/** Endpoint API for Comments **/

module.exports = function(app, passport) {

  /* TODO: include gid later (ex. /posts/:gid/:pid */

  // get comments from a content
  app.get('/comments/:pid', function(req, res) {
    utils.getComments(req, function (err, comments) {
      try {
        res.json(comments);
      } catch (err) {
        console.log(err);
      }
    });
  });

  // post a comment on a content
  app.post('/comments', function(req, res) {
    var content = req.body.content;
    var uid = req.user._id;
    var text = req.body.text;
    utils.addComment(content, uid, text, function (err, comment) {
      try {
        res.json(comment);
      } catch (err) {
        console.log(err);
      }
    });
  });

  // get upvote given a comment
  app.get('/upvote/:pid/:cid', function(req, res) {
    var comment = req.body.comment;
    utils.getUpvotes(comment, function (err, upvotes) {
      try {
        res.json(upvotes);
      } catch (err) {
        console.log(err);
      }
    });
  });

  // increment upvote given a comment
  app.post('/upvote/:pid/:cid', function(req, res) {
    var comment = req.body.comment;
    var user = req.user;
    utils.addUpVote(comment, user, function (err, upvotes) {
      try {
        res.json(upvotes);
      } catch (err) {
        console.log(err);
      }
    });
  });

};
