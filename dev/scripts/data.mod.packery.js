DATA.register(function() {
	
	'use strict';
	
	var $packery = $('.packery').imagesLoaded(function() {
		
		$('.packery_item').animate({ opacity: '1' });
		
		$packery.packery({
			itemSelector: '.packery_item',
			columnWidth: 150,
			isLayoutInstant: false,
			transitionDuration: '.5s'
		});
		
	});
	
}); // DATA
