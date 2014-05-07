define(['angular'], function(angular) {
	'use strict';

	/* Services */

	// Demonstrate how to register services
	// In this case it is a simple value service.
	angular.module('myApp.services', ['ngResource'])
		.factory('dataService', function($resource) {
			return $resource('/test-classes-moyennes-app/data/data.json?1399018451225', {}, {
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
			configService.share_email_subject = 'Le Parisien Magazine - Faites-vous partie des classes moyennes ';
			configService.share_email_content = configService.share_text + "\n\n" + configService.share_url;

			return configService;
		});

});