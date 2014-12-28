module.exports = function(app, passport) {

  // unlink account
  /* used to unlink accounts. for social accounts, just remove the token
  for local account, remove email and password */

  // local login
  app.get('/unlink/local', function(req, res) {
    var user = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

  // facebook
  app.get('/unlink/facebook', function(req, res) {
    var user = req.user;
    user.facebook.token = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });
}
