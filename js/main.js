$( document ).ready(function() {
	console.log("log 1")
	var d = new Date();

	var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
	var month = months[d.getMonth() ];
	var date = d.getDate();

	var url = window.location.href;

	isLink = url.split("#");
	if(isLink.length > 1){
		$("#portfolio-start").show(0);
	} else{
		$("#desktop").slideDown(1000, function(){
			console.log("we made it?")
			$("#portfolio-start").show(0, function(){
				console.log("")
			});
		});
	} 


	$("#month").html(month);

	$("#date").html(date).attr("text-anchor", "middle");

	  // ===== Scroll to Top ==== 
	$(window).scroll(function() {
	    if ($(this).scrollTop() >= 50) {   
	        $('#return-to-top').fadeIn(500);   
	    } else {
	        $('#return-to-top').fadeOut(350);  
	    }
	});
	$('#return-to-top').click(function() {  
	    $('body,html').animate({
	        scrollTop : 0                 
	    }, 150);
	});

	//window.sr = ScrollReveal();
	//sr.reveal('.animate');

	$(".link").on("click", function(){
		$("#wholepage").fadeOut('slow', function() {
			document.location = "default.html"
		});
	});
});


function about(){
	 $("html").show("slide", { direction: "left" }, 1000);
	 //document.location.href = "default.html";
}
