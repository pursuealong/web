var Content = require('../models/content');

module.exports = {

  /* returns list of all contents within radius */
  getContents: function(radius, center, user, cb) {
    Content.find({}, function (err, contents) {
      var sorted = [];
      var len = contents.length;
      // TODO: optimization perhaps?
      for (var i = 0; i < len; i++) {
        if (isWithinRadius(radius, center, contents[i]))
          sorted.push(content[i].setMask(user));
      }
      if (err) return cb(err);
      else return cb(err, sorted);
    });
  },

  /* post a new content */
  postContent: function(req, author, cb) {
    // asynchronous
    process.nextTick(function() {
      var content = new Content();
      content.local.content = req.body.content;
      content.local.tag = req.body.tag;
      content.local.author = author;
      content.local.timestamp = new Date().getTime();
      content.local.coordinate = req.body.coordinate;
      content.local.upvote = new Number();
      content.local.comments = new Object();
      content.local.views = new Number();
      content.local.priority = new Number();
      content.save(function(err) {
        if (err)
          throw err;
        return cb(null, content);
      });
    });
  }

}

/* return true if centent is within radius from
   the center. Otherwise return false */
function isWithinRadius(radius, center, content) {
  var lat1 = center.lat;
  var long1 = center.lng;
  var lat2 = content.local.coordinate.lat;
  var long2 = content.local.coordinate.lng;

  // Translate to a distance
  var distance =
    Math.sin(lat1 * Math.PI) * Math.sin(lat2 * Math.PI) +
    Math.cos(lat1 * Math.PI) * Math.cos(lat2 * Math.PI) * 
    Math.cos(Math.abs(long1 - long2) * Math.PI);

  // Return the distance in meters
  distance = Math.acos(distance) * 6370981.162;
  if (distance <= radius) return true;
  else return false;
}
