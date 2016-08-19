var BillyApp = angular.module('BillyApp', ['ngRoute']);
    
 BillyApp.config(['$routeProvider', function($routeProvider) {
        
     $routeProvider

         .when('/', {
                templateUrl : '../views/accueil.html',
                controller  : 'AccueilCtrl'
            })
     
         .when('/login', {
                templateUrl : '../views/login.html',
                controller  : 'LoginCtrl'
            })     

         .when('/signup', {
                templateUrl : '../views/signup.html',
                controller  : 'SignupCtrl'
            })

         .when('/bar', {
                templateUrl : '../views/bar.html',
                controller  : 'BarCtrl'
            })
     
         .when('/client', {
                templateUrl : '../views/client.html',
                controller  : 'ClientCtrl'
            })  
     
         .when('/account', {
                templateUrl : '../views/account.html',
                controller  : 'AccountCtrl'
            }) 
     
         .otherwise({
            templateUrl: '../views/error.html'
            });
 }]);