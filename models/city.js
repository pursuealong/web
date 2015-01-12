/* MongoDB City Model */

var mongoose = require('mongoose');
var _ = require('underscore');
var Group = require('../models/group');

var schema = mongoose.Schema({
  cityname      : String,
  groups        : [String], // [gid0, gid1, ...]
  timestamp     : Number,
  priority      : Number,
  members       : [String],
  upvote        : [String]
});

schema.methods.addUpvote = function() {
  // TODO: Implement this function later 
}

schema.methods.addGroup = function(gid) {
  groups.push(gid);
}

/** Gets a group with a specific gid */
schema.methods.getGroup = function(gid, cb) {
  Group.findOne({'_id': gid}, function (err, group) {
    cb(group);
  });
}

/** Gets all the group in the city */
schema.methods.getGroups = function(cb) {
  var query = {};
  this.groups.forEach(function(elem, index) {
    query['_id'] = elem;
  });
  Group.find(query, function(groups) {
    cb(groups);
  });
}
module.exports = mongoose.model("City", schema);

