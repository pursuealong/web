var Content = require('../models/content');
var geoCode = require('../geoLocation/geoCoding');

module.exports = {

  /* returns list of all contents within radius */
  getContent: function(lat, lng, req, cb) {
    Content.find({}, function (err, contents) {
      var sorted = [];
      var city = geoCode.doReverseGeo(lat, lng, cb);
      var len = contents.length;
      // TODO: optimization perhaps?
      (function() {
        for (var i = 0; i < len; i++) {
          if (inSameCity(city, contents[i].getCity()))
            sorted.push(contents[i].setMask(req.user));
        }
      })();
      if (err) return cb(err);
      else return cb(err, sorted);
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
