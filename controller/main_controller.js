var auth_controller = require('./auth_controller');
var register_controller = require('./register_controller');
var profile_controller = require('./profile_controller');

module.exports = function (app, passport) {
    auth_controller(app, passport);
    profile_controller(app, passport);
    register_controller(app, passport);
}
