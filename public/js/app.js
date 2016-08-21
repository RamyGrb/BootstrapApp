var BillyApp = angular.module('BillyApp', ['ui.router']);

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

        .state('home', {
            url: "/home",
            templateUrl: "../views/home.html",
        })
    
        .state('home.accueil', {
            url: "/accueil",
            templateUrl: "../views/accueil.html",
            controller: "AccueilCtrl"        
        })
    
        .state('home.bar', {
            url: "/bar",
            templateUrl: "../views/bar.html",
            controller: "BarCtrl"        
        })
    
        .state('home.client', {
            url: "/client",
            templateUrl: "../views/client.html",
            controller: "ClientCtrl"
        })
    
        .state('home.account', {
            url: "/account",
            templateUrl: "../views/account.html",
            controller: "AccountCtrl"
        })    

        .state('error', {
            url: "/error",
            templateUrl: "../views/error.html",
        })
    
    
});