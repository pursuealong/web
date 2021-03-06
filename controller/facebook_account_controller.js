module.exports = function(app, passport) {
  //login with Facebook
  // send to facebook to do the authentication
  // TODO: get approval from Facebook for the rest!!!
  var scopes = ['email', 'public_profile', 'user_friends'];//, 'user_activities', 'user_events', 'user_groups', 'user_interests', 'user_likes'];
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : scopes }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/',
      failureRedirect : '/',
      failureFlash : true // allow flash messages
    }));

  // unlink account
  /* used to unlink accounts. for social accounts, just remove the token
  for local account, remove email and password */
  app.get('/unlink/facebook', function(req, res) {
    var user = req.user;
    user.facebook.token = undefined;
    user.save(function(err) {
      res.redirect('/');
    });
  });

}
