module.exports = function(app, passport) {

  // logout
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
}
