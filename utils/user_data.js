var User = require('../models/user');

module.exports = {

  /* get User by email */
  getUser: function(email, cb) {
    User.findOne({'local.email': email}, function (err, user) {
      if (err) return cb(err);
      else return cb(err, user);
    });
  },

  /* get username by uid */
  getUsername: function(uid) {
    User.findOne({'_id': uid}, function (err, user) {
      if (err) return err;
      else return user.local.username;
    });
  },

  /* get realname by uid */
  getRealname: function(uid) {
    User.findOne({'_id': uid}, function (err, user) {
      if (err) return err;
      else return user.local.first_name + ' ' + user.local.last_name;
    });
  }

}
