$(document).ready(function() {
  var deleteLog = true;

  document.onreadystatechange = function () {
  var state = document.readyState
    if( false){
      if (state == 'interactive') {
           document.getElementById('contents').style.visibility="hidden";
      } else if (state == 'complete') {
          setTimeout(function(){
             document.getElementById('interactive');
             document.getElementById('load').style.visibility="hidden";
             document.getElementById('fullpage').style.visibility="visible";
          },1000);
      }
    }
  }

  $('#fullpage').fullpage({
    sectionsColor: ['#FFFFFF', '#f6faff', '#fcfcfc', 'fffefc','#FFFFFF', '#f6faff', 'smokeSceen', '#F8F8FF', '#F5F5F5',],
    anchors: ['1stpage', '2ndpage', '3rdPage', '4thpage', '5thpage', '6thpage', '7thpage', '8thpage', '9thpage', '10thpage', '11thpage', '12thpage', '13thpage', '14thpage', '15thpage', '16thpage', '17thpage', '18thpage', '19thpage'],
    //responsiveWidth: 900,
    autoScrolling: false,
    recordHistory: true,
    lazyLoading: false,
    
    scrollOverflow: false,
    scrollOverflowOptions: {
          click: false
     },
  });
});

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



