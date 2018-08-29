$(document).ready(function() {  
//Version 1.0
// Todo:
//// Better Toggle function
//// Add responsiveness
//// Iterate on animation
//// Host on D3js.com
// Global variables and data structures
var rawData = [];
var radius; // Radius of dots
var spaceBetweenDots = 0.25;
var graphType = "avacado";

var margin = {top: 10, right: 0, bottom: 10, left: 0},
    height = 250 - margin.top - margin.bottom;

var width = $(window).width() > 500 ? 500 : $(window).width() - margin.left - margin.right;


// This data is meant to represent avocado prices, it's made up.
var datasets = {"avacados" : [0.87,1.12,1.25,1.40,1.50,1.62,1.80,1.85,2.0, 2.11,0.99,1.11,1.22,1.40,1.51,1.65,1.76,1.04,1.10,1.27,1.37,1.49,1.24,1.37,1.14], "scores" : [90, 92, 94, 96, 96, 99, 80, 100, 101, 85, 88, 99, 95 ,93, 92, 91, 74, 90, 93, 92, 96, 88, 89, 87, 88, 89, 90, 92, 88, 86, 86, 85, 84, 83, 82, 81, 97, 97], "destinations" : [10, 12, 11, 10, 13, 14, 12, 11, 10, 11, 13, 14, 15, 17, 15, 13, 10, 11, 12, 13, 14, 15, 11, 12, 13, 14, 15, 16, 17, 12, 12, 12, 20]}

var titles = {"avacado": "Price of Avacados in Seattle ($)", "score": "Scores on Last Midterm (%)", "destination":"Estimated time of Arrival at Destination (mins)"};

var colors = {"score":"teal", "destination":"olivedrab", "avacado":"SteelBlue"}

//Lets create a svg canvas
svg = d3.select(".plot").append("svg")
              .attr("class", "box")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.bottom + margin.top)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //Make generic scale
  var axisScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 500 - margin.left - margin.right]);

  // Add the x Axis
  var axis = d3.axisBottom(axisScale);

  //Add axis to canvas
  svg.append("g")
          .attr("transform", "translate(0,"+ height + ")")
          .call(axis)
          .attr("class", "x axis");

  //Remove orgin label
  svg.selectAll(".tick>text").remove();

  //Update setup with first graph
  updateData();

  $('.update').on("click", function(){
              updateData(); });

  // Called on button click and after setup
  function updateData() {
    var dotPositions = getDots();
    var scale = makeAxis(dotPositions);
    buildDots(dotPositions, scale);
  }

  function getDots(){
    clear();
    
    setTimeout(makeTitle(titles[graphType]), 1050);
    //makeTitle(titles[graphType]);
    if(graphType == "avacado" ){
      radius = 10;
      rawData = datasets.avacados;
      data =  binData(datasets.avacados);
      graphType = "destination";
    } else if(graphType == "destination"){
      rawData = datasets.destinations;
      data = binData(datasets.destinations);
      graphType = "score"
    } else{
      radius = 5;
      rawData = datasets.scores;
      data = binData(datasets.scores);
      graphType = "avacado"
    }
    return data;
    
  }

  function makeTitle(title){
    svg.selectAll(".title").remove();
    svg.selectAll(".xLabel").remove();

    svg.append("text")
          .attr("x", (width / 2))             
          .attr("y",  75)
          .attr("text-anchor", "middle")
          .classed("title", true)  
          .style("font-size", "16px") 
          .text(title);

    /*/var re = /[(]/g;
    //text label for the x axis
    svg.append("text")             
        .attr("x", (width / 2))             
          .attr("y",  (height) + margin.bottom + margin.bottom - 10)
        .style("text-anchor", "middle")
        .classed("xLabel", true)
        .text(title.slice(title.search(re) + 1, title.length - 1)); */
  }

  function makeAxis(data){
    var min = Math.min.apply(null,rawData);
    var max = Math.max.apply(null,rawData);

    var axisSpace = (max - min) / 2;

    axisScale.domain([min - axisSpace, max + axisSpace]);
    axis.scale(axisScale);
      
  
    return axisScale;
  }

  function buildDots(dots, AS){
    console.log(graphType);
     var t = d3.linearEase;
          
             svg.select(".x")
                .transition(t)
                .call(axis);

    var circles =   svg.selectAll("circle")
                              .data(dots)
                              .enter()
                            .append("circle")
                              .classed("dots", true);


    var circleAttr = circles.attr("cx", function(d) { return AS(d[0]) })
                                   .attr("cy", function (d) { return height - (radius + 1) - (d[1]) * ( radius + spaceBetweenDots ) * 2; }) 
                                      .attr("r", radius)  
                                   .attr("opacity", 0.85)
                                   .style("stroke", "none")
                                   .style("fill", "white");

        circleAttr.transition(t)
                    .style("fill", colors[graphType])
  }

  function clear(){
      d3.selectAll("circle")
          .attr("r", 0)
          .remove();
  }

  // Round a point value to its nearest bucket
  // In: Data value(point) and the size of bucket as a real number.
  // Out: Data value rounded to nearest bucket
  function roundTo(point, bucketSize){
    var convertSize = 1 / bucketSize
    return (Math.round(point * convertSize) / convertSize).toFixed(2);
  }

  function binData(data){
    var binCount = {};
    for(var i = 0; i < data.length; i++){
      var roundedVal = roundTo(data[i], 0.125);
      if(!(roundedVal in binCount)){
        binCount[roundedVal] = 0;
      }
      binCount[roundedVal] = binCount[roundedVal] + 1;
    }
    var binnedDots = []
    for(key in binCount){
      for(var j = 0; j < binCount[key]; j++){
        binnedDots.push( [parseFloat(key), j] );
      }
    }
    return binnedDots;
  }

});
