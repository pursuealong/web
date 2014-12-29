var request = require('request');
var fs = require('fs');

// Put your api key in "apiKey" file
var apiKey = fs.readFileSync(__dirname + '/apiKey').toString();

module.exports = {
  doReverseGeo: function (lat, lng, cb) {
    request("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng  + "&key=" + apiKey, function (err, res, body) {
      cb(getCityName(JSON.parse(body)));
    }); 
  }

}

/* returns name of the city from result */
function getCityName(body) {
  var arrAddress = body.results[0].address_components;
  var len = arrAddress.length;
  var city_name = '';

  // TODO: optimization perhaps?
  (function() {
    for (var i = 0; i < len; i++) {
      if (arrAddress[i].types[0] == 'locality')
        city_name = arrAddress[i].long_name;
    }
  })();

  return city_name;

}

