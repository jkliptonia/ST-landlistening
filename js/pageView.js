'use strict';

(function (module) {

    const pageView = {};

    const pages = $('div[role="page"]');
	const links = $('.nav > h2');
	const prefix = [
		'webkitAnimationEnd',
		'animationend'
	];

	pageView.isAnim = false;
	pageView.currentPage = null;

	function setTransitions(location) {
		let classOut = '';
		let classIn = '';

		switch(location) {
			case 'top-nav':
				classOut = 'slide-to-bottom';
				classIn = 'slide-from-top';
				break;
			case 'left-nav':
				classOut = 'slide-to-right';
				classIn = 'slide-from-left';
				break;
			case 'right-nav':
				classOut = 'slide-to-left';
				classIn = 'slide-from-right';
				break;
			case 'bot-nav':
				classOut = 'slide-to-top';
				classIn = 'slide-from-bottom';
				break;
			case 'mobile':
				classOut = 'slide-to-top';
				classIn = 'slide-from-bottom';
				break;
		}

		return [classOut, classIn];
	}


	function linkClicked(location, target) {
		if(pageView.isAnim) {
			return false;
		}

		pageView.isAnim = true;

		if (checkMobile()) location = 'mobile';
		const animations = setTransitions(location);
		const nextPage = $(`#${target}`);

		console.log(`Link Target = ${target} || Link Location = ${location} || Link Animation = ${animations}`);

		applyAnimations(nextPage, animations);
	}

	function resetClasses(next, current, classes) {
		isAnim = false;
		current.attr('class', classes[0]).removeClass('current-page');
		next.attr('class', classes[1]).addClass('current-page');
	}

	function setCurrentPage(page) {
		$('section[role="page"]').removeClass('current-page');
		page.addClass('current-page');
	}

	function findCurrent() {

		let current= $('#current-page').text();
		return $(`#${current}`);
	};

	function applyAnimations(nextPage, animations) {
		const classOut = animations[0];
		const classIn = animations[1];
		const currentPage = pageView.currentPage;

		let originalClasses = [
			currentPage.attr('class'),
			nextPage.attr( 'class' )
		];

		setCurrentPage(currentPage);

		currentPage.addClass(classOut);
		nextPage.removeClass('hidden');
		nextPage.addClass(classIn);

		for(let i = 0, len = prefix.length; i < len; i++) {
			$(document).on(prefix[i], function() {
				$(document).off(prefix[i]);
				resetClasses(nextPage, currentPage, originalClasses);
			});
		}
	}


    pageView.init = () => {
		
		pageView.currentPage = findCurrent();
		let linkTarget = null;
		let linkLoc = null;
		let linkTargetId = null;

		links.on('click', function(e) {
			const linkLoc = e.currentTarget.offsetParent.id;
			const linkTargetId = e.currentTarget.offsetParent.attributes.target.value;

			linkClicked(linkLoc, linkTargetId);
		})

	};
	
	
	// function
	// read link
	// transition
	// set current page
	// change link text + aria label

	function checkMobile() {
		return window.screen.availWidth < 650 ? true : false;
	};

    module.pageView = pageView;

})(window.module);