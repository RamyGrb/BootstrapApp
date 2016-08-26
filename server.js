// Dépendances //
var express=require('express');
var app = express();

var mongojs=require('mongojs');
var db=mongojs('orderbase', ['barlist','drinklist','orderlist']);

var bodyParser=require('body-parser');

// Liaison entre le serveur et l'app //
app.use(express.static(__dirname + "/public"));

// Parse des requêtes, nécessaire pour les requêtes POST //
app.use(bodyParser.json());

// Port du serveur //
var port = Number(process.env.PORT || 3000);
app.listen(port);
// Contrôle //
console.log("server running on port 3000");

// Routes pour commander //
require('./config/routes-order.js')(app, db);

