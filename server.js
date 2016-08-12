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
    console.log("database barlist to send");
    
    // Connexion à Mongodb, docs = la database récupérée //
    db.barlist.find(function(err,docs){
        
        // Envoi de la database au controleur //
        res.json(docs);
        // Contrôle //
        console.log("database barlist sent");
    });
});

// Récupération de la database drinklist //
app.get('/drinklist', function(req,res) {
    // Contrôle //
    console.log("database drinklist to send");
    
    // Connexion à Mongodb, docs = la database récupérée //
    db.drinklist.find(function(err,docs){
        
        // Envoi de la database au controleur //
        res.json(docs);
        // Contrôle //
        console.log("database drinklist sent");        
    });
});

// Récupération de la database orderlist //
app.get('/orderlist', function(req,res) {
    // Contrôle //
    console.log("database orderlist to send");
    
    // Connexion à Mongodb, docs = la database récupérée //
    db.orderlist.find(function(err,docs){
        
        // Envoi de la database au controleur //
        res.json(docs);
        // Contrôle //
        console.log("database orderlist sent");        
    });
});

// Passage d'une commande //
app.post('/barlist', function(req,res) {
    
    var id = req.body.toString();
    // Contrôle //
    console.log("command id: " + id + " to send to barlist");
    
    // Extraction de la commande à partir de l'id //
    db.drinklist.findOne({_id: mongojs.ObjectId(id)}, function (err, docDrink) {
        // Contrôle //
        console.log("command " + JSON.stringify(docDrink.name + " to send to barlist"));
        
        // Génération Numéro de Commande//
        var numero = Math.floor((Math.random()*1000));
        
        // Envoi de la Commande à barlist et orderlist//
        var commandeBar = {number: numero, drinks: docDrink.name, state: "En attente"};
        var commandeOrder = commandeBar;
        
        db.barlist.insert(commandeBar, function(err,doc) {
            // Contrôle //
            console.log("command id: " + id + " sent to barlist");
            res.json(doc);
        });
        db.orderlist.insert(commandeOrder, function(err,doc) {
            // Contrôle //
            console.log("command id: " + id + " sent to orderlist");
            res.json(doc);
        });
        
    });    
});

// Commande prête coté bar //
app.put('/barlist/:id', function(req,res) {
    
    var id = req.params.id;
    // Contrôle //
    console.log("command id:" + id + " to update in barlist");
    
    // Modification de l'état de la commande
    db.barlist.findAndModify({
        query: {_id: mongojs.ObjectId(id)}, 
        update: {$set: {state: "C'est Prêt"}},
        new: true
    }, function(err, doc) {
        res.json(doc);        
        // Contrôle //
        console.log("command #" + doc.number + " updated in barlist");
    });
});

// Commande prête coté client //
app.put('/orderlist/:id', function(req,res) {
    
    var number = req.body.number;
    // Contrôle //
    console.log("command #" + number + " to update in orderlist");

    // Modification de l'état de la commande
    db.orderlist.findAndModify({
        query: {number: number}, 
        update: {$set: {state: "C'est Prêt"}},
        new: true
    }, function(err, doc) {
        res.json(doc);        
        // Contrôle //
        console.log("command #" + number + " updated in orderlist");
    });    
});

// Terminer une commande coté Bar //
app.delete('/barlist/:id', function(req,res) {
    
    var id = req.params.id;
    // Contrôle //
    console.log("command id: " + id + " to delete");
    
    db.barlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
        // Contrôle //
        console.log("command id: " + id + " deleted")
    });
});

// Terminer une commande coté Client //
app.delete('/orderlist/:id', function(req,res) {
    
    var id = req.params.id;
    // Contrôle //
    console.log("command #" + id + " to delete");
    
    db.orderlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
        // Contrôle //
        console.log("command id: " + id + " deleted")        
    });
});

// Port du serveur //
app.listen(3000);

// Contrôle //
console.log("server running on port 3000");

