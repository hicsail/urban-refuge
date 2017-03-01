exports.create = function(req, res) {
  res.render('resources/create.hbs', {
    title: 'Create Resources',
    types: ['Health','Education','Food']
  });
};
