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
		let transition = null;

		switch(location) {
			case 'top-nav':
				transition = 'slide-from-top';
				break;
			case 'left-nav':
				transition = 'slide-from-left';
				break;
			case 'right-nav':
				transition = 'slide-from-right';
				break;
			case 'bot-nav':
				transition = 'slide-from-bottom';
				break;
		}

		return transition;
	}

	function setPageId(string) {
		let id = null;

		switch(string) {
			case 'top-nav':
				transition = 'About';
				break;
			case 'left-nav':
				transition = 'slide-from-left';
				break;
			case 'right-nav':
				transition = 'slide-from-right';
				break;
			case 'bot-nav':
				transition = 'slide-from-bottom';
				break;
		}

		return id;
	}

	function linkClicked(location, target) {
		// if(isAnim) {
		// 	return false;
		// }

		// isAnim = true;

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

    module.pageView = pageView;

})(window.module);