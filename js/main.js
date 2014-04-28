// SHOW HIDE METHODO
var toggleMethodo = function() {
	jQuery('.methodo, .bt-go--ok').find('a').on('click', function(event) {
		jQuery('#methodo').slideToggle('normal');
		event.preventDefault();
	});
};

// DOCUMENT READY
jQuery(document).ready(function() {
	toggleMethodo();
});