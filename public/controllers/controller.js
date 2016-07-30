function AppCtrl($scope, $http) {
    
    // Contrôle //
    console.log("Controller AppCtrl connected to the view");
     
    // Récupération de la database //
    $http.get('/orderlist').success(function(response) { 
        // Contrôle //
        console.log("Le controlleur AppCtrl a bien reçu la database du serveur");
        $scope.orderlist = response;
    
    });
};