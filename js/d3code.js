$( document ).ready(function() {
	var comp = document.getElementById("computer").onclick = function(){
		location.reload();
	};
	// d3 ish
	//create a filter
	var defs = d3.select("svg").append("defs");

	var filter = defs.append("filter")
	  .attr("id", "dropshadow")

	filter.append("feGaussianBlur")
	  .attr("in", "SourceAlpha")
	  .attr("stdDeviation", 2)
	  .attr("result", "blur");
	filter.append("feOffset")
	  .attr("in", "blur")
	  .attr("dx", 1)
	  .attr("dy", 1)
	  .attr("result", "offsetBlur");

	var feMerge = filter.append("feMerge");

	feMerge.append("feMergeNode")
	  .attr("in", "offsetBlur")
	feMerge.append("feMergeNode")
	  .attr("in", "SourceGraphic");


	//add filter on hover
	d3.selectAll(".clickable-hover").on("mouseover", function(){
		//d3.select(this).style("stroke", "black")
		d3.select(this).transition(400).attr("transform", "translate(0, -3)").attr("filter", "url(#dropshadow)");
	}).on('mouseout', function(){
		d3.select(this).transition(400).attr("transform", "translate(0, 3)").attr("filter", "none");;
	}).on("click", function(){
		if(this.id == "portfolio"){
			$('html, body').animate({
        		scrollTop: $("#portfolio-start").offset().top
    		}, 750);
		}else if(this.id == "tablet"){
			$('html, body').animate({
        		scrollTop: $("#ubus").offset().top
    		}, 750);
		}else if(this.id == "resume-svg"){
			window.open("img/resume.pdf");
		}else if(this.id =="research"){
			window.open("img/ubus/ubus.pdf");
		}else if(this.id == "mail"){
			window.location.href = "mailto:mfern93@gmail.com";
		}else if(this.id == "computer"){
			location.reload();
		}else if(this.id == "notebook"){
			window.open("https://medium.com/@mikefern");
		}else if(this.id == "coffee"){
			window.open("https://www.yelp.com/user_details?userid=0d6z6BvYpKMoxvBXpiGf-g");
		}else if(this.id == "phone"){
			alert("Call me at: 206-434-0881");
		}else if(this.id == "wireframe"){
			$('html, body').animate({
        		scrollTop: $("#caid").offset().top
    		}, 750);
		}else if(this.id == "wireframe"){
			$('html, body').animate({
        		scrollTop: $("#ubus").offset().top
    		}, 750);
		}
	})
});
