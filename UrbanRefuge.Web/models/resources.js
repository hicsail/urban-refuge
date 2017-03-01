'use strict';
let config = require('../config/config');
let knex = require('knex')(config.database);
let bookshelf = require('bookshelf')(knex);

let Resources = bookshelf.Model.extend({
  tableName: 'resources',
  hasTimestamps: true
});

module.exports = {
	Resources: Resources
};
