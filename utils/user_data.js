var User = require('../models/user');

module.exports = {

  /* get User by email */
  getUser: function(uid, cb) {
    User.findOne({'_id': uid}, function (err, user) {
      if (err) cb(err);
      else cb(err, user);
    });
  },

  /* get username by uid */
  getUsername: function(uid, cb) {
    this.getUser(uid, function(err, user) {
      if (err) cb(err);
      else cb(user.local.username);
    });
  },

  /* get realname by uid */
  getRealname: function(uid, cb) {
    this.getUser(uid, function (err, user) {
      if (err) cb(err);
      else cb(user.local.first_name + ' ' + user.local.last_name);
    });
  }

}
