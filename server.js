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

// Parse des requêtes, nécessaire pour les requêtes POST //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Envoyer toutes les requêtes vers la console pour Contrôle //
app.use(morgan('dev'));

// Port du serveur //
var port = Number(process.env.PORT || 3000);
app.listen(port);
// Contrôle //
console.log("server running on port 3000");

/////////////// AUTHENTIFICATION //////////////////

// Lire les cookies pour l'authentification //
app.use(cookieParser());

// Connexion à la bdd sur Mlab //
configDB = module.exports = { 'url' : 'mongodb://billyheroku:billy2016@ds161175.mlab.com:61175/heroku_zphjqtfx' };
mongoose.connect(configDB.url);

// Initialisation de Passport //
require('./public/config/passport')(passport);
app.use(session({ secret: 'Billy2016' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Lignes nécessaires pour faire fonctionner le routage serveur //
app.set('views', __dirname + 'public/views');
app.set('view engine', 'ejs');

require('./public/config/routes-authentification')(app, passport);

/////////////// DATABASE REQUESTS //////////////////

// Indiquer que nos fichiers se trouvent dans /public //
app.use(express.static(__dirname + "/public"));

// Connexion à la bdd sur MLab //
var db = mongojs('billyheroku:billy2016@ds161175.mlab.com:61175/heroku_zphjqtfx?authMechanism=SCRAM-SHA-1', ['barlist','drinklist','orderlist']);

require('./public/config/routes-database')(app, db);