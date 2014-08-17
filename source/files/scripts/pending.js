$(function() {
	
	/**
	 * @see http://osvaldas.info/elegant-css-and-jquery-tooltip-responsive-mobile-friendly
	 * @see http://stackoverflow.com/a/5909446/922323
	 */
	
	var $targets = $('.no-touch [rel~=tooltip]');
	var $target;
	var tooltip;
	var tip;
	
	// Move title to data object:
	$targets.each(function() {
		
		var $this = $(this);
		
		$this
			.data('title', $this.attr('title'))
			.removeAttr('title'); // IE was showing tooltip without this code.
		
	});
	
	$targets.mouseenter(function() {
		
		$target = $(this);
		tip = $target.data('title');
		$tooltip = $('<div class="tooltip" />');
		
		if (tip) {
			
			$tooltip
				.css('opacity', 0)
				.html(tip)
				.appendTo('body');
			
			var init_tooltip = function() {
				
				var $window = $(window);
				var pos_left;
				var pos_top;
				
				if ($window.width() < $tooltip.outerWidth() * 1.5) {
					
					$tooltip.css('max-width', $window.width() / 2);
					
				} else {
					
					$tooltip.css('max-width', 340);
					
				}
				
				pos_left = ($target.offset().left + $target.outerWidth() / 2 - $tooltip.outerWidth() / 2);
				pos_top = ($target.offset().top - $tooltip.outerHeight() - 50);
				
				if (pos_left < 0) {
					
					pos_left = ($target.offset().left + $target.outerWidth() / 2 - 50);
					$tooltip.addClass('left');
					
				} else {
					
					$tooltip.removeClass('left');
					
				}
				
				if (pos_left + $tooltip.outerWidth() > $window.width()) {
					
					pos_left = ($target.offset().left - $tooltip.outerWidth() + $target.outerWidth() / 2 + 50);
					$tooltip.addClass('right');
					
				} else {
					
					$tooltip.removeClass('right');
					
				}
				
				if(pos_top < 0) {
					
					pos_top = ($target.offset().top + $target.outerHeight());
					$tooltip.addClass('top');
					
				} else {
					
					$tooltip.removeClass('top');
				}
				
				$tooltip
					.css({
						left: pos_left,
						top: pos_top
					})
					.animate({
						top: '+=37',
						opacity: 1
					}, 100);
				
			};
			
			init_tooltip();
			$(window).resize(init_tooltip);
			
			var remove_tooltip = function() {
				
				$tooltip.animate({
					top: '-=37',
					opacity: 0
				}, 100, function() {
					$(this).remove();
				});
				
			};
			
			$target.mouseleave(remove_tooltip);
			$tooltip.click(remove_tooltip);
			
		}
		
	});
	
});

// http://buildinternet.com/2008/12/quick-tip-blur-links-with-jquery/
// $(document).ready(function(){
// 	$('a').click(function(){
// 		$(this).blur();
// 	});
// });
// 

$(function() {
	
	$('<img src="http://uploads.mky.io/skull.jpg" />').imagesLoaded(function() {
		
		$('body').append('<div class="skull"><div></div></div>');
		
	});
	
});
