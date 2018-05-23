'use strict';

(function (module) {

    const pageView = {};

    const pages = $('div[role="page"]');
	const links = $('*[role="transition"]');
	const prefix = [
		'webkitAnimationEnd',
		'animationend'
	];
	const isAnim = false;
	const current = 0;

    pageView.init = () => {

        if (window.screen.availWidth < 650) hamburgerize();
        if (window.screen.availWidth > 650) deHamburgerize(); 

    };

    module.pageView = pageView;

})(window.module);