/* global define */
/* global ga */
"use strict";

define([], function() {
	return ['$scope', '$rootScope', '$location', '$route', 'dataService', function($scope, $rootScope, $location, $route, dataService) {
		// You can access the scope of the controller from here

		jQuery('.methodo, .bt-go--ok').find('a').unbind('click').on('click', function(event) {
			jQuery('#methodo').slideToggle('normal');
			event.preventDefault();
		});

	}];
});