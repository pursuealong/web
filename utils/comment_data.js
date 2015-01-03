var Comment = require('../models/comment');

module.exports = {

  /* set list of Comments given Content */
  getComments : function(content, cb) {
    Comment.find({
      '_id': { $in: content.comments }
    }, function (err, cmts) {
      content.comments = cmts;
      cb();
    });
  }

}
