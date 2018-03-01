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
	.when("/botanalyser", {
		controller : "botanalyserController",
		templateUrl : "src/app/pages/botanalyser/botanalyser.html"
	})
	.when("/test", {
		controller : "testController",
		templateUrl : "src/app/pages/test/test.html"
	})
	.when("/fpautomation", {
		controller : "fpautomationController",
		templateUrl : "src/app/pages/fpautomation/fpautomation.html" 
	});
});



	