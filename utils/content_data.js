var Content = require('../models/content');
var utils = require('../utils/comment_data');
var geoCode = require('../geoLocation/geoCoding');
var async = require('async');
var _ = require('underscore');

module.exports = {

  /* returns list of all contents within radius */
  getContent: function(lat, lng, req, cb) {
    Content.find({}, function (err, contents) {
      var city;
      // TODO: optimization perhaps?
      var fns = [];
      fns.push(function(done) {
        geoCode.doReverseGeo(lat, lng, function(data) {
          city = data;
          done();
        });
      });
      _.each(contents, function(content) {
        fns.push(function(done) {
          content.setMask(req.user, done);
        });
      });
      /* TODO: display handful of comments
       _.each(contents, function(content) {
        fns.push(function(done) {
          utils.getComments(content, done);
        });
      });*/
      async.parallel(fns, function() {
        var content_out = [];
        _.each(contents, function(content) {
          if (inSameCity(city, content.getCity())) {
            content_out.push(content);
          }
        });
        cb(err, content_out);
      });
    });
  },

  /* post a new content */
  postContent: function(req, cb) {
    // asynchronous
    process.nextTick(function() {
      var lat = req.body.lat;
      var lng = req.body.lng;
      var content = new Content();
      content.content = req.body.content;
      content.tag = req.body.tag;
      content.author = req.user._id;
      if (!Date.now) {
        Date.now = function() {
          return new Date().getTime();
        }
      }
      content.timestamp = Date.now();
      var fns = [];
      fns.push(function(done) {
        geoCode.doReverseGeo(lat, lng, function(city) {
          content.city = city;
          done();
        });
      });
      content.upvote = new Array();
      content.comments = new Array();
      content.views = new Number();
      content.pid = content._id;
      content.priority = new Number();
      async.parallel(fns, function() {
        content.save(function(err) {
          cb(err, content);
        });
      }); 
    });
  },

  /* Get upvotes given Content obj */
  getUpvotes : function(content, cb) {
    Content.findOne({'_id': content._id}, function(err, content_obj) {
      console.log(content_obj);
      cb(null, content_obj.getUpVotes());
    });
  },

  /* Add an upvote to a Content obj */
  addUpvote : function(content, user, cb) {
    Content.findOne({'_id': content._id}, function(err, content_obj) {
      content_obj.addUpVote(user, function (err, content) {
        cb(err, content);
      });
    });
  },

  /* Get view given Content obj */
  getViews : function(content, cb) {
    Content.findOne({'_id': content._id}, function(err, content_obj) {
      console.log(content_obj);
      cb(null, content_obj.getViews());
    });
  },

  /* Add a view to a Content obj */
  addView : function(content, cb) {
    Content.findOne({'_id': content._id}, function(err, content_obj) {
      content_obj.addView(function (err, content) {
        cb(err, content);
      });
    });
  }

}

/* return true if centent is in same city.
   Otherwise return false */
function inSameCity(city, content_city) {
  if (city == content_city) return true;
  else return false;
}
