'use strict';

let passport = require('passport');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  /*
  db.User.findById(id).then(function(user) {
    done(null, user);
  }).catch(function(error) {
    done(error);
  });
  */
});


/**
 * Login Required middleware.
 */
exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = function(req, res, next) {
  let provider = req.path.split('/').slice(-1)[0];

  if (req.user.tokens[provider]) {
    next();
  } else {
    res.redirect('/auth/' + provider);
  }
};
