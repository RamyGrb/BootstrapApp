var BillyApp = angular.module('BillyApp', ['ui.router']);
var HomeApp = angular.module('HomeApp', ['ui.router']);

BillyApp.config(function($stateProvider, $urlRouterProvider) {

    // Indique ce qu'on fait en cas de route connue/inconnue //
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise("/error");

    $stateProvider

        .state('splash', {
            url: "/",
            templateUrl: "../views/splash.html",
        })

        .state('login', {
            url: "/login",
            templateUrl: "../views/login.html",
        })

        .state('signup', {
            url: "/signup",
            templateUrl: "../views/signup.html",
        })    

        .state('error', {
            url: "/error",
            templateUrl: "../views/error.html",
        })    
});

HomeApp.config(function($stateProvider, $urlRouterProvider) {

    // Indique ce qu'on fait en cas de route connue/inconnue //
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise("/error");
    
    $stateProvider
    
        .state('accueil', {
            url: "/",
            templateUrl: "../views/accueil.html",
        })
    
        .state('bar', {
            url: "/bar",
            templateUrl: "../views/bar.html",
            controller: "BarCtrl"        
        })
    
        .state('client', {
            url: "/client",
            templateUrl: "../views/client.html",
            controller: "ClientCtrl"
        })
    
        .state('account', {
            url: "/account",
            templateUrl: "../views/account.html",
            controller: "AccountCtrl"
        })
        
        .state('error', {
            url: "/error",
            templateUrl: "../views/error.html",
        })        
});