/* global require */
/* global angular */

require.config({
	urlArgs: "bust=" + 'CACHE_BUST',
	paths: {
		angular: '/app/vendor/angular/angular',
		angularRoute: '/app/vendor/angular-route/angular-route',
		angularSanitize: '/app/vendor/angular-sanitize/angular-sanitize',
		angularResource: '/app/vendor/angular-resource/angular-resource',
		// angularAnimate: '/app/vendor/angular-animate/angular-animate',
		angularMocks: '/app/vendor/angular-mocks/angular-mocks',
		text: '/app/vendor/requirejs-text/text',
		rrssb: '/app/vendor/RRSSB/js/rrssb'
	},
	shim: {
		'angular': {
			'exports': 'angular'
		},
		'angularRoute': ['angular'],
		'angularSanitize': ['angular'],
		'angularResource': ['angular'],
		// 'angularAnimate': ['angular'],
		'angularMocks': {
			deps: ['angular'],
			'exports': 'angular.mock'
		}
	},
	priority: [
		"angular"
	]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require([
	'angular',
	'app',
	'routes'
], function(angular, app, routes) {
	'use strict';
	var $html = angular.element(document.getElementsByTagName('html')[0]);

	angular.element().ready(function() {
		angular.resumeBootstrap([app['name']]);
	});
});