// Contrôleur de la vue bar //
function BarCtrl($scope, $http) {
    // Contrôle //
    console.log("controller BarCtrl connected to the view Bar");
     
    // Récupération de la database des commandes //
    $http.get('/barlist').success(function(res) { 
        // Contrôle //
        console.log("Controller BarCtrl received the order database from the server");
        
        // Envoi //
        $scope.barlist = res;
    });
    
    // Changement d'etat d'une commande à prêt//
    $scope.readyOrder = function(id) {
        // Contrôle //
        console.log("command id: " + id + " to update");
        
        // Changemet dans barlist //
        $http.put('/barlist/'+id).success(function(res) {
            // Contrôle //
            console.log("command #" + res.number + " updated in barlist");
            
            // Changement dans orderlist //
            $http.put('/orderlist/'+id, res).success(function(res2) {
                // Contrôle //
                console.log("command #" + res2.number + " updated in orderlist");
            });
        });
    };
    
    // Etat bouton terminer //
    $scope.orderState = function(id) {
        
        // Créations de variables pour simplifier l'écriture //
        var barlist = $scope.barlist ;
        var length = barlist.length ;
        var idOrder, idState, idId ;
                
        // On parcours la bdd pour trouver l'élément correspondant à la commande //
        for (var i=0; i < length; i++) {
            
            // Définition des variables pour simplifier l'écriture //
            idOrder = barlist[i] ;
            idId = idOrder._id ;
            idState = idOrder.state ;
            console.log("On étudie l'id: " + id + " pour l'idID: " + idId);
            // Si c'est la bonne commande et que la commande est prête, on peut la terminer //
            if ( idId == id) {
                console.log("cet idId: " + idId + " " + idState + " corresponds à l'id: " + id);
                if ( idState = "C'est Prêt" ) return "true"
                else return "true"
            }
        }
    };
    
    // Terminer une commande //
    $scope.endOrder = function(id) {
        
        // Envoi de l'id //
        $http.delete('/barlist/'+id).success(function(res) {
            // Contrôle //
            console.log("command id: " + id + " ended");
        });
    };
};