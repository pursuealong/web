var Content = require('../models/content');

module.exports = {

  /* get all contents within radius */
  getContents: function(coordiante, uid, cb) {
    Content.find().all(function (err, contents) {
      var sorted = getCloseContents(contents, coordinate, uid);
      if (err) return cb(err);
      else return cb(err, sorted);
    });
  }

}

function getCloseContents(contents, coordinates, uid) {
  // select contents within 10 miles of the coordinates
  // if author of the content is a friend of uid,
  // display real name; otherwise, show username
}
