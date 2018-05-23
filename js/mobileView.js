'use strict';

(function (module) {

    const mobileView = {};

    mobileView.init = () => {

        if (window.screen.availWidth < 650) hamburgerize();
        if (window.screen.availWidth > 650) deHamburgerize(); 

    };

    const hamburgerize = () => {
        $('.nav').hide();
        $('.menu').removeClass('hidden');
        $('.menu').off().on('click', function() {
            $('.nav').slideToggle();
        });
    };

    const deHamburgerize = () => {
        if (!$('.menu').hasClass('hidden')) $('.menu').addClass('hidden');
        $('.nav').show();
        $('.menu').off();
    };

    module.mobileView = mobileView;

})(window.module);