var login_controller = require('./login_controller');
var register_controller = require('./register_controller');
var profile_controller = require('./profile_controller');

module.exports = function (app, passport) {
    login_controller(app, passport);
    profile_controller(app, passport);
    register_controller(app, passport);
}
