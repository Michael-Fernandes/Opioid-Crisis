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