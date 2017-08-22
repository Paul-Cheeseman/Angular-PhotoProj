angular.module('PhotoApp', ['ngRoute', 'RouteControllers', 'UserStoreService', 'ngMap']);

angular.module('PhotoApp').config(function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true); //Enable href routing without hashes

	$routeProvider.when('/', {
		templateUrl: 'templates/home.html',
		controller: 'HomeController'
	})
	.when('/profile', {
		templateUrl: 'templates/profile.html',
		controller: 'ProfileController'
	})

	.when('/contact', {
		templateUrl: 'templates/contact.html',
		controller: 'ContactController'
	})

	.when('/media', {
		templateUrl: 'templates/media.html',
		controller: 'MediaController'
	});	
});