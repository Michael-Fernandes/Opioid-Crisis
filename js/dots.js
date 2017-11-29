(function() {
    // your JS code
//Version 1.0

// Todo:
//// Better Toggle function
//// Add responsiveness
//// Iterate on animation
//// Host on D3js.com


// Global variables and data structures
var rawData = [];
var radius; // Radius of dots
var spaceBetweenDots = 1;
var graphType = "avacado";

var margin = {top: 10, right: 50, bottom: 20, left: 50},
    width = ($(window).width() < 500) 500 - margin.left - margin.right : $(window).width();
    height = 200 - margin.top - margin.bottom;


// This data is meant to represent avocado prices, it's made up.
datasets = {"avacados" : [1.00, 1.50, 1.03, 0.85, 1.24, 1.23, 1.24, 1.12, 1.26, 1.12, 2.50, 2.55, 1.70, 1.80, 1.90, 3.00, 3.50, 1.75, 3.90, 3.85, 1.80, 1.75, 1.70, 3.65, 3.60, 3.40, 3.20, 2.80, 3.00, 3.20, 3.40, 3.20, 3.00, 2.80, 2.75, 2.70, 2.50, 2.00, 2.20, 2.40, 2.30, 2.25, 2.20, 2.25, 2.30, 2.35, 2.60, 2.70, 2.60, 3.00, 3.20 , 3.15, 3.00, 3.00, 3.00, 2.00 , 2.00, 2.55, 2.85, 2.60, 2.70, 4.50], "scores" : [90, 92, 94, 96, 96, 99, 80, 100, 101, 85, 88, 99, 95 ,93, 92, 91, 74, 90, 93, 92, 96, 88, 89, 87, 88, 89, 90, 92, 88, 86, 86, 85, 84, 83, 82, 81, 97, 97], "destinations" : [10, 12, 11, 10, 13, 14, 12, 11, 10, 11, 13, 14, 15, 17, 15, 13, 10, 11, 12, 13, 14, 15, 11, 12, 13, 14, 15, 16, 17, 12, 12, 12, 20]}


var titles = {"avacado": "Price of Avacados in Seattle ($)", "score": "Scores on Last Midterm (%)", "destination":"Estimated time of Arrival at Destination (mins)"};

var colors = {"score":"teal", "destination":"olivedrab", "avacado":"SteelBlue"}
//Lets create a svg canvas
var svg = d3.select(".plot-wrapper").append("svg")
              .attr("class", "box")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.bottom + margin.top)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Make generic scale
var axisScale = d3.scaleLinear()
  .domain([Infinity, Infinity])
  .range([0, 500 - margin.left - margin.right]);

// Add the x Axis
var axis = d3.axisBottom(axisScale);

//Add axis to canvas
svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,"+ height + ")")
        .call(axis)

//Remove orgin label
svg.selectAll(".tick>text").remove();

//Update setup with first graph
updateData();

// Called on button click and after setup
function updateData() {
  var dotPositions = getDots();
  var scale = makeAxis(dotPositions)
  buildDots(dotPositions, scale);
}


function getDots(){
  clear();
  makeTitle(titles[graphType]);
  if(graphType == "avacado" ){
    radius = 7
    rawData = datasets.avacados;
    data =  binData(datasets.avacados);
    graphType = "destination";
  } else if(graphType == "destination"){
    rawData = datasets.destinations;
    data = binData(datasets.destinations);
    graphType = "score"
  } else{
    radius = 4;
    rawData = datasets.scores;
    data = binData(datasets.scores);
    graphType = "avacado"

  }
  return data;
  
}

function makeTitle(title){
  svg.selectAll(".title").remove();
  console.log(title);
  svg.append("text")
        .attr("x", (width / 2))             
        .attr("y",  (margin.top))
        .attr("text-anchor", "middle")
        .classed("title", true)  
        .style("font-size", "16px") 
        .text(title);
}

function makeAxis(data){
  var min = Math.min.apply(null,rawData);
  var max = Math.max.apply(null,rawData);

  var axisSpace = (max - min) / 4;

  axisScale.domain([min - axisSpace, max + axisSpace]);
  axis.scale(axisScale);
  return axisScale;
}

function buildDots(dots, AS){
  console.log(graphType);
   var t = d3.transition()
            .duration(1500);
        
        svg.select(".x")
            .transition()
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
                                 .style("stroke", "grey")
                                 //.style("fill", "#A9A9A9");
                                 .style("fill", colors[graphType]);
}

function clear(){
    d3.selectAll("circle").remove();
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
    var roundedVal = roundTo(data[i], 0.25);
    if(!(roundedVal in binCount)){
      binCount[roundedVal] = 1;
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

})();