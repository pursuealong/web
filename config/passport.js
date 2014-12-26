var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
 
// load up the user model
var User = require('../models/user');
 
// load the authentication variables
var configAuth = require('./auth');

module.exports = function(passport) {
  /*required for persistent login sessions*/
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Local login
  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },
  function(req, email, password, done) {
    // asynchronous
    process.nextTick(function() {
    User.findOne({ 'local.email' :  email }, function(err, user) {
      // if there are any errors
      if (err)
        return done(err);
      // if no user is found
      if (!user)
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      if (!user.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'Wrong password.'));
      // return user
      else
        return done(null, user);
      });
    });
  }));

  // Local signup
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },
  function(req, email, password, done) {
    // asynchronous
    process.nextTick(function() {
      User.findOne({'local.email': email}, function(err, existingUser) {
        // if there are any errors
        if (err)
          return done(err);
        // check to see if there's already a user with that email
        if (existingUser)
          return done(null, false, req.flash('signupMessage', 'Account already exists.'));
        //  Already logged in.
        if(req.user) {
          var user = req.user;
          user.local.email = email;
          user.local.password = user.generateHash(password);
          user.save(function(err) {
            if (err)
              throw err;
            return done(null, user);
          });
        }
        // Create new local account.
        else {
          var newUser = new User();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

  // Login with Facebook
  passport.use(new FacebookStrategy({
    clientID : configAuth.facebookAuth.clientID,
    clientSecret : configAuth.facebookAuth.clientSecret,
    callbackURL : configAuth.facebookAuth.callbackURL,
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, token, refreshToken, profile, done) {
      // asynchronous
      process.nextTick(function() {
        // check if the user is already logged in
        if (!req.user) {
          User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
          if (err)
            return done(err);
          if (user) {
            // if there is a user id already but no token (user was linked at one point and then removed)
            if (!user.facebook.token) {
              user.facebook.token = token;
              user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
              user.facebook.email = profile.emails[0].value;
              user.save(function(err) {
              if (err)
                throw err;
              return done(null, user);
              });
            }
            return done(null, user);
          } else {
            // if there is no user, create them
            var newUser = new User();
            newUser.facebook.id = profile.id;
            newUser.facebook.token = token;
            newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
            newUser.facebook.email = profile.emails[0].value;
            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
        } else {
          // user already exists and is logged in, we have to link accounts
          var user = req.user; 
          user.facebook.id    = profile.id;
          user.facebook.token = token;
          user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
          user.facebook.email = profile.emails[0].value;
          user.save(function(err) {
            if (err)
              throw err;
            return done(null, user);
          });
        }
      });
  }));

};
