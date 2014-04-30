define(['angular'], function(angular) {
	'use strict';

	/* Services */

	// Demonstrate how to register services
	// In this case it is a simple value service.
	angular.module('myApp.services', ['ngResource'])
		.factory('dataService', function($resource) {
			return $resource('/app/data/data.json?CACHE_BUST', {}, {
				getData: {
					method: 'GET',
					isArray: false
				}
			});
		})
		.factory('configService', function() {

			var configService = {};

			configService.share_url = 'http://www.leparisienmagazine.fr/test-faites-vous-partie-des-classes-moyennes-111376/';
			configService.share_text = 'Faites-vous partie des classes moyennes ? Découvrez la réponse grâce au test du Parisien Magazine ! ';
			configService.share_status = 'Test : faites-vous partie des classes moyennes ? via @leparisienmag ';

			return configService;
		});

});