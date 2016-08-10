// Main Contrôleur de l'Application //
function AppCtrl($scope, $http, $location) {
    // Contrôle //
    console.log("Controller AppCtrl connected to the view");
};

// Contrôleur de l'Acceuil //
function AcceuilCtrl($scope, $http, $location) {
    
    // Contrôle //
    console.log("Controller AcceuilCtrl connected to the view");
};

// Contrôleur de la vue Bar //
function BarCtrl($scope, $http, $location) {
    
    // Contrôle //
    console.log("Controller BarCtrl connected to the view");
     
    // Récupération de la database des commandes //
    $http.get('/orderlist').success(function(response) { 
        // Contrôle //
        console.log("Controller BarCtrl received the order database from the server");
        // Envoi //
        $scope.orderlist = response;
    
    });
};

// Contrôleur de la vue Client //
function ClientCtrl($scope, $http) {
    // Contrôle //
    console.log("Controller ClientCtrl connected to the view");
    
    // Récupération de la database des commandes //
    $http.get('/orderlist').success(function(res) {
        // Contrôle //
        console.log("Controller ClientCtrl received the order database from the server");
        
        // Envoi //
        $scope.orderlist = res;
    });
    
    // Récupération de la database des boissons //
    $http.get('/drinklist').success(function(res) {
        // Contrôle //
        console.log("Controller ClientCtrl received the drink database from the server");
        
        // Envoi //
        $scope.drinklist = res;
    });
    
    // Envoi de la commande à la database orderlist du bar //
    $scope.addOrder = function(id) {
        
        // Envoi de l'id //
        var idJSON = [id];
        $http.post('/orderlist',idJSON).success(function(res) {
            // Contrôle //
            console.log("La commande d'id" + idJSON + " a bien été enregistrée");
            
        });
    };
};