// Contrôleur de la vue Mon Compte //
function AccountCtrl($scope, $http) {
    // Contrôle //
    console.log("controller AccountCtrl connected to the app"); 

    $http.get('/api/user_data').success(function(res) {
        // Contrôle //
        console.log("controller HomeCtrl received the user data from the server");
        
        // Envoi //
        $scope.user = res.user;
    });     
};