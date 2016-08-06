// Dépendances //
var express=require('express');
var app = express();

var mongojs=require('mongojs');
var db=mongojs('orderlist', ['orderlist','drinklist']);

var bodyParser=require('body-parser');

var request = require('request');

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

// Envoi de la commande à orderlist //
app.post('/orderlist', function(req,res) {
    // Contrôle //
    console.log("Arrivée dans le serveur de l'id " + req.body)
    // Extraction de la commande à partir de l'id //
    var id = req.body;
    var order = db.drinklist.find({_id: mongojs.ObjectId(id)})
    // Contrôle //
    console.log("valeur de la variables id: " + id + ", et de order: " + order)
    // Envoi à orderlist//
    db.orderlist.insert(order, function(err, doc) {
        res.json(doc);
    })
});

// Port du serveur //
app.listen(3000);

// Contrôle //
console.log("Server running on port 3000");