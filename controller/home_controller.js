module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    res.render('home.ejs', {
      user: req.user
    });
  });
}
