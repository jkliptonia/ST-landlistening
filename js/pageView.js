'use strict';

(function (module) {

    const pageView = {};

    const pages = $('div[role="page"]');
	const links = $('.nav > h2');
	const prefix = [
		'webkitAnimationEnd',
		'animationend'
	];
	const isAnim = false;
	const current = 0;

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
		// if(isAnim) {
		// 	return false;
		// }

		// isAnim = true;

		if (checkMobile()) location = 'mobile';
		const animations = setTransitions(location);
		const nextPage = $(`#${target}`);

		console.log(`Link Target = ${target} || Link Location = ${location} || Link Animation = ${animations}`);

		// if(nextPage.length === 0) {
		// 	return false;
		// }

		// applyAnimations(nextPage, animations);
	}

    pageView.init = () => {
		
		pageView.currentPage = $('#current-page').text();
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