/* global define */
"use strict";

define([], function() {
	return ['$scope', '$rootScope', '$location', '$route', 'dataService', function($scope, $rootScope, $location, $route, dataService) {
		// You can access the scope of the controller from here

		$scope.mode = $route.current.$$route.originalPath.replace('/app/', '');

		switch ($scope.mode) {

			case 'quizz':

				console.log("init quizz");

				$scope.answers = [];
				$rootScope.results = {
					nkm: 0,
					ah: 0
				};

				break;

			case 'resultats':

				break;
		}

		$scope.setAnswer = function(index) {
			if ($scope.mode == 'quizz') {
				$scope.answers[$scope.question_idx] = index;

				angular.forEach($scope.questions[$scope.question_idx].answers[index].score, function(value, key) {
					$rootScope.results[key] += value ? 1 : 0;
				});

				ga('send', 'event', 'question', 'click', $scope.question_idx, index);

				$scope.nextQuestion();
			}

		};

		$scope.nextQuestion = function() {
			$scope.question_idx++;

			showQuestion();

		};

		var showQuestion = function() {

			if ($scope.question_idx < $scope.questions.length) {

				$scope.question = $scope.questions[$scope.question_idx];
				console.log($scope.question);

			} else {
				$location.path("/app/resultats");
			}

		};

		if ($scope.questions) {
			startQuizz();
		} else {
			dataService.getData(function(data) {
				$scope.questions = data.questions; //.slice(0, 1);
				startQuizz();
			});
		}

		function startQuizz() {
			$scope.question_idx = 0;

			console.log($scope.questions.length + " questions");

			showQuestion();

		}

		// $scope.$apply();

	}];
});