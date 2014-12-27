var Content = require('../models/content');

module.exports = {
  getContent: function(coordiante, cb) {
    Content.findOne({'local.coordinate': coordinate}, function (err, content) {
      if (err) return cb(err);
      else return cb(err, content);
    });
  }
}

