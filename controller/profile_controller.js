var utils = require('../utils/user_data');

module.exports = function(app, passport) {

  // select profile
  app.get('/profile', function(req, res) {
    if (req.isAuthenticated()) {
      res.render('user_profile.ejs', {
          user : req.user
      });
    } else {
      res.redirect('/');
    }
  });
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}
