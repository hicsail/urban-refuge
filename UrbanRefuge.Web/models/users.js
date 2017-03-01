'use strict';
let config = require('../config/config');
let knex = require('knex')(config.database);
let bookshelf = require('bookshelf')(knex);

let User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true
});

module.exports = {
	User: User
};
