let express = require('express');
let app = express();
let passport = require('passport');
let hbs = require('hbs');
let session = require('express-session');
let flash = require('express-flash');
let bodyParser = require('body-parser')

/* routes */
let home = require('./routes/home')
let users = require('./routes/users');
let resources = require('./routes/resources');

/* initialize express */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

/* initialize passport */
let passportConf = require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

/* initialize handlebars */
app.set('view engine', 'hbs');
app.set('views', __dirname+'/views');
hbs.registerPartials(__dirname + '/views/partials');

/* routes */
app.get('/', home.index);
app.get('/resources/index', resources.getIndex);
app.get('/resources/create', resources.getCreate);
app.post('/resources/create', resources.postCreate);
app.get('/resources/view', resources.view);
app.get('/resources/edit', resources.edit);

app.listen(3000, function () {
  console.log('Urban Refuge is listening on port 3000');
});
