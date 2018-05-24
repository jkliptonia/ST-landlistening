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
	
    pageView.init = () => {
		
		pageView.currentPage = $('#current-page').text();
		let linkTarget = null;
		let linkLoc = null;
		links.on('click', function(e) {
			linkTarget = e.currentTarget.innerText;
			linkLoc = e.currentTarget.offsetParent.id;
			console.log(`Link Target = ${linkTarget} || Link Location = ${linkLoc}`);
		})
	};
	
	
	// function
	// read link
	// transition
	// set current page
	// change link text

    module.pageView = pageView;

})(window.module);