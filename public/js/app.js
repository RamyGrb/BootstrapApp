// Configuration des routes du one pager //

var billyapp = angular.module('billyapp', ['ngRoute']);
    
 billyapp.config(['$routeProvider', function($routeProvider) {
        
     $routeProvider

         .when('/', {
                templateUrl : '../views/acceuil.html',
                controller  : 'AcceuilCtrl'
            })

         .when('/bar', {
                templateUrl : '../views/bar.html',
                controller  : 'BarCtrl'
            })
     
         .when('/client', {
                templateUrl : '../views/client.html',
                controller  : 'ClientCtrl'
            })
     
         .otherwise({
            redirectTo: '../acceuil'
            });

     
 }]);