module.exports = function(app, passport) {

  // process the login form
  app.post('/login', 
    passport.authenticate('local-login', {
      successRedirect : '/', // redirect to the secure profile section
      failureRedirect : '/', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
    }));

  // unlink account
  /* used to unlink accounts. for social accounts, just remove the token
  for local account, remove email and password */
  app.get('/unlink/local', function(req, res) {
    var user = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/');
    });
  });

};
