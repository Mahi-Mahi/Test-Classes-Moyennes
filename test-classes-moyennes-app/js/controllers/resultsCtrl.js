/* global define */
/* global ga */
"use strict";

define([], function() {
	return ['$scope', '$rootScope', 'configService', function($scope, $rootScope, configService) {
		// You can access the scope of the controller from here

		console.log("results");

		// $rootScope.results = ['A', 'A', 'C', 'C', 'A'];

		if (typeof($rootScope.results) == 'undefined') {
			document.location = '/test-classes-moyennes-app/';
		}

		var studies = 0,
			csp = 0,
			earnings = 0,
			estate = 0;

		console.log($rootScope.results);

		// Studies
		switch ($rootScope.results[1]) {
			case 'A':
				jQuery('.studies .result-answer span').html("Non").parent().addClass('bullet-no');
				jQuery('.studies .media-block .media-block').html("Vous faites partie des 27% de Français non diplômés ou titulaires d'un certificat d'études. Vous vous situez juste en-dessous d'une sorte de « classe moyenne du diplôme » qui réunit 49% de la population ayant atteint un niveau d'études compris entre le brevet des collèges et le bac.");
				studies = -1;
				break;
			case 'B':
			case 'C':
			case 'D':
				jQuery('.studies .result-answer span').html("Oui").parent().addClass('bullet-yes');
				jQuery('.studies .media-block .media-block').html("Vous avez atteint comme 49% des Français, un niveau d'études compris entre le brevet des collèges et le bac. Vous appartenez à une sorte de « classe moyenne du diplôme », située entre les 27% non diplômés ou titulaires d'un certificat d'études et les 24% ayant obtenu un diplôme égal ou supérieur à Bac +2.");
				studies = 1;
				break;
			case 'E':
			case 'F':
				jQuery('.studies .result-answer span').html("Non").parent().addClass('bullet-no');
				jQuery('.studies .media-block .media-block').html("Vous faites partie des 24% de Français les plus diplômés, avec un niveau scolaire supérieur ou égal à Bac +2. Vous vous situez juste au-dessus d'une sorte de « classe moyenne du diplôme » qui réunit 49% de la population ayant atteint un niveau d'études compris entre le brevet des collèges et le bac.");
				studies = -1;
				break;
		}

		// CSP
		switch ($rootScope.results[2]) {
			case 'A':
				jQuery('.csp .result-answer span').html("Peut-<br />être").addClass('maybe');
				jQuery('.csp .media-block .media-block').html("On estime qu’environ 20% des ouvriers (les plus qualifiés) pourraient être rangés dans les classes moyennes.");
				csp = -1;
				break;
			case 'B':
				jQuery('.csp .result-answer span').html("Peut-<br />être").addClass('maybe');
				jQuery('.csp .media-block .media-block').html("On estime qu’environ 20% des employés (les plus qualifiés) pourraient être rangés dans les classes moyennes.");
				csp = -1;
				break;
			case 'C':
				jQuery('.csp .result-answer span').html("Peut-<br />être").addClass('maybe');
				jQuery('.csp .media-block .media-block').html("On estime qu’environ 50 % des chefs d’entreprise, artisans et agriculteurs pourraient être rangés dans les classes moyennes.");
				csp = -1;
				break;
			case 'D':
				jQuery('.csp .result-answer span').html("Oui").parent().addClass('bullet-yes');
				jQuery('.csp .media-block .media-block').html("Vous êtes au cœur des classes moyennes.");
				csp = 1;
				break;
			case 'E':
				jQuery('.csp .result-answer span').html("Peut-<br />être").addClass('maybe');
				jQuery('.csp .media-block .media-block').html("On estime qu’environ 20 % des cadres et professions intellectuelles supérieurs pourraient être rangés dans les classes moyennes. moyennes.");
				csp = 1;
				break;
		}

		// Earnings
		switch ($rootScope.results[3]) {
			case 'A':
			case 'B':
				jQuery('.earnings .result-answer span').html("Non").parent().addClass('bullet-no');
				jQuery('.earnings .media-block .media-block').html("Vous faites partie des 30% des ménages les plus modestes, dont les revenus sont inférieurs à ceux des classes moyennes.");
				earnings = -1;
				break;
			case 'C':
				jQuery('.earnings .result-answer span').html("Oui").parent().addClass('bullet-yes');
				jQuery('.earnings .media-block .media-block').html("Vous faites partie des classes moyennes, comprises entre les 30% des ménages les plus modestes et les 20% des ménages les plus riches.");
				earnings = 1;
				break;
			case 'D':
				jQuery('.earnings .result-answer span').html("Non").parent().addClass('bullet-no');
				jQuery('.earnings .media-block .media-block').html("Vous faites partie des 20% des ménages les plus riches, dont les revenus sont supérieurs à ceux des classes moyennes.");
				earnings = -1;
				break;
		}

		// Estate
		switch ($rootScope.results[4]) {
			case 'A':
				jQuery('.estate .result-answer span').html("Non").parent().addClass('bullet-no');
				jQuery('.estate .media-block .media-block').html("Vous faites partie des 30% des ménages les moins riches, dont le patrimoine est inférieur à celui des classes moyennes.");
				estate = -1;
				break;
			case 'B':
				jQuery('.estate .result-answer span').html("Oui").parent().addClass('bullet-yes');
				jQuery('.estate .media-block .media-block').html("Vous faites partie des classes moyennes, comprises entre les 30% des ménages les moins riches et les 20% des ménages les mieux dotés.");
				estate = 1;
				break;
			case 'C':
			case 'D':
				jQuery('.estate .result-answer span').html("Non").parent().addClass('bullet-no');
				jQuery('.estate .media-block .media-block').html("Vous faites partie des 20% des ménages les mieux dotés, dont le patrimoine est supérieur à celui des classes moyennes.");
				estate = -1;
				break;
		}

		var cm, total = studies + csp + earnings + estate;

		console.log(total);

		if (total > 2) {
			cm = true;
		} else {
			if ((earnings === 1 && estate === 1) || (csp === 1 && earnings === 1) || (studies === 1 && earnings === 1) || (csp === 1 && estate === 1)) {
				cm = true;
			} else {
				cm = false;
			}
		}

		ga('send', 'event', 'studies', studies.toString());
		ga('send', 'event', 'csp', csp.toString());
		ga('send', 'event', 'earnings', earnings.toString());
		ga('send', 'event', 'estate', estate.toString());

		if (cm) {
			jQuery('.result-status').addClass('result-ok').find('.tagline').html("Vous faites partie des <strong>classes moyennes</strong>");

			jQuery('.icon-facebook').attr('href', "https://www.facebook.com/sharer/sharer.php?u=" + document.location.href + "&t=" + encodeURIComponent("Selon le test du Parisien Magazine, je fais partie des classes moyennes. Et vous ? " + configService.share_url));
			jQuery('.icon-twitter').attr('href', "http://twitter.com/home?status=" + encodeURIComponent("Selon le test de @LeParisienMag, je fais partie des classes moyennes. Et vous? " + configService.share_url));
			jQuery('.icon-email').attr('href', "mailto:?subject=" + encodeURIComponent(configService.share_email_subject) + "&body=" + encodeURIComponent("Selon le test de @LeParisienMag, je fais partie des classes moyennes. Et vous?" + configService.share_url));

			ga('send', 'event', 'result', 'ClassesMoyennes');
		} else {
			jQuery('.result-status').addClass('result-nok').find('.tagline').html("Vous ne faites pas partie des <strong>classes moyennes</strong>");

			jQuery('.icon-facebook').attr('href', "https://www.facebook.com/sharer/sharer.php?u=" + document.location.href + "&t=" + encodeURIComponent("Selon le test du Parisien Magazine, je ne fais pas partie des classes moyennes. Et vous ? " + configService.share_url));
			jQuery('.icon-twitter').attr('href', "http://twitter.com/home?status=" + encodeURIComponent("Selon le test de @LeParisienMag, je ne fais pas partie des classes moyennes. Et vous? " + configService.share_url));
			jQuery('.icon-email').attr('href', "mailto:?subject=" + encodeURIComponent(configService.share_email_subject) + "&body=" + encodeURIComponent("Selon le test de @LeParisienMag, je ne fais pas partie des classes moyennes. Et vous?" + configService.share_url));

			ga('send', 'event', 'result', 'Pas-ClassesMoyennes');
		}

		// result-nok

		jQuery('.methodo, .bt-go--ok').find('a').on('click', function(event) {
			jQuery('#methodo').slideToggle('normal');
			event.preventDefault();
		});

		$scope.$apply();

	}];
});