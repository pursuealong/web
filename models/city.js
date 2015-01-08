/* MongoDB City Model */

var mongoose = require('mongoose');
var _ = require('underscore');

var schmea = mongoose.Schema({
  city          : String,
  groups        : [String], // [gid0, gid1, ...]
  timestamp     : Number,
  priority      : Number,
  members       : [String],
  upvote        : Number
});

schmea.methods.upvote = function() {
  this.upvote++;
}

schema.methods.addGroup = function(gid) {
  groups.push(gid);
}

module.exports = mongoose.model("City", schema);

