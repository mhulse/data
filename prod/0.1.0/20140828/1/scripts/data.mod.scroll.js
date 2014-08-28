/* jshint unused:vars */

DATA.register(function() {
	
	'use strict';
	
	$.fn.hasVerticalScrollBar = function () {
		
		return (this[0].clientHeight < this[0].scrollHeight) ? true : false;
		
	};
	
	$.fn.hasHorizontalScrollBar = function() {
		
		return (this[0].clientWidth < this[0].scrollWidth) ? true : false;
		
	};
	
	var $scroll = $('img').closest('.scroll'),
	    $scroll_wrap = $('<div />', { 'class': 'scroll-wrap' }),
	    $scroll_overlay = $('<div />', { 'class': 'scroll-overlay' }),
	    resizeTimer;
	
	$scroll.wrap($scroll_wrap);
	$scroll_overlay
		.text('Scroll')
		.hide()
		.insertAfter($scroll);
	
	$scroll.on('foo', function() {
		
		var $this = $(this),
		    $that = $this.parent('.scroll-wrap').find('.scroll-overlay');
		
		if ($this.hasHorizontalScrollBar()) {
			$that.show();
			//console.log('show');
		} else {
			$that.hide();
			//console.log('hide');
		}
		
	});
	
	// https://github.com/mhulse/picard/issues/137
	$(window).load(function() {
		
		$scroll.trigger('foo');
		
	});
	
	$(window).resize(function() {
		
		clearTimeout(resizeTimer);
		
		resizeTimer = setTimeout(function() {
			
			$scroll.trigger('foo');
			
		}, 100);
		
	});
	
}); // DATA
