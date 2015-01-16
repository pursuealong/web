/* MongoDB Image model */

var mongoose = require('mongoose');
var fs = require('fs');

var schema = mongoose.Schema({

  data: Buffer /* image itself */

});

schema.methods.setImage = function(filepath, cb) {
  var self = this;
  fs.readFile(filepath, function read(err, data) {
    if (err) {
        // handle error at caller method, which should
        // flash the error message. (ex. file does not exist)
        cb(err, null);
    } else{
      // save data and return _id to caller method.
      self.data = data;
      self.save(function(err) {
        cb(err, self._id);
      });
    }
  });
};

// create the model for image and expose it to our app
module.exports = mongoose.model('Image', schema);
