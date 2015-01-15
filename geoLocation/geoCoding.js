var request = require('request');
var fs = require('fs');
var _ = require('underscore');

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
  var city_name_l = '';
  var city_name_p = '';

  // TODO: optimization perhaps?
  _.each(arrAddress, function(addr) {
    if (_.contains(addr.types, 'political')) {
      city_name_p = addr.long_name;
    }
    if (_.contains(addr.types, 'locality')) {
      city_name_l = addr.long_name;
    }
  });

  return city_name_l || city_name_p;

}

