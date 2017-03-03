let Resource = require('../models/resource');

exports.getIndex = function(req, res) {
  Resource.findAll().then((resources) => {
    res.render('resources/index.hbs', {
      title: 'Resources',
      resources: resources
    });
  });
};

exports.postIndex = function(req, res) {
  if(req.body == undefined) {
    req.flash('error','Please select resource');
    return res.redirect('/resources/index');
  } else {

  }
};

exports.getCreate = function(req, res) {
  res.render('resources/create.hbs', {
    title: 'Create Resources',
    types: ['Health','Education','Food']
  });
};

exports.postCreate = function(req, res) {
  if(req.body == undefined){
    req.flash('error','Please enter in all fields');
    return res.redirect('/resources/create');
  } else {
    Resource.create(req.body).then(() => {
      req.flash('success','Resource Added');
      return res.redirect('/resources/index');
    });
  }
};

exports.postView = function(req, res) {
  if(req.body == undefined){
    req.flash('error','Please select a resource');
    return res.redirect('/resources/index');
  } else {
    Resource.findById(req.body.resource).then((resource) => {
      if(resource.dataValues) {
        res.render('resources/view.hbs', {
            title: 'View Resources',
            resource: resource.dataValues
        });
      }
    });
  }
};

exports.postEdit = function(req, res) {
  if(req.body == undefined){
    req.flash('error','Please select a resource');
    return res.redirect('/resources/index');
  } else {
    Resource.findById(req.body.resource).then((resource) => {
      if(resource.dataValues) {
        res.render('resources/edit.hbs', {
            title: 'Edit Resources',
            resource: resource.dataValues,
            types: ['Health','Education','Food']
        });
      }
    });
  }
}

exports.Edit = function(req, res) {
  if(req.body == undefined){
    req.flash('error','Please enter all resource fields');
    return res.redirect('/resources/edit');
  } else {
    Resource.update(req.body).then(() => {
      req.flash('sucesss','Resource Updated');
      return res.redirect('/resources/index');
    });
  }
};
