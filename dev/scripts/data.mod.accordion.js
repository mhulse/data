/* jshint unused:vars */
/* global ga:false */

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
		.children('h3')
		.each(function() {
			
			$(this).after('<div class="ui-accordion-content" />');
			
		});
	
	$secondary
		.accordion({
			collapsible: true,
			active : false,
			heightStyle: 'content',
			animate: false,
			icons: false,
			header: '> h3:not(.off)', // Allows for hidden text-only content related to each header for Google to index.
			create: function(e, ui) {
				hashchange.call(this, $primary);
			},
			beforeActivate: function(e, ui) {
				
				var url;
				
				if (ui.newPanel.is(':empty')) {
					
					url = ui.newHeader.attr('data-href');
					
					ui.newHeader
						.next()
						// Loaded children must have .ajax-content class as that's the content target that gets loaded:
						.load(url + ' .ajax-content', function(response, status, xhr) {
							
							var $this = $(this);
							var $content = $this.children('.ajax-content'); // Better way?
							
							$progress
								.appendTo($this)
								.fadeIn('fast');
							
							$content
								.imagesLoaded()
									.always(function(instance) {
										
										// Triggered after all images have been either loaded or confirmed broken.
										//console.log('all images loaded');
										
									})
									.done(function(instance) {
										
										// Triggered after all images have successfully loaded without any broken images.
										//console.log('all images successfully loaded');
										
										$progress.fadeOut('fast', function() {
											
											$content.fadeIn('fast', function() {
												
												$content.find('.scroll').trigger('scroll.perfect'); // See `data.mod.scroll.js`.
												
												$('html, body').animate({ scrollTop: ui.newHeader.offset().top }, 'fast');
												
												if ((typeof ga != 'undefined') && (ga !== null)) {
													
													// Track that shit!
													ga('send', 'pageview', { 'page': '/' + url, 'title': ui.newHeader.text() });
													
												}
												
											});
											
										});
										
									})
									.fail(function() {
										
										// Triggered after all images have been loaded with at least one broken image.
										//console.log('all images loaded, at least one is broken');
										
									})
									.progress(function(instance, image) {
										
										// Triggered after each image has been loaded.
										//var result = image.isLoaded ? 'loaded' : 'broken';
										//console.log('image is ' + result + ' for ' + image.img.src);
										
									});
							
						});
				}
			},
			activate: function(e, ui) {
				
				if (ui.newPanel.length && ui.newPanel.not(':empty')) {
					
					$('html, body').animate({ scrollTop: ui.newHeader.offset().top }, 'fast');
					
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
			header: '> h2',
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
