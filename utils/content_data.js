var Content = require('../models/content');
var geoCode = require('../geoLocation/geoCoding');
var async = require('async');
var _ = require('underscore');
module.exports = {

  /* returns list of all contents within radius */
  getContent: function(lat, lng, req, cb) {
    Content.find({}, function (err, contents) {
      var city = geoCode.doReverseGeo(lat, lng, cb);
      var len = contents.length;
      // TODO: optimization perhaps?
      var fns = [];
      _.each(contents, function(content) {
        fns.push(function(done) {
          content.setMask(req.user, done);
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
      content.city = geoCode.doReverseGeo(lat, lng, cb);
      content.upvote = new Number();
      content.comments = new Object();
      content.views = new Number();
      content.priority = new Number();
      content.save(function(err) {
        if (err)
          throw err;
        return cb(null, content);
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
