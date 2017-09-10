var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/login", {
        templateUrl : "src/app/pages/login/login.html",
        controller : "loginController"
    })
    .when("/signup", {
        templateUrl : "src/app/pages/signup/signin.html",
        controller : "signinController"
    })
    .when("/menu", {
        controller : "menuController",
        templateUrl : "src/app/pages/menu/menu.html"
    });
});