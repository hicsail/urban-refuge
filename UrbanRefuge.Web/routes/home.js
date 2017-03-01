exports.index = function(req, res) {
  res.render('home.hbs', {
    title: 'Home'
  });
};
