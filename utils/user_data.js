var User = require('../models/user');
var Content = require('../models/content');

module.exports = {

  /* get User */
  getUser: function(email, cb) {
    User.findOne({'local.email': email}, function (err, user) {
      if (err) return cb(err);
      else return cb(err, user);
    });
  }

  /* post a content */
  postContent: function(req, author, cb) {
    // asynchronous
    process.nextTick(function() {
      var content = new Content();
      content.local.content = req.body.content;
      content.local.author = author;
      content.local.timestamp = getUniqueTime();
      content.local.coordinate = req.body.coordinate;
      content.local.upvote = Number("0");
      content.local.comments = Object();
      content.local.views = Number("0");
      content.local.priority = Number("0");
      content.save(function(err) {
        if (err)
          throw err;
        return cb(null, content);
      });
    }
  }

}

function getUniqueTime() {
  var time = new Date().getTime();
  while (time == new Date().getTime());
  return new Date().getTime();
}
