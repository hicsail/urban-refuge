var config        = require("./config");
var passport      = require("passport");
var Auth0Strategy = require('passport-auth0');

// Configure Passport to use Auth0
console.log(config.AUTH0_DOMAIN);
var strategy = new Auth0Strategy({
    domain:       config.domain,
    clientID:     config.clientID,
    clientSecret: config.clientSecret,
    callbackURL:  config.callbackURL
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
