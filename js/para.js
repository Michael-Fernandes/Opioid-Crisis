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
    sectionsColor: ['#f6faff', '#FFFFFF', '#F8F8FF', 'fffefc','#f6faff', 'smokeSceen', '#F8F8FF', '#F5F5F5',],
    anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', '5thPage', '6thpage', 'lastPage'],
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



/*
$('#fullpage').fullpage({
  onSlideLeave: function( anchorLink, index, slideIndex, direction, nextSlideIndex){
    var leavingSlide = $(this);

    //leaving the first slide of the 2nd Section to the right
    if(index == 2 && slideIndex == 0 && direction == 'right'){
      alert("Leaving the fist slide!!");
    }

    //leaving the 3rd slide of the 2nd Section to the left
    if(index == 2 && slideIndex == 2 && direction == 'left'){
      alert("Going to slide 2! ");
    }
  }
});
*/