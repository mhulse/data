$(function() {
	
	$('<img src="http://uploads.mky.io/skull.jpg" />').imagesLoaded(function() {
		
		$('body').append('<div class="skull"><div></div></div>');
		
	});
	
});

$(function() {
	
	$('nav .harmonia').harmonia({
		currentPage : true,
		optionDefault : 'Links …'
	});
	
});
