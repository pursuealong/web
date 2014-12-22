var gc = require('./geoLocation/geoCoding');

module.exports = {
  index: function (req, res, next) {
    res.render("index");
  },
  geo: function (req, res, next) {
    var lat = req.params.lat;
    var lng = req.params.lng;
    gc.doReverseGeo(lat, lng, function(data) {
      res.send(data);
    });
  }
}
