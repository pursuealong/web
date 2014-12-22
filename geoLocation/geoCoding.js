var request = require('request');
var fs = require('fs');

var apiKey = fs.readFileSync('./apiKey');

module.exports = {
  doReverseGeo: function (lat, lng, cb) {
    request("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng  + "&key=" + apiKey, function (err, res, body) {
      cb(body);
    }); 
  }
}

