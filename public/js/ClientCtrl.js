// Contrôleur de la vue Client //
function ClientCtrl($scope, $http) {
    // Contrôle //
    console.log("Controller ClientCtrl connected to the view Client");
    
    // Récupération de la database des boissons //
    $http.get('/drinklist').success(function(res) {
        // Contrôle //
        console.log("Controller ClientCtrl received drinklist from the server");
        
        // Envoi //
        $scope.drinklist = res;
    });
    
    // Récupération de la database des commandes client //
    $http.get('/orderlist').success(function(res) {
        // Contrôle //
        console.log("Controller ClientCtrl received orderlist from the server");
        
        // Envoi //
        $scope.orderlist = res;
    });    
    
    // Envoi de la commande à la database barlist du bar //
    $scope.addOrder = function(id) {
        
        // Envoi de l'id //
        var idJSON = [id];
        $http.post('/barlist',idJSON).success(function(res) {
            // Contrôle //
            console.log("command (id: " + idJSON + ") registered");
        });
    };
    
    // Etat bouton Terminer //
    $scope.orderState = function(id) {
        
        // Créations de variables pour simplifier l'écriture //
        var drinklist = $scope.drinklist ;
        var length = drinklist.length ;
        var idOrder, idState, idId ;
        
        // On parcours la bdd pour trouver l'élément correspondant à la commande //
        for (var i=0; i < length; i++) {
        
            // Définition des variables pour simplifier l'écriture //
            idOrder = drinklist[i] ;
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
        console.log("ending the order #" + id);
        // Envoi de l'id //
        $http.delete('/orderlist/' + id).success(function(res) {
            // Contrôle //
            console.log("command #" + id + "has ended");
        });
    };
};