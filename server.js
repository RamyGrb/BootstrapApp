// Dépendances //
var express=require('express');
var app = express();

var mongojs=require('mongojs');
var db=mongojs('contactlist', ['contactlist']);

var bodyParser=require('body-parser');

// Liaison entre le serveur et l'app //
app.use(express.static(__dirname + "/public"));

// Récupération de la database //
app.get('/orderlist', function(req,res) {
    
    // Contrôle //
    console.log("La database du serveur a été envoyée au controlleur AppCtrl");
    
    order1 = {
        number : '#534',
        drinks : '1 Amine Mojito'
    };
    
    order2 = {
        number : '#681',
        drinks : '2 Vodkaaris'
    };
    
    order3 = {
        number : '#280',
        drinks : '1 Smirohff'
    };
    
    var orderlist = [order1, order2, order3];
    
    res.json(orderlist);
});

// Port du serveur //
app.listen(3000);

// Contrôle //
console.log("Server running on port 3000");