var utils_c = require('../utils/content_data');
var utils_g = require('../utils/group_data');

/** Endpoint API for Content **/

function sendResp(res, content, err) {
  try {
    res.json(content);
  } catch (err) {
    console.log(err);
  }
}

module.exports = function(app, passport) {

  /* TODO: include gid later (ex. /posts/:gid/:pid */

  // get contents given lat and lng
  app.get('/posts/:lat/:lng', function(req, res) {
    var lat = req.params.lat;
    var lng = req.params.lng;
    if (req.body.tag) {
      utils_g.getGroupContent(lat, lng, req, function(err, content) {
        sendResp(res, content, err);
      });
    } else {
      utils_c.getContent(lat, lng, req, function (err, content) { 
      sendResp(res, content, err); 
      });
    }
  });

  // get content given tag, lat, lng
  app.get('/posts/:tag/:lat/:lng', function(req, res) {
    var lat = req.params.lat;
    var lng = req.params.lng;
    var tag = req.params.tag;
    utils_g.getGroupContent(lat, lng, req, function(err, content) {
      sendResp(res, content, err);
    });
  });

  // post a new content
  app.post('/posts', function(req, res) {
    if (req.body.tag) {
      utils_g.postGroupContent(req, function(err, content) {
        sendResp(res, content, err); 
      });
    } else {
      utils_c.postContent(req, function (err, content) { 
        sendResp(res, content, err);
      });
    }
  });

  app.get('/groups/:lat/:lng', function(req, res) {
    var lat = req.params.lat;
    var lng = req.params.lng;
    utils_g.getGroups(lat, lng, function(err, groups) {
      sendResp(res, groups, err);
    });
  });

  app.post('/groups', function(req, res) {
    utils_g.postGroup(req, function(err, group) {
      sendResp(res, group, err);
    });
  });
  
  // get upvote given a content
  app.get('/upvote/:pid', function(req, res) {
    utils_c.getUpvotes(req.params.pid, function (err, upvotes) {
      sendResp(res, upvote, err); 
    });
  });

  // increment upvote given a content
  app.post('/upvote', function(req, res) {
    var content = req.body.content;
    var user = req.user;
    utils_c.addUpvote(content, user, function (err, content_changed) {
      sendResp(res, content_changed, err); 
    });
  });

  // get views given a content
  app.get('/views/:pid', function(req, res) {
    utils_c.getViews(req.params.pid, function (err, views) {
      sendResp(res, views, err); 
    });
  });

  // increment views given a content
  app.post('/views', function(req, res) {
    var content = req.body.content;
    utils_c.addView(content, function (err, views) {
      try {
        res.json(views);
      } catch (err) {
        console.log(err);
      }
    });
  });

};
