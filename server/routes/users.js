let User = require('../models/user');
var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

router.get('/index', ensureLoggedIn, function(req, res, next) {
  User.findAll().then((users) => {
    res.render('users/index.hbs', {
      title: 'Emails',
      users: users,
      user: req.user
    });
  });
});

router.get('/create', ensureLoggedIn, function(req, res, next) {
  res.render('users/create.hbs', {
    title: 'Create Login',
    user: req.user
  });
});

router.post('/create', ensureLoggedIn, function(req, res, next) {
  if(req.body == undefined){
    return res.redirect('/users/create');
  } else {
    User.create(req.body).then(() => {
      return res.redirect('/users/index');
    });
  }
});

router.post('/delete', ensureLoggedIn, function(req, res, next) {
  if(req.body == undefined){
    return res.redirect('/users/index');
  } else {
    User.delete(req.body.email).then(() => {
      return res.redirect('/users/index');
    });
  }
});

module.exports = router;
