define([
	'angular',
	'filters',
	'services',
	'directives',
	'controllers',
	'angularRoute',
	'angularResource',
	'angularSanitize',
	'jquery'
	// 'angularAnimate',
], function(angular, filters, services, directives, controllers) {
	'use strict';

	// Declare app level module which depends on filters, and services

	return angular.module('myApp', [
		'ngRoute',
		'ngResource',
		'ngSanitize',
		// 'ngAnimate',
		'myApp.controllers',
		'myApp.filters',
		'myApp.services',
		'myApp.directives'
	]);
});