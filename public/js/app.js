// Configuration des routes du one pager //

var BillyApp = angular.module('BillyApp', ['ngRoute']);
    
 BillyApp.config(['$routeProvider', function($routeProvider) {
        
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