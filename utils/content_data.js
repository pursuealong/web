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
       _.each(contents, function(content) {
        fns.push(function(done) {
          utils.getComments(content, done);
        });
      });
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
      content.timestamp = new Date().getTime();
      var fns = [];
      fns.push(function(done) {
        geoCode.doReverseGeo(lat, lng, function(city) {
          content.city = city;
          done();
        });
      });
      content.upvote = new Number();
      content.comments = new Array();
      content.views = new Number();
      content.priority = new Number();
      async.parallel(fns, function() {
        content.save(function(err) {
          cb(err, content);
        });
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
