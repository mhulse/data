/* jshint unused:vars */

// @see http://api.jqueryui.com/accordion/
// @todo Combine these two accordions.
DATA.register(function() {
	
	'use strict';
	
	// http://jsfiddle.net/adamboduch/tJnw7/
	// http://www.boduch.ca/2013/12/activate-accordion-section-by-url-hash.html
	var hashchange = function($primary) {
		var $this = $(this);
		$(window).on('hashchange', function(e) {
			var headers = $this.accordion('option', 'header');
			var header = $(location.hash);
			var index = $this.find(headers).index(header);
			if (index >= 0) {
				if (typeof $primary !== 'undefined' && $primary.length) {
					$primary.accordion('option', 'active', $this.closest('.ui-accordion-header').index());
				}
				$this.accordion('option', 'active', index);
			}
		});
	};
	var $primary = $('#primary');
	var $secondary = $('#secondary');
	var $progress = $('<div />', { 'class' : 'progress' });
	
	$secondary
		.children()
		.each(function() {
			$(this).after('<div />', { 'class' : 'ui-accordion-content' }); // Tabs will add this class automatically, yet we want CSS to hide sooner than later.
		});
	
	$secondary
		.accordion({
			collapsible: true,
			active : false,
			heightStyle: 'content',
			animate: false,
			icons: false,
			create: function(e, ui) {
				hashchange.call(this, $primary);
			},
			beforeActivate: function(e, ui) {
				if (ui.newPanel.is(':empty')) {
					ui.newHeader
						.next()
						// Loaded children must have .ajax-content class as that's the content target that gets loaded:
						.load(ui.newHeader.children('a').attr('href') + ' .ajax-content', function(response, status, xhr) {
							var $this = $(this);
							var $content = $this.children('.ajax-content'); // Better way?
							$progress
								.appendTo($this)
								.fadeIn('slow');
							$content
								.imagesLoaded()
								.always(function(instance) {
									console.log('all images loaded');
								})
								.done(function(instance) {
									console.log('all images successfully loaded');
									$progress.fadeOut('slow', function(){
										$content.fadeIn('slow', function() {
											$('html, body').animate({ scrollTop: ui.newHeader.offset().top }, 'slow');
										});
									});
								})
								.fail( function() {
									console.log('all images loaded, at least one is broken');
								})
								.progress(function(instance, image) {
									var result = image.isLoaded ? 'loaded' : 'broken';
									console.log('image is ' + result + ' for ' + image.img.src);
								});
						});
				}
			},
			activate: function(e, ui) {
				if (ui.newPanel.length && ui.newPanel.not(':empty')) {
					$('html, body').animate({ scrollTop: ui.newHeader.offset().top }, 'slow');
				}
				$secondary.accordion('refresh');
				ui.oldHeader.children('a').blur();
			}
		});
	
	$primary
		.accordion({
			collapsible: true,
			active : false,
			heightStyle: 'content',
			animate: false,
			icons: false,
			create: function(e, ui) {
				hashchange.call(this);
			},
			beforeActivate: function(e, ui) {
				$secondary.accordion('option', 'active', false);
			},
			activate: function(e, ui) {
				$primary.accordion('refresh');
				ui.oldHeader.blur();
			}
		});
	
	$(window).trigger('hashchange');
	
}); // DATA
