// Dépendances //
var express=require('express');
var app = express();

var mongojs=require('mongojs');
var db=mongojs('orderlist', ['orderlist','drinklist']);

var bodyParser=require('body-parser');

var mongoose = require('mongoose');

// Liaison entre le serveur et l'app //
app.use(express.static(__dirname + "/public"));

// Récupération de la database orderlist //
app.get('/orderlist', function(req,res) {
    
    // Contrôle //
    console.log("Server GET orderlist request");
    
    // Connexion à Mongodb, docs = la database récupérée //
    db.orderlist.find(function(err,docs){
       
        // Contrôle //
        console.log("Database orderlist sent to the controller");
        
        // Envoi de la database au controleur //
        res.json(docs);
    });
});

// Récupération de la database drinklist //
app.get('/drinklist', function(req,res) {
    
    // Contrôle //
    console.log("Server GET drinklist request");
    
    // Connexion à Mongodb, docs = la database récupérée //
    db.drinklist.find(function(err,docs){
       
        // Contrôle //
        console.log("Database drinklist sent to the controller");
        
        // Envoi de la database au controleur //
        res.json(docs);
    });
});

// Port du serveur //
app.listen(3000);

// Contrôle //
console.log("Server running on port 3000");