var env = require('node-env-file');
env(__dirname + '/.env');

module.exports = {
  database: process.env.DATABASE_URL
};
