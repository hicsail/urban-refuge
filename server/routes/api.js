var express = require('express');
var router = express.Router();
let Resource = require('../models/resource');

router.get('/resource/:type', function(req, res, next) {
  Resource.findByType(req.params.type).then((primary) => {
    let response = {};
    response.primary = primary;
    Resource.findByTypeSecondary(req.params.type).then((secondary) => {
      response.secondary = secondary;
      return res.send('<pre>' + JSON.stringify(response,undefined,2) + '</pre>');
    });
  });
});

module.exports = router;
