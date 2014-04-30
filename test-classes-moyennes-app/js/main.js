/* global require */
/* global angular */

require.config({
	urlArgs: "bust=" + '1398865218192',
	paths: {
		angular: '/test-classes-moyennes-app/vendor/angular/angular',
		angularRoute: '/test-classes-moyennes-app/vendor/angular-route/angular-route',
		angularSanitize: '/test-classes-moyennes-app/vendor/angular-sanitize/angular-sanitize',
		angularResource: '/test-classes-moyennes-app/vendor/angular-resource/angular-resource',
		// angularAnimate: '/test-classes-moyennes-app/vendor/angular-animate/angular-animate',
		angularMocks: '/test-classes-moyennes-app/vendor/angular-mocks/angular-mocks',
		jquery: '/test-classes-moyennes-app/vendor/jquery/dist/jquery',
		text: '/test-classes-moyennes-app/vendor/requirejs-text/text'
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

	jQuery('.methodo, .bt-go--ok').find('a').on('click', function(event) {
		jQuery('#methodo').slideToggle('normal');
		event.preventDefault();
	});

});