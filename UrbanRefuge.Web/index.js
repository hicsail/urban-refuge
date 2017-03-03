let express = require('express');
let app = express();
let passport = require('passport');
let hbs = require('hbs');
let session = require('express-session');
let flash = require('express-flash');
let bodyParser = require('body-parser');

/* routes */
let home = require('./routes/home');
let users = require('./routes/users');
let resources = require('./routes/resources');

/* initialize express */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(flash());

/* initialize passport
let passportConf = require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());
*/

/* initialize handlebars */
app.set('view engine', 'hbs');
app.set('views', __dirname+'/views');
hbs.registerPartials(__dirname + '/views/partials');

/* routes */
app.get('/', home.index);
app.get('/resources/index', resources.getIndex);
app.post('/resources/index', resources.postIndex);
app.get('/resources/create', resources.getCreate);
app.post('/resources/create', resources.postCreate);
app.post('/resources/view', resources.postView);
app.post('/resources/edit', resources.postEdit);
app.post('/resources/update', resources.Edit);

app.listen(3000, function () {
  console.log('Urban Refuge is listening on port 3000');
});
