function AppCtrl($scope, $http) {
    
    // Contrôle //
    console.log("Controller AppCtrl connected to the view");
    
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
    $scope.orderlist = orderlist;
};