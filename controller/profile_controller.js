var utils = require('../utils/user_data');

module.exports = function(app, passport) {

  // select profile
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('user_profile.ejs', {
        user : req.user
    });
  });
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}
