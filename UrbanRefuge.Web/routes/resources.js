let Resource = require('../models/resource');

exports.getIndex = function(req, res) {
  Resource.findAll().then((resources) => {
    res.render('resources/index.hbs', {
      title: 'Resources',
      resources: resources
    });
  });
};

exports.getCreate = function(req, res) {
  res.render('resources/create.hbs', {
    title: 'Create Resources',
    types: ['Health','Education','Food']
  });
};

exports.postCreate = function(req, res) {
  if(req.body == undefined){
    req.flash('errors',{ msg: 'Please Enter in Fields'});
    return res.redirect('/resources/create');
  } else {
    Resource.create(req.body).then(() => {
      req.flash('sucesss',{ msg: 'Resource Added'});
      return res.redirect('/resources/index');
    });
  }
};


exports.view = function(req, res) {
  res.render('resources/view.hbs', {
    title: 'View Resources',
    resource: {
      name: "test",
      ariabicName: "اختبار",
      latitude: 31.7213531,
      longitude: 35.6249074,
      primaryType: "Health",
      types: "Health, Food",
      address: "The Jordan Museum, Ali Ben Abi Taleb St. 10, Amman 11183, Jordan",
      ariabicAddress: "متحف الأردن، علي بن أبي طالب سانت 10، عمان 11183، الأردن",
      phone: "+962 6 462 9317",
      notes: "cool place",
      ariabicNotes: "مكان بارد"
    }
  });
};

exports.edit = function(req, res) {
  res.render('resources/edit.hbs', {
    title: 'Edit Resources',
    resource: {
      name: "test",
      ariabicName: "اختبار",
      latitude: 31.7213531,
      longitude: 35.6249074,
      primaryType: "Health",
      types: "Health, Food",
      address: "The Jordan Museum, Ali Ben Abi Taleb St. 10, Amman 11183, Jordan",
      ariabicAddress: "متحف الأردن، علي بن أبي طالب سانت 10، عمان 11183، الأردن",
      phone: "+962 6 462 9317",
      notes: "cool place",
      ariabicNotes: "مكان بارد"
    },
    types: ['Health','Education','Food']
  });
};
