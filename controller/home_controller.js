module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    res.render('home.ejs', {
      user: req.user
    });
  });

  app.get('/groups/:group', function (req, res) {
    res.render('group_page.ejs', {
      user: req.user
    });
  });
  app.get('/posts/:post', function (req, res) {
    res.render('post_page.ejs', {
      user: req.user
    });
  });
}
