/* global define */
/* global ga */
"use strict";

define([], function() {
	return ['$scope', '$rootScope', '$location', '$route', 'dataService', 'configService', function($scope, $rootScope, $location, $route, dataService, configService) {
		// You can access the scope of the controller from here

		jQuery('.icon-facebook').attr('href', "https://www.facebook.com/sharer/sharer.php?u=" + document.location.href + "&t=" + encodeURIComponent(configService.share_text + configService.share_url));
		jQuery('.icon-twitter').attr('href', "http://twitter.com/home?status=" + encodeURIComponent(configService.share_status + configService.share_url));
		jQuery('.icon-email').attr('href', "mailto:?subject=" + encodeURIComponent(configService.share_email_subject) + "&body=" + encodeURIComponent(configService.share_email_content));

		jQuery('.methodo, .bt-go--ok').find('a').unbind('click').on('click', function(event) {
			jQuery('#methodo').slideToggle('normal');
			event.preventDefault();
		});

	}];
});