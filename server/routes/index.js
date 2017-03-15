var express = require('express');
var passport = require('passport');
var router = express.Router();
let config = require('../config/config');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
let User = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('home.hbs', {
    title: 'Home',
    user: req.user
  });
});

router.get('/401', function(req, res, next) {
  res.render('401.hbs', {
    title: 'Access Denied',
    user: req.user
  });
});

router.get('/login', function(req, res, next) {
  res.redirect('/auth/windowslive');
});

router.get('/auth/windowslive',
  passport.authenticate('windowslive', { scope: ['wl.signin', 'wl.emails'] }));


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/auth/windowslive/callback',
  passport.authenticate('windowslive', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    User.vaildUser(req.user.emails[0].value).then((vaild) => {
      if (vaild) {
        res.redirect(req.session.returnTo || '/resources/index');
      } else {
        req.logout();
        res.redirect('/401');
      }
    });
  });


module.exports = router;
