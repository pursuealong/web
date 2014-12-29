/* MongoDB Comment model */

var mongoose = require('mongoose');

var schema = mongoose.Schema({

  text    : String,
  upvotes : Number,
  author  : String /* uid of the comment creator */

});

// create the model for comments and expose it to our app
module.exports = mongoose.model('Comment', schema);
