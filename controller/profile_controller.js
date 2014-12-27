var utils = require('../utils/user_data');

module.exports = function(app, passport) {

  // select profile
  app.get('/profile', isLoggedIn, function(req, res) {
    utils.getUser(req.user.local.email, function (err, user) { 
      res.render('user_profile.ejs', {
        user : user
      });
    }); 
  });
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}
