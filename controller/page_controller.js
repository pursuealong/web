var home_controller = require('./home_controller');
var local_login_controller = require('./local_login_controller');
var facebook_login_controller = require('./facebook_login_controller');
var logout_controller = require('./logout_controller');
var profile_controller = require('./profile_controller');
var unlink_controller = require('./profile_controller');
var register_controller = require('./register_controller');

module.exports = function (app, passport) {
  home_controller(app, passport);
  local_login_controller(app, passport);
  facebook_login_controller(app, passport);
  logout_controller(app, passport);
  profile_controller(app, passport);
  unlink_controller(app, passport);
  register_controller(app, passport);
}
