/* jshint unused:vars */

DATA.register(function() {
	
	'use strict';
	
	// @see http://api.jqueryui.com/accordion/
	// @todo Combine these two accordions.
	
	var $primary = $('#primary');
	var $secondary = $('#secondary');
	var $progress = $('<div />', { 'class' : 'progress' });
	
	$secondary
		.children()
		.each(function() {
			$(this).after('<div />');
		});
	
	$secondary
		.accordion({
			collapsible: true,
			active : false,
			heightStyle: 'content',
			animate: false,
			beforeActivate: function(event, ui) {
				if (ui.newPanel.is(':empty')) {
					ui.newHeader
						.next()
						.load(ui.newHeader.children('a').attr('href') + ' .content', function() {
							var $this = $(this);
							var $content = $this.children('.content'); // Better way?
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
										$content.fadeIn('slow');
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
			activate: function() {
				$secondary.accordion('refresh');
			}
		});
	
	$primary
		.accordion({
			collapsible: true,
			active : false,
			heightStyle: 'content',
			animate: false,
			beforeActivate: function(event, ui) {
				$secondary.accordion('option', 'active', false);
			}
		});
	
}); // DATA
