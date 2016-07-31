function AppCtrl($scope, $http) {
    
    // Contrôle //
    console.log("Controller AppCtrl connected to the view");
     
    // Récupération de la database //
    $http.get('/orderlist').success(function(response) { 
        // Contrôle //
        console.log("Controller AppCtrl correctly received the database from the server");
        $scope.orderlist = response;
    
    });
};