define(['angular', 'app'], function(angular, app) {
	'use strict';

	app.config(['$locationProvider',
		function($locationProvider) {
			$locationProvider.html5Mode(true);
			$locationProvider.hashPrefix('!');
		}
	]);

	return app.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.when('/test-classes-moyennes-app/', {
				templateUrl: '/test-classes-moyennes-app/partials/home.html',
				controller: 'homeCtrl'
			});
			$routeProvider.when('/test-classes-moyennes-app/test', {
				templateUrl: '/test-classes-moyennes-app/partials/test.html',
				controller: 'testCtrl'
			});
			$routeProvider.when('/test-classes-moyennes-app/resultats', {
				templateUrl: '/test-classes-moyennes-app/partials/results.html',
				controller: 'resultsCtrl'
			});
			$routeProvider.otherwise({
				redirectTo: '/test-classes-moyennes-app/'
			});
		}
	]);

});