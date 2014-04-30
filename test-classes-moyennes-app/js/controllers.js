/* global define */
/* global require */
define(['angular', 'services'], function(angular) {
	'use strict';

	/* Controllers */

	return angular.module('myApp.controllers', ['myApp.services'])
		.controller('homeCtrl', ['$scope', '$injector',
			function($scope, $injector) {
				require(['controllers/homeCtrl'], function(homeCtrl) {
					$injector.invoke(homeCtrl, this, {
						'$scope': $scope
					});
				});
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