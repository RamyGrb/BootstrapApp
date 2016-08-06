function AppCtrl($scope, $http, $location) {
    
    // Contrôle //
    console.log("Controller AppCtrl connected to the view");
};

function AcceuilCtrl($scope, $http, $location) {
    
    // Contrôle //
    console.log("Controller AcceuilCtrl connected to the view");
};

function BarCtrl($scope, $http, $location) {
    
    // Contrôle //
    console.log("Controller BarCtrl connected to the view");
     
    // Récupération de la database des commandes //
    $http.get('/orderlist').success(function(response) { 
        // Contrôle //
        console.log("Controller BarCtrl received the order database from the server");
        $scope.orderlist = response;
    
    });
};

function ClientCtrl($scope, $http) {
    
    // Contrôle //
    console.log("Controller ClientCtrl connected to the view");
    
    // Récupération de la database des cocktails //
    $http.get('/drinklist').success(function(response) {
        // Contrôle //
        console.log("Controller ClientCtrl received the drink database from the server");
        $scope.drinklist = response;
    });
    
    // Récupération de la database des commandes //
    $http.get('/orderlist').success(function(response) {
        // Contrôle //
        console.log("Controller ClientCtrl received the order database from the server");
        $scope.orderlist = response;
    });
};