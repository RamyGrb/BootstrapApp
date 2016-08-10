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

// Récupération de la database barlist //
app.get('/barlist', function(req,res) {
    // Contrôle //
    console.log("Server GET barlist request");
    
    // Connexion à Mongodb, docs = la database récupérée //
    db.barlist.find(function(err,docs){
        // Contrôle //
        console.log("Database barlist sent to the controller");
        
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

// Passage d'une commande //
app.post('/barlist', function(req,res) {
    // Contrôle //
    console.log("Reception of id: " + req.body.toString() );
    
    // Extraction de la commande à partir de l'id //
    var id = req.body.toString();
    db.drinklist.findOne({_id: mongojs.ObjectId(id)}, function (err, docDrink) {
        // Contrôle //
        console.log("Sending the order: " + JSON.stringify(docDrink.name));
        
        // Génération Numéro de Commande//
        var numero = Math.floor((Math.random()*1000));
        
        // Envoi de la Commande à barlist et orderlist//
        var commandeBar = {number: numero, drinks: docDrink.name};
        var commandeOrder = {number: numero, drinks: docDrink.name, state: "En attente"};
        
        db.barlist.insert(commandeBar, function(err,doc) {
            // Contrôle //
            console.log("the drink is sent to barlist");
        });
        db.orderlist.insert(commandeOrder, function(err,doc) {
            // Contrôle //
            console.log("the drink is sent to orderlist");
        });
        
    });    
});

// Port du serveur //
app.listen(3000);

// Contrôle //
console.log("Server running on port 3000");

