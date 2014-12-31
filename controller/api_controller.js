var utils = require('../utils/content_data');

module.exports = function(app, passport) {

  app.get('/posts/:lat/:lng', function(req, res) {
    var lat = req.params.lat;
    var lng = req.params.lng;
    utils.getContent(lat, lng, req, function (err, content) { 
      try {
        res.json(content);
      } catch (err) {
        console.log(err);
      }
    });
  });

  app.post('/posts', function(req, res) {
    utils.postContent(req, function (err, content) { 
      try {
        res.json(content);
      } catch (err) {
        console.log(err);
      }
    });
  });


};
