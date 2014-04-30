/* global define */
/* global ga */
"use strict";

define([], function() {
	return ['$scope', '$rootScope', '$location', '$route', 'dataService', 'configService', function($scope, $rootScope, $location, $route, dataService, configService) {
		// You can access the scope of the controller from here

		console.log("init test");

		var debug = true;

		$scope.answers = [];
		$rootScope.results = {};

		$scope.showNextQuestionBtn = function() {

			if (!jQuery('.content__form input:checked').length) {
				return;
			}

			$scope.nextQuestion();

			// jQuery('.bt-next').animate({
			// 	opacity: 1
			// }, 500);
			// jQuery('.bt-next').find('button').css('cursor', 'pointer');
		};

		$scope.nextQuestion = function() {

			var index = jQuery('.content__form input:checked').val().charCodeAt(0) - "A".charCodeAt(0);
			var res = jQuery('.content__form input:checked').val();

			// console.log([index, res]);

			$scope.results[$scope.question_idx] = res;

			console.log($scope.results);

			angular.forEach($scope.questions[$scope.question_idx].answers[index].questions, function(value, key) {
				$scope.questions[key].answers = value.answers;
			});

			// ga('send', 'event', 'question', 'click', $scope.question_idx, index);

			$scope.question_idx++;

			showQuestion();

		};

		var showQuestion = function() {

			jQuery('.bt-next').css('cursor', 'default').animate({
				opacity: 0
			}, 100);
			jQuery('.bt-next').find('button').css('cursor', 'default');
			if ($scope.question_idx < $scope.questions.length) {

				$scope.question = $scope.questions[$scope.question_idx];

			} else {
				$location.path("/app/resultats");
			}

			if ($scope.question_idx == ($scope.questions.length - 1)) {
				jQuery('.bt-next').addClass('bt-next--final').find('button').html('Résultats');
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

			// console.log($scope.questions.length + " questions");

			showQuestion();

		}

		jQuery('.icon-facebook').attr('href', "https://www.facebook.com/sharer/sharer.php?u=" + document.location.href + "&t=" + encodeURIComponent(configService.share_text + configService.share_url));
		jQuery('.icon-twitter').attr('href', "http://twitter.com/home?status=" + encodeURIComponent(configService.share_status + configService.share_url));
		jQuery('.icon-email').attr('href', "mailto:?subject=" + encodeURIComponent(configService.share_email_subject) + "&body=" + encodeURIComponent(configService.share_email_content));

		jQuery('.methodo, .bt-go--ok').find('a').on('click', function(event) {
			jQuery('#methodo').slideToggle('normal');
			event.preventDefault();
		});
		// $scope.$apply();

	}];
});