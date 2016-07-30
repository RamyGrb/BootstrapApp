// Dépendances //
var express=require('express');
var app = express();

var mongojs=require('mongojs');
var db=mongojs('contactlist', ['contactlist']);

var bodyParser=require('body-parser');

// Liaison entre le serveur et l'app //
app.use(express.static(__dirname + "/public"));

// Port du serveur //
app.listen(3000);

// Contrôle //
console.log("Server running on port 3000");