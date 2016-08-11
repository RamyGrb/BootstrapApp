// Contrôleur de la vue Bar //
function BarCtrl($scope, $http) {
    // Contrôle //
    console.log("Controller BarCtrl connected to the view Bar");
     
    // Récupération de la database des commandes //
    $http.get('/barlist').success(function(res) { 
        // Contrôle //
        console.log("Controller BarCtrl received the order database from the server");
        
        // Envoi //
        $scope.barlist = res;
    });
    
    // Changement d'etat d'une commande à prêt//
    $scope.readyOrder = function(id) {};
    
    // Etat bouton Terminer //
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
            
            // Si c'est la bonne commande et que la commande est prête, on peut la terminer //
            if ( idStudy = id) {
                if ( idState = "Prêt" ) return true
                else return false
            }
        }
    };
    
    // Terminer une Commande //
    $scope.endOrder = function(id) {
        
        // Envoi de l'id //
        $http.delete('/barlist/'+id).success(function(res) {
            // Contrôle //
            console.log("command #" + id + "has ended");
        });
    };
};