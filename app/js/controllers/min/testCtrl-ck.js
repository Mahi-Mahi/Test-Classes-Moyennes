"use strict";define([],function(){return["$scope","$rootScope","$location","$route","dataService","configService",function(t,e,n,o,s,u){function i(){t.question_idx=0,a()}console.log("init test");var r=!1;t.answers=[],e.results={},t.showNextQuestionBtn=function(){jQuery(".content__form input:checked").length&&(jQuery(".bt-next").animate({opacity:1},500),jQuery(".bt-next").find("button").css("cursor","pointer"))},t.nextQuestion=function(){var e=jQuery(".content__form input:checked").val().charCodeAt(0)-"A".charCodeAt(0),n=jQuery(".content__form input:checked").val();t.results[t.question_idx]=n,console.log(t.results),angular.forEach(t.questions[t.question_idx].answers[e].questions,function(e,n){t.questions[n].answers=e.answers}),t.question_idx++,a()};var a=function(){jQuery(".bt-next").css("cursor","default").animate({opacity:0},100),jQuery(".bt-next").find("button").css("cursor","default"),t.question_idx<t.questions.length?t.question=t.questions[t.question_idx]:n.path("/app/resultats"),t.question_idx==t.questions.length-1&&jQuery(".bt-next").addClass("bt-next--final").find("button").html("Résultats")};t.questions?i():s.getData(function(e){t.questions=e.questions,i()}),jQuery(".icon-facebook").attr("href","https://www.facebook.com/sharer/sharer.php?u="+document.location.href+"&t="+encodeURIComponent(u.share_text+u.share_url)),jQuery(".icon-twitter").attr("href","http://twitter.com/home?status="+encodeURIComponent(u.share_status+u.share_url)),jQuery(".icon-email").attr("href","mailto:?subject="+encodeURIComponent(u.share_email_subject)+"&body="+encodeURIComponent(u.share_email_content)),jQuery(".methodo, .bt-go--ok").find("a").on("click",function(t){jQuery("#methodo").slideToggle("normal"),t.preventDefault()})}]});