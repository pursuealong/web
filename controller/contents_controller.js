var utils = require('../utils/content_data');

/** Endpoint API for Content **/

module.exports = function(app, passport) {

  /* TODO: include gid later (ex. /posts/:gid/:pid */

  // get contents given lat and lng
  app.get('/posts/:lat/:lng', function(req, res) {
    var lat = req.params.lat;
    var lng = req.params.lng;
    utils.getContent(lat, lng, req, function (err, content) { 
      try {
        res.json(content);
      } catch (err) {
        console.log(err);
      }
    });
  });

  // post a new content
  app.post('/posts', function(req, res) {
    utils.postContent(req, function (err, content) { 
      try {
        res.json(content);
      } catch (err) {
        console.log(err);
      }
    });
  });

  // get upvote given a content
  app.get('/upvote/:pid', function(req, res) {
    var content = req.body.content;
    utils.getUpvotes(content, function (err, upvotes) {
      try {
        res.json(upvotes);
      } catch (err) {
        console.log(err);
      }
    });
  });

  // increment upvote given a content
  app.post('/upvote/:pid/', function(req, res) {
    var content = req.body.content;
    var user = req.user;
    utils.addUpvote(content, user, function (err, content_changed) {
      try {
        res.json(content_changed);
      } catch (err) {
        console.log(err);
      }
    });
  });

  // get views given a content
  app.get('/upvote/:pid', function(req, res) {
    var content = req.body.content;
    utils.getViews(content, function (err, views) {
      try {
        res.json(views);
      } catch (err) {
        console.log(err);
      }
    });
  });

  // increment views given a content
  app.post('/upvote/:pid/', function(req, res) {
    var content = req.body.content;
    utils.addView(content, function (err, views) {
      try {
        res.json(views);
      } catch (err) {
        console.log(err);
      }
    });
  });

};
