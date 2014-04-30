/* global define */
/* global require */
define(['angular', 'services'], function(angular) {
	'use strict';

	/* Controllers */

	return angular.module('myApp.controllers', ['myApp.services'])
		.controller('homeCtrl', ['$scope', 'version',
			function($scope, version) {
				$scope.scopedAppVersion = version;
			}
		])

	.controller('testCtrl', ['$scope', '$injector',
		function($scope, $injector) {
			require(['controllers/testCtrl'], function(testCtrl) {
				$injector.invoke(testCtrl, this, {
					'$scope': $scope
				});
			});
		}
	])
		.controller('resultsCtrl', ['$scope', '$injector',
			function($scope, $injector) {
				require(['controllers/resultsCtrl'], function(resultsCtrl) {
					$injector.invoke(resultsCtrl, this, {
						'$scope': $scope
					});
				});
			}
		]);
});