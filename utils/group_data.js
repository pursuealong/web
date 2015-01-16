var async = require('async');

var City = require('../models/city');
var Group = require('../models/group');
var Content = require('../models/content');
var _ = require('underscore');
var geoCode = require('../geoLocation/geoCoding');

module.exports = {
  /** Gets a group with a specific gid */
  getGroup: function(tag, cb) {
    Group.findOne({'tag' : tag}, function (err, group) {
      cb(err,group);
    });
  },
  getGroupContent: function(lat, lng, req, cb) {
    Content.find({'tag' : req.params.tag}, function(err, contents) {
      var fns = [];
      _.each(contents, function(content) {
        fns.push(function(done) {
          content.setMask(req.user, done);
        });
      });
      async.parallel(fns, function() {
        cb(err, contents);
      });
    });
  },
  getGroups: function(lat, lng, cb) { 
    Group.find({}, function(err, groups) {
      var city = '';
      var fns = [];
      fns.push(function(done) {
        geoCode.doReverseGeo(lat, lng, function(data) {
          city = data;
          done();
        });
      });
      async.parallel(fns, function() {
        var groups_out = [];
        _.each(groups, function(group_elem) {
          if (inSameCity(city, group_elem.getCity())) {
            groups_out.push(group_elem);
          }
        });
        cb(err, groups_out);
      });
    });
  },
  postGroup: function(req, cb) {
    var lat = req.body.lat;
    var lng = req.body.lng;
    var tag = req.body.tag;
    var group = new Group();
    group.gid = group._id;
    group.tag = tag;
    group.author = req.user.local.username;
    group.timestamp = new Date().getTime();
    group.members = [];
    group.upvote = [];
    group.posts = [];
    var fns = [];
    fns.push(function(done) {
      geoCode.doReverseGeo(lat, lng, function(city) {
        group.city = city;
        done();
      });
    });
    async.parallel(fns, function() {

      City.findOne({'cityname' : group.city}, function(err, city_obj) {
        if (_.isNull(city_obj)) {
          // TODO: make city object and append the group
        } else {
          city_obj.groups.push(group._id);
        }
      });
      group.save(function(err) {
        cb(err, group);
      });
    });
  },
  postGroupContent : function(req, cb) {
    var tag = req.body.tag;
    Group.findOne({'_id' : tag}, function (err, group) {
      var content = new Content();
      content.pid = req.user._id;
      content.content = req.body.content;
      content.tag = group.tag;
      content.author = req.user._id;
      content.timestamp = new Date().getTime();
      content.city = group.city;
      content.upvote = new Array();
      content.comments = new Array();
      content.views = new Number();
      content.save(function(err) {
        group.posts.push(content._id);          
        cb(err, content);
      });
    });
  }
};
/* return true if centent is in same city.
   Otherwise return false */
function inSameCity(city, content_city) {
  return city == content_city;
}
