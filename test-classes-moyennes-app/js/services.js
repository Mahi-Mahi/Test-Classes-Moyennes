define(['angular'], function(angular) {
	'use strict';

	/* Services */

	// Demonstrate how to register services
	// In this case it is a simple value service.
	angular.module('myApp.services', [])
		.value('version', '0.1');

	angular.module('dataService', ['ngResource'])
		.factory('dataService', function($resource) {
			return $resource('/test-classes-moyennes-app/data/data.json?1398863447543', {}, {
				getData: {
					method: 'GET',
					isArray: false
				}
			});
		});

});