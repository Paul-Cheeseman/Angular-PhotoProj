angular.module('PhotoApp', ['ngRoute', 'RouteControllers', 'UserStoreService']);

angular.module('PhotoApp').config(function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true); //Enable href routing without hashes

	$routeProvider.when('/', {
		templateUrl: 'templates/home.html',
		controller: 'HomeController'
	})
	.when('/accounts/register', {
		templateUrl: 'templates/register.html',
		controller: 'RegisterController'
	});
});