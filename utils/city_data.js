var City = require('../models/city');
var geoCode = require('../geoLocation/geoCoding');
var async = require('async');
var _ = require('underscore');

module.exports = {
  /* Gets all the groups in the given city */
  getCity: function(cityname, cb) {
    City.findOne({'cityname': cityname}, function (err, city) {
      cb(city);
    });
  },
  getCities: function(cb) {
    City.find({}, function (err, cities) {
      cb(cities);
    });
  }
i};
