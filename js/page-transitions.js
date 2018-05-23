(function() {
	"use strict";

	$(window).on('load', init);

	var pages = $('div[role="page"]');
	var links = $('*[role="transition"]');
	var prefix = [
		'webkitAnimationEnd',
		'animationend'
	];
	var isAnim = false;
	var current = 0;

	function initialize() {
		for(var i = 0, len = pages.length; i < len; i++) {
			$(pages[i]).addClass('page');
		}
	}

	function setCurrentPage() {
		pages.eq(current).addClass('current-page');
	}

	function setTransitions(link) {
		var transition = $(link).attr('transition');
		var reverse = $(link).attr('reverse');
		var classOut = '';
		var classIn = '';

		if(transition === '' || transition === undefined) {
			transition = 'horizontal';
		}

		if(reverse === '') {
			transition += '-reverse';
		}

		switch(transition) {
			case 'horizontal':
				classOut = 'slide-to-left';
				classIn = 'slide-from-right';
				break;
			case 'horizontal-reverse':
				classOut = 'slide-to-right';
				classIn = 'slide-from-left';
				break;
			case 'vertical':
				classOut = 'slide-to-top';
				classIn = 'slide-from-bottom';
				break;
			case 'vertical-reverse':
				classOut = 'slide-to-bottom';
				classIn = 'slide-from-top';
				break;
			case 'horizontal-easing':
				classOut = 'slide-to-left-easing';
				classIn = 'slide-from-right';
				break;
			case 'horizontal-easing-reverse':
				classOut = 'slide-to-right-easing';
				classIn = 'slide-from-left';
				break;
			case 'vertical-easing':
				classOut = 'slide-to-top-easing';
				classIn = 'slide-from-bottom';
				break;
			case 'vertical-easing-reverse':
				classOut = 'slide-to-bottom-easing';
				classIn = 'slide-from-top';
				break;
			case 'horizontal-fade':
				classOut = 'slide-to-fade';
				classIn = 'slide-from-right';
				break;
			case 'horizontal-fade-reverse':
				classOut = 'slide-to-fade';
				classIn = 'slide-from-left';
				break;
			case 'vertical-fade':
				classOut = 'slide-to-fade';
				classIn = 'slide-from-bottom';
				break;
			case 'vertical-fade-reverse':
				classOut = 'slide-to-fade';
				classIn = 'slide-from-top';
				break;
			default:
				classOut = 'slide-to-left';
				classIn = 'slide-from-right';
		}

		return [classOut, classIn];
	}

	function currentIndex(nextPage) {
		current = pages.index(nextPage);
	}

	function resetClasses(next, current, classes) {
		isAnim = false;
		current.attr('class', classes[0]).removeClass('current-page');
		next.attr('class', classes[1]).addClass('current-page');
	}

	function applyAnimations(nextPage, animations) {
		var classOut = animations[0];
		var classIn = animations[1];
		var currentPage = pages.eq(current);

		var originalClasses = [
			currentPage.attr('class'),
			nextPage.attr( 'class' )
		];

		currentIndex(nextPage);
		setCurrentPage();

		currentPage.addClass(classOut);
		nextPage.addClass(classIn);

		for(var i = 0, len = prefix.length; i < len; i++) {
			$(document).on(prefix[i], function() {
				$(document).off(prefix[i]);
				resetClasses(nextPage, currentPage, originalClasses);
			});
		}
	}

	function linkClicked(link) {
		if(isAnim) {
			return false;
		}

		isAnim = true;

		var animations = setTransitions(link);
		var nextId = $(link).attr('href');
		var nextPage = $(nextId);

		if(nextPage.length === 0) {
			return false;
		}

		applyAnimations(nextPage, animations);
	}

	function init() {
		initialize();
		setCurrentPage();
		links.on('click', function(e) {
			e.preventDefault();
			linkClicked(this);
		});
	}
})();