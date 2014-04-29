define(['angular'], function(angular) {
	'use strict';

	/* Services */

	// Demonstrate how to register services
	// In this case it is a simple value service.
	angular.module('myApp.services', [])
		.value('version', '0.1');

	angular.module('dataService', ['ngResource'])
		.factory('dataService', function($resource) {
			return $resource('/app/data/data.json?CACHE_BUST', {}, {
				getData: {
					method: 'GET',
					isArray: false
				}
			});
		});

});