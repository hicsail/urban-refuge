var express = require('express');
var app = express();
var passport = require('passport');
var WindowsLiveStrategy = require('passport-windowslive');
var hbs = require('hbs');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('./config/config');

/* routes */
var index = require('./routes/index');
var resources = require('./routes/resources');
var users = require('./routes/users');
var api = require('./routes/api');

/* initialize express */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'shhhhhhhhh',
  resave: true,
  saveUninitialized: true
}));
app.use(cookieParser());

/* initialize passport */

// Configure Passport to use Auth0
var strategy = new WindowsLiveStrategy({
    clientID:     config.clientID,
    clientSecret: config.clientSecret,
    callbackURL:  config.callbackURL
  }, function(accessToken, refreshToken, profile, done) {
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

app.use(passport.initialize());
app.use(passport.session());


/* initialize handlebars */
app.set('view engine', 'hbs');
app.set('views', __dirname+'/views');
hbs.registerPartials(__dirname + '/views/partials');

/* routes */
app.use('/', index);
app.use('/resources', resources);
app.use('/users', users);
app.use('/api', api);

app.listen(config.port, function () {
  console.log('Urban Refuge is listening on port',config.port);
});
