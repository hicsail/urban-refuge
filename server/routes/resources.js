let Resource = require('../models/resource');
let Type = require('../models/type');
var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

router.get('/index', ensureLoggedIn, function(req, res, next) {
  Resource.findAll().then((resources) => {
    res.render('resources/index.hbs', {
      title: 'Resources',
      resources: resources,
      search: "",
      user: req.user
    });
  });
});

router.post('/index', ensureLoggedIn, function(req, res, next) {
  if(req.body == undefined) {
    return res.redirect('/resources/index');
  } else {
    Resource.filter(req.body.search).then((resources) => {
      res.render('resources/index.hbs', {
        title: 'Resources',
        resources: resources,
        search: req.body.search,
        user: req.user
      });
    });
  }
});

router.get('/create', ensureLoggedIn, function(req, res, next) {
  Type.findAll().then((types)=>{
    if(types) {
      res.render('resources/create.hbs', {
        title: 'Create Resources',
        types: types,
        user: req.user
      });
    }
  });
});

router.post('/create', ensureLoggedIn, function(req, res, next) {
  if(req.body == undefined){
    return res.redirect('/resources/create');
  } else {
    if(req.body.latitude == ''){
      req.body.latitude = 0;
    }
    if(req.body.longitude == ''){
      req.body.longitude = 0;
    }
    Resource.create(req.body).then(() => {
      return res.redirect('/resources/index');
    });
  }
});

router.post('/view', ensureLoggedIn, function(req, res, next) {
  if(req.body == undefined){
    return res.redirect('/resources/index');
  } else {
    Resource.findById(req.body.resource).then((resource) => {
      if(resource.dataValues) {
        res.render('resources/view.hbs', {
            title: 'View Resources',
            resource: resource.dataValues,
            user: req.user
        });
      }
    });
  }
});

router.post('/edit', ensureLoggedIn, function(req, res, next) {
  if(req.body == undefined){
    return res.redirect('/resources/index');
  } else {
    Resource.findById(req.body.resource).then((resource) => {
      if(resource.dataValues) {
        Type.findAll().then((types)=>{
          res.render('resources/edit.hbs', {
              title: 'Edit Resources',
              resource: resource.dataValues,
              types: types,
              user: req.user
          });
        });
      }
    });
  }
});

router.post('/delete', ensureLoggedIn, function(req, res, next) {
  if(req.body == undefined){
    return res.redirect('/resources/index');
  } else {
    Resource.delete(req.body.resource).then((resource) => {
      return res.redirect('/resources/index');
    });
  }
});

router.post('/update', ensureLoggedIn, function(req, res, next) {
  if(req.body == undefined){
    return res.redirect('/resources/edit');
  } else {
    Resource.update(req.body).then(() => {
      return res.redirect('/resources/index');
    });
  }
});

module.exports = router;
