/* MongoDB Comment model */

var mongoose = require('mongoose');

var schema = mongoose.Schema({

  text    : String,
  upvote  : Number,
  author  : String /* uid of the comment creator */

});

schema.methods.addUpVote = function(user, cb) {
  var self = this;
  self.upvote++;
  user.getUser().upvotes_cmts.push(self._id);
  process.nextTick(function() {
    user.save();
  });
  self.save(function(err) {
    cb(err, self.upvote);
  });
};

schema.methods.getUpVotes = function(cb) {
  cb(this.upvote);
};

// create the model for comments and expose it to our app
module.exports = mongoose.model('Comment', schema);
