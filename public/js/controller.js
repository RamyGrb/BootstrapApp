// Main Contrôleur de l'Application //
function AppCtrl($scope, $http) {
    // Contrôle //
    console.log("Controller AppCtrl connected to the app");
};

// Contrôleur de l'Acceuil //
function AcceuilCtrl($scope, $http) {
    
    // Contrôle //
    console.log("Controller AcceuilCtrl connected to the view Acceuil");
};

// Contrôleur de la vue Bar //
function BarCtrl($scope, $http) {
    
    // Contrôle //
    console.log("Controller BarCtrl connected to the view Bar");
     
    // Récupération de la database des commandes //
    $http.get('/barlist').success(function(response) { 
        // Contrôle //
        console.log("Controller BarCtrl received the order database from the server");
        // Envoi //
        $scope.barlist = response;
    
    });
    
    // Envoyer une Commande //
    $scope.readyOrder = function(number) {
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

// Contrôleur de la vue Client //
function ClientCtrl($scope, $http) {
    // Contrôle //
    console.log("Controller ClientCtrl connected to the view Client");
    
    // Récupération de la database des commandes //
    $http.get('/barlist').success(function(res) {
        // Contrôle //
        console.log("Controller ClientCtrl received barlist from the server");
        
        // Envoi //
        $scope.barlist = res;
    });
    
    // Récupération de la database des boissons //
    $http.get('/drinklist').success(function(res) {
        // Contrôle //
        console.log("Controller ClientCtrl received drinklist from the server");
        
        // Envoi //
        $scope.drinklist = res;
    });
    
    // Récupération de la database des commandes cliennt //
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
    
    // Terminer une Commande //
    $scope.endOrder = function(id) {
        console.log(id);
        // Envoi de l'id //
        $http.delete('/orderlist/' + id).success(function(res) {
            // Contrôle //
            console.log("command #" + id + "has ended");
        });
    };
};