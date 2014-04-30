/* global define */
/* global ga */
"use strict";

define([], function() {
	return ['$scope', '$rootScope', '$location', '$route', 'dataService', function($scope, $rootScope, $location, $route, dataService) {
		// You can access the scope of the controller from here

		console.log("init test");

		var debug = true;

		$scope.answers = [];
		$rootScope.results = {};

		$scope.showNextQuestionBtn = function() {

			if (!jQuery('.content__form input:checked').length) {
				return;
			}

			console.log("showNextQuestionBtn");

			if (debug) {
				$scope.nextQuestion();
			} else {
				jQuery('.bt-next').animate({
					opacity: 1
				}, 500);
			}

		};

		$scope.nextQuestion = function() {

			var index = jQuery('.content__form input:checked').val().charCodeAt(0) - "A".charCodeAt(0);
			var res = jQuery('.content__form input:checked').val();

			console.log([index, res]);

			$scope.answers[$scope.question_idx] = res;

			angular.forEach($scope.questions[$scope.question_idx].answers[index].questions, function(value, key) {
				$scope.questions[key].answers = value.answers;
			});

			angular.forEach($scope.questions[$scope.question_idx].answers[index].score, function(value, key) {
				$rootScope.results[key] += value ? 1 : 0;
			});

			ga('send', 'event', 'question', 'click', $scope.question_idx, index);

			$scope.question_idx++;

			showQuestion();

		};

		var showQuestion = function() {

			jQuery('.bt-next').animate({
				opacity: 0
			}, 100);

			if ($scope.question_idx < $scope.questions.length) {

				$scope.question = $scope.questions[$scope.question_idx];
				console.log($scope.question);

			} else {
				$location.path("/app/resultats");
			}

		};

		if ($scope.questions) {
			startTest();
		} else {
			dataService.getData(function(data) {
				$scope.questions = data.questions; //.slice(0, 1);
				startTest();
			});
		}

		function startTest() {

			$scope.question_idx = 0;

			console.log($scope.questions.length + " questions");

			showQuestion();

		}

		// $scope.$apply();

	}];
});