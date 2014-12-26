var User = require('../models/user');
module.exports = {
  getUser: function(email, cb) {
    User.findOne({'local.email': email}, function (err, user) {
      if (err) return cb(err);
      else return cb(err, user);
    });
  }
}
