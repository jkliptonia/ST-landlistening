'use strict';

(function (module) {

    const pageView = {};

    const pages = $('div[role="page"]');
	const links = $('.nav');
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
				classOut = 'slide-to-left';
				classIn = 'slide-from-right	';
				break;
		}

		return [classOut, classIn];
	}

	function handleLinks(nextPage) {
		const landlisteningLink = {
			h2: 'Landlistening',
			target: 'landlistening',
			aria: 'About Landlistening'
		};

		const aboutLink = {
			h2: 'About Sarah',
			target: 'about',
			aria: 'About Sarah'
		};

		const testimonialsLink = {
			h2: 'Testimonials',
			target: 'testimonials',
			aria: 'Testimonals'
		};

		const contactLink = {
			h2: 'Contact',
			target: 'contact',
			aria: 'Contact Info'
		};

		let nav = {};
		nav.landlistening = ['empty', aboutLink, testimonialsLink, contactLink];
		nav.about = ['empty', testimonialsLink, landlisteningLink, contactLink];
		nav.testimonials = ['empty', landlisteningLink, aboutLink, contactLink];
		nav.contact = [landlisteningLink, null, null, 'empty'];

		renderLinks(links, nav[`${$(nextPage)[0].id}`]);
	}

	function renderLinks(links, array){
		for (let i = 0; i < array.length; i++) { 
			if (!array[i]) continue;
			if (array[i] === 'empty') {
				$(links[i]).addClass('hidden');
				continue;
			}
			$(links[i]).removeClass('hidden')
					.empty()
					.append(`<h2>${array[i].h2}</h2>`)
					.attr(`target`, array[i].target)
					.attr(`aria-label`, array[i].aria);
		}
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
		pageView.isAnim = false;
		current.attr('class', classes[0]).removeClass('current-page');
		next.attr('class', classes[1]).addClass('current-page');
	}

	function setCurrentPage(page) {
		$('section[role="page"]').removeClass('current-page');
		page.addClass('current-page');
	}

	function applyAnimations(nextPage, animations) {
		const classOut = animations[0];
		const classIn = animations[1];
		const currentPage = pageView.currentPage;

		setCurrentPage(currentPage);
		if(!checkMobile()) handleLinks(nextPage);

		let originalClasses = [
			currentPage.attr('class'),
			nextPage.attr( 'class' )
		];

		currentPage.addClass(classOut);
		nextPage.addClass('next-page').addClass(classIn);

		for(let i = 0, len = prefix.length; i < len; i++) {
			$(document).on(prefix[i], function() {
				$(document).off(prefix[i]);
				resetClasses(nextPage, currentPage, originalClasses);
			});
		};
	}

    pageView.init = () => {
		
		let linkTarget = null;
		let linkLoc = null;
		let linkTargetId = null;

		links.on('click', function(e) {
			pageView.currentPage = $('.current-page');
			const linkLoc = e.currentTarget.id;
			const linkTargetId = e.currentTarget.attributes.target.value;

			linkClicked(linkLoc, linkTargetId);
		})

	};
	
	
	// function
	// read link
	// transition
	// set current page
	// change link text + aria label

	function checkMobile() {
		return window.screen.availWidth < 700 ? true : false;
	};

    module.pageView = pageView;

})(window.module);