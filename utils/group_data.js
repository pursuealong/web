var Group = require('../models/group');
var _ = require('underscore');

module.exports = {
  /** Gets a group with a specific gid */
  getGroup: function(gid, cb) {
    Group.findOne({'_id': gid}, function (err, group) {
      cb(group);
    });
  },
  getGroups: function(cb) {
    Group.find({}, function(groups) {
      cb(groups);
    });
  }
};
