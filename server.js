// Dépendances //
var express=require('express');
var app = express();

var mongojs=require('mongojs');
var db=mongojs('orderlist', ['orderlist']);

var bodyParser=require('body-parser');

// Liaison entre le serveur et l'app //
app.use(express.static(__dirname + "/public"));

// Récupération de la database //
app.get('/orderlist', function(req,res) {
    
    // Contrôle //
    console.log("Server GET request sended to the controller");
    
    // Connexion à Mongodb, docs = la database récupérée //
    db.orderlist.find(function(err,docs){
       
        // Contrôle //
        console.log("Database sended to the controller");
        console.log(docs);
        
        // Envoi de la database au controleur //
        res.json(docs);
    });
});

// Port du serveur //
app.listen(3000);

// Contrôle //
console.log("Server running on port 3000");