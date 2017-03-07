var env = require('node-env-file');
env(__dirname + '/.env');

module.exports = {
  database:     process.env.DATABASE_URL,
  domain:       process.env.AUTH0_DOMAIN,
  clientID:     process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL:  process.env.AUTH0_CALLBACK_URL
};
