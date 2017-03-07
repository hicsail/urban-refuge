let User = require('../models/user');
let config = require('../config/config');

exports.getLogin = function(req, res) {
  res.render('login.hbs', {
    domain: config.domain,
    clientID: config.clientID,
    callbackURL: config.callbackURL
  });
};

exports.logout = function(req, res) {
	req.logout();
  res.redirect('/');
};

exports.callback = function(req, res) {
	passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  };
};
