(function() {
	"use strict";
	
	var next = $('.next');
	var pages = $('.page');
	var animations = [
		'horizontal',
		'horizontal-reverse',
		'vertical',
		'vertical-reverse',
		'horizontal-easing',
		'horizontal-easing-reverse',
		'vertical-easing',
		'vertical-easing-reverse',
		'horizontal-fade',
		'horizontal-fade-reverse',
		'vertical-fade',
		'vertical-fade-reverse'
	];
	var colors = [
		'#E74C3C', // Alizarin
		'#2ECC71', // Esmerald
		'#F1C40F', // Sun Flower
		'#E67E22', // Carrot
		'#1ABC9C', // Turquoise
		'#9B59B6' // Amethyst
	];
	var countAnimations = 0;
	var countColors = 0;
	var flag = true;
	var isAnim = false;
	var prefix = [
		'webkitAnimationEnd',
		'animationend'
	];

	$('#page-1').css('background-color', colors[colors.length - 1]);

	next.on('click', function() {
		if(isAnim) {
			return false;
		}

		isAnim = true;

		if(flag) {
			$(this).attr('href', '#page-2');
			flag = false;
		} else {
			$(this).attr('href', '#page-1');
			flag = true;
		}

		var nextId = $(this).attr('href');
		var nextColor = $(nextId);
		nextColor.css('background-color', colors[countColors]);
		
		$(this).attr('transition', animations[countAnimations]);
		countColors++;
		countAnimations++;

		if(countAnimations === animations.length) {
			countAnimations = 0;
		}

		if(countColors === colors.length) {
			countColors = 0;
		}

		for(var i = 0, len = prefix.length; i < len; i++) {
			$(document).on(prefix[i], function() {
				$(document).off(prefix[i]);
				isAnim = false;
			});
		}
	});
})();