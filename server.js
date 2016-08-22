// Dépendances //
var express = require('express');
var app = express();
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongojs = require('mongojs');
var mongoose = require('mongoose');
var mustache = require('mustache-express');

// Parse des requêtes, nécessaire pour les requêtes POST //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Indiquer que nos fichiers se trouvent dans /public //
app.use(express.static(__dirname + "/public"));

// Envoyer toutes les requêtes vers la console pour Contrôle //
app.use(morgan('dev'));

// Port du serveur //
var port = Number(process.env.PORT || 3000);
app.listen(port);
// Contrôle //
console.log("server running on port 3000");

/////////////// AUTHENTIFICATION //////////////////

// Connexion à la bdd sur Mlab //
mongoose.connect('mongodb://billyheroku:billy2016@ds161175.mlab.com:61175/heroku_zphjqtfx');

// Initialisation de Passport //
require('./public/config/passport')(passport);

app.use(cookieParser());
app.use(session({ 
    secret: 'Billy2016',
    resave: false,
    saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Rendu des .html: nécessaire pour les routes coté serveur //
app.engine('html', mustache());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/public/views');

require('./public/config/routes-authentification')(app, passport);

/////////////// DATABASE REQUESTS //////////////////

// Connexion à la bdd sur MLab - ici mongojs est plus facile que mongoose //
var db = mongojs('billyheroku:billy2016@ds161175.mlab.com:61175/heroku_zphjqtfx?authMechanism=SCRAM-SHA-1', ['barlist','drinklist','orderlist']);

require('./public/config/routes-database')(app, db);