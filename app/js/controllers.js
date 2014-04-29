define(['angular', 'services'], function(angular) {
	'use strict';

	/* Controllers */

	return angular.module('myApp.controllers', ['myApp.services'])
	// Sample controller where service is being used
	.controller('homeCtrl', ['$scope', 'version',
		function($scope, version) {
			$scope.scopedAppVersion = version;
		}
	])
		.controller('resultsCtrl', ['$scope', '$rootScope', '$location',
			function($scope, $rootScope, $location) {
				if (!$rootScope.results) {
					$location.path('/app/');
				}
				ga('send', 'event', 'results', 'open');
				if ($rootScope.results && $rootScope.results.nkm > $rootScope.results.ah) {
					// NKM
					$scope.result_title = "Vous partagez plutôt les idées <br />de <strong>Nathalie Kosciusko-Morizet</strong>.";
					$scope.slug = ['nkm'];
					ga('send', 'event', 'result', 'nkm');
				} else {
					if ($rootScope.results && $rootScope.results.nkm < $rootScope.results.ah) {
						// AH
						$scope.result_title = "Vous partagez plutôt les idées <br />de <strong>Anne Hidalgo</strong>.";
						$scope.slug = ['ah'];
						ga('send', 'event', 'result', 'ah');
					} else {
						// draw
						$scope.result_title = "Vous partagez à égalité les idées <br />des <strong>deux candidates</strong>.";
						$scope.slug = ['ah', 'nkm'];
						ga('send', 'event', 'result', 'ah-nkm');
					}
				}
			}
		])
	// More involved example where controller is required from an external file
	.controller('quizzCtrl', ['$scope', '$injector',
		function($scope, $injector) {
			require(['controllers/quizzCtrl'], function(quizzCtrl) {
				// injector method takes an array of modules as the first argument
				// if you want your controller to be able to use components from
				// any of your other modules, make sure you include it together with 'ng'
				// Furthermore we need to pass on the $scope as it's unique to this controller
				$injector.invoke(quizzCtrl, this, {
					'$scope': $scope
				});
			});
		}
	]);
});