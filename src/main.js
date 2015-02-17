$(function() {
    stickyNav('nav');
});

function stickyNav(element) {

    var nav = $(element);
    var navTop = nav.offset().top;

    $(window).scroll(function() {

            var scrollTop = $(window).scrollTop();

            if (scrollTop > navTop) {
                nav.addClass('sticky');
            } else {
                nav.removeClass('sticky');
            }

        });
}