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
			$routeProvider.when('/app/', {
				templateUrl: '/app/partials/home.html',
				controller: 'homeCtrl'
			});
			$routeProvider.when('/app/quizz', {
				templateUrl: '/app/partials/quizz.html',
				controller: 'quizzCtrl'
			});
			$routeProvider.when('/app/reponses', {
				templateUrl: '/app/partials/quizz.html',
				controller: 'quizzCtrl'
			});
			$routeProvider.when('/app/resultats', {
				templateUrl: '/app/partials/results.html',
				controller: 'resultsCtrl'
			});
			$routeProvider.otherwise({
				redirectTo: '/app/'
			});
		}
	]);

});