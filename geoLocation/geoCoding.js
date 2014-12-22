var request = require('request');
var fs = require('fs');

// Put your api key in "apiKey" file
var apiKey = fs.readFileSync(__dirname + '/apiKey');

module.exports = {
  doReverseGeo: function (lat, lng, cb) {
    request("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng  + "&key=" + apiKey, function (err, res, body) {
      cb(body);
    }); 
  }
}

