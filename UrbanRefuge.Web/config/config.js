var env = require('node-env-file');
env(__dirname + '/.env');

module.exports = {
  database:     process.env.DATABASE_URL,
  clientID:     process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL:  process.env.AUTH0_CALLBACK_URL,
  rootEmail:    process.env.ROOT_EMAIL
};
