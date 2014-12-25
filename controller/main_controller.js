var auth_controller = require('./auth_controller');
module.exports = function (app, passport) {
    auth_controller(app, passport);
}
