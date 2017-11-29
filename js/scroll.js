// Code borrowed from 
// https://jsfiddle.net/mariusc23/s6mLJ/31/

(function($, window, document) {
  // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 4;
    var navbarHeight = $('header').outerHeight();
    var PR = window.devicePixelRatio || 1;

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            //return;

        if(navbarHeight == undefined)
            navbarHeight = $('header').outerHeight();

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop){ // Scroll Down
            $('header').css("border-shadow", "none")
            $('header').removeClass('header-shadow-off slideInDown').addClass("slideOutUp");
        } else { // Scroll Up
            if(st + $(window).height() < $(document).height() && st > $(window).height()) {
                //$('header').addClass("header-shadow "); //done to avoid transition conflict
                $('header').removeClass("slideOutUp").addClass('header-shadow slideInDown ');
            }
        }

        if(st == 0){
            $('header').removeClass("slideOutUp").addClass('header-shadow-off slideInDown');
        }
        
        lastScrollTop = st;
    }

}(window.jQuery, window, document));



