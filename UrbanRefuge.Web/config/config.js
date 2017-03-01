'use strict';

var env = require('node-env-file');
env(__dirname + '/.env');

module.exports = {
  database: {
    client: process.env.DATABASE_CLIENT,
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
        charset: 'utf8'
    }
  }
};
