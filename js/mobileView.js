'use strict';

(function (module) {

    const mobileView = {};

    mobileView.init = () => {

        if (window.screen.availWidth < 700) hamburgerize();
        if (window.screen.availWidth > 700) deHamburgerize(); 

    };

    const hamburgerize = () => {
        $('.nav').hide();
        $('.menu').removeClass('hidden');

        $('.menu').off().on('click', function() {
            $('.nav').slideToggle(1000);
        });
    };

    const deHamburgerize = () => {
        if (!$('.menu').hasClass('hidden')) $('.menu').addClass('hidden');
        $('.nav').show();

        $('.menu').off();
    };

    module.mobileView = mobileView;

})(window.module);