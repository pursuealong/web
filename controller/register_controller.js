module.exports = function(app, passport) {

  // registration
  // show the signup form
  app.get('/register', function(req, res) {
    res.render('user_registration.ejs', { message: req.flash('loginMessage') });
  });

  // process the signup form
  app.post('/register', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/register', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

};
