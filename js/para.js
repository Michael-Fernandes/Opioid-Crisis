
$(document).ready(function() {
var deleteLog = false;
var placeHolder = $('#callbacks-placeholder');
var imgFix = $("#img-fix-center");
	

$('#fullpage').fullpage({
  anchors: ['page1', 'page2', 'page3', 'page4'],
  sectionsColor: ['yellow', 'orange', '#C0C0C0', '#ADD8E6'],
  anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
  responsiveWidth: 900,
  onLeave: function(index, nextIndex, direction) {
    if (deleteLog) {
      placeHolder.html('');
    }
    if(nextIndex == 2){
      imgFix.hide();
    }
    placeHolder.append('<p>onLeave - index:' + index + ' nextIndex:' + nextIndex + ' direction:' + direction + '</p>')
  },
  onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex) {
    if (deleteLog) {
      placeHolder.html('');
    }
    placeHolder.append('<p>onSlideLeave - anchorLink:' + anchorLink + " index:" + index + " slideIndex:" + slideIndex + " direction:" + direction + " nextSlideIndex:" + nextSlideIndex + '</p>');
  },
  afterRender: function() {
    placeHolder.append('<p>afterRender</p>');;
  },
  afterResize: function() {
    placeHolder.append('<p>afterResize</p>');
  },
  afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
    placeHolder.append('<p>afterSlideLoad - anchorLink:' + anchorLink + " index:" + index + " slideAnchor:" + slideAnchor + " slideIndex:" + slideIndex + '</p>');
    deleteLog = true;
  },
  afterLoad: function(anchorLink, index) {
    placeHolder.append('<p>afterLoad - anchorLink:' + anchorLink + " index:" + index + '</p>');
    deleteLog = true;
    if(index == 3){
      console.log("logged");
      imgFix.css({"position": "fixed", "display":"block"}).fadeIn();
    	//animate left
    	
    }
  },
  afterResponsive: function(isResponsive){
    placeHolder.append('<p>afterResponsive - isResponsive:' +isResponsive + '</p>');
  }
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
