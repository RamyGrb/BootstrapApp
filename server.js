// Dépendances //
var express=require('express');
var app = express();

var mongojs=require('mongojs');
var db=mongojs('orderbase', ['orderlist','drinklist']);

var bodyParser=require('body-parser');

// Liaison entre le serveur et l'app //
app.use(express.static(__dirname + "/public"));

// Parse des requêtes, nécessaire pour les requêtes POST //
app.use(bodyParser.json());

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
app.post("/orderlist", function(req,res) {
    // Contrôle //
    console.log("Arrivée dans le serveur de l'id " + req.body.toString() );

    // Extraction de la commande à partir de l'id //
    var id = req.body.toString();
    
    db.drinklist.find({ _id: mongojs.ObjectId(id) }, function (err, doc) {
        // Contrôle //
        console.log("La commande à envoyer sur orderlist est: " + doc);
        // CA RENVOIE UN OBJET NUL. JE PENSE QUE C'EST PARCE QUE L'ID NE MATCHE PAS AVEC UN ID DE LA BDD. A VOIR POURQUOI //

        // Envoi à orderlist//
        db.orderlist.insert(docDrink, function(err, docOrder) {
            res.json(docOrder);
        });
    });    
});

// Port du serveur //
app.listen(3000);

// Contrôle //
console.log("Server running on port 3000");

