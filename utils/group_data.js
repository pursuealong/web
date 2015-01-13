var async = require('async');

var Group = require('../models/group');
var Content = require('../models/content');
var _ = require('underscore');

module.exports = {
  /** Gets a group with a specific gid */
  getGroup: function(gid, cb) {
    Group.findOne({'_id': gid}, function (err, group) {
      cb(err,group);
    });
  },
  getGroups: function(cb) {
    Group.find({}, function(groups) {
      cb(err, groups);
    });
  }
  postGroup: function(req, cb) {
    var lat = req.body.lat;
    var lng = req.body.lng;
    var tag = req.body.tag;
    var group = new Group();
    group.gid = group._id;
    group.tag = tag;
    group.author = req.user.local.username;
    group.timestamp = new Date().getTime();
    var fns = [];
    fns.push(function(done) {
      geoCode.doReverseGeo(lat, lng, function(city) {
        group.city = city;
        done();
      });
    });
    async.parallel(fns, function() {
      content.save(function(err) {
        cb(err, group);
      });
    });
  },
  postGroupContent : function(req, cb) {
    var tag = req.body.tag;
    Group.find({'tag' : tag}, function (err, group) {
      if (_.isNull(group)) {
        exports.postGroup(req, function(err, grp_pstd) {
          var content = new Content();
          content.pid = req.user._id;
          content.content = req.body.content;
          content.tag = tag;
          content.author = req.user._id;
          content.timestamp = new Date().getTime();
          contnet.city = grp_pstd.city;
          content.upvote = new Array();
          content.comments = new Array();
          content.views = new Number();
          content.save(function(err) {
            grp_pstd.posts.push(content._id);          
          });
        });
      } else {
        var content = new Content();
        content.pid = req.user._id;
        content.content = req.body.content;
        content.tag = tag;
        content.author = req.user._id;
        content.timestamp = new Date().getTime();
        contnet.city = grp_pstd.city;
        content.upvote = new Array();
        content.comments = new Array();
        content.views = new Number();
        content.save(function(err) {
          grp_pstd.posts.push(content._id);          
        });
      }
    });
  }
};
