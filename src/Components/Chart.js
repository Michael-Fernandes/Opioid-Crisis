import React, { Component } from 'react'
import * as d3 from 'd3'
import * as ReactFauxDOM from 'react-faux-dom'
import data from "../Resources/data.json"
import colors from "../Resources/colors.json"

class Chart extends Component {
    constructor(props){
        super(props);

        this.makeD3 = this.makeD3.bind(this);
        this.getActive = this.getActive.bind(this);
    }

    getActive(){
        let countries = this.props.countries;
        let active = countries.filter(el => el.active === true); // I have no idea but this call drops data.....
        return active;
    }
    
    makeD3(){
        let fauxDiv = ReactFauxDOM.createElement('div');  
        
        //  TODO: dynamically add new data
        let activeNames = this.getActive();
        let activeData = getDataActive(activeNames)
        
        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        // parse the date / time
        // set the ranges
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        

        let svg = d3.select(fauxDiv).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

        let parseYear = d3.timeParse("%Y");
        // Scale the range of the data
        let sample = data['Canada']["Both"];
        x.domain(d3.extent(sample, function(d) { return parseYear(d.year) }));
        y.domain([0, d3.max(getDomain(activeData), function(d) { return d.val; })]);

        // define the line
        let valueline = (val) =>{ 
            return d3.line()
                    .x(function(d) { return x(new Date(d.year, 1, 1)); })
                    .y(function(d) { return y(d[val]); }); 
        }

        let div = d3.select("#root").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
            
        for( let countryData of activeData ){
            let linePlot = svg.append("g")
            let cdBoth = countryData.data["Both"].sort(function(a, b){return a.year - b.year}) ;
            
            linePlot.append("path")
                .datum(cdBoth)
                .attr("class", "line")
                .attr("d",valueline("val"))
                .attr("stroke-width", "2.5px")
                .attr("stroke", colors[countryData.name])
                .attr('color', colors[countryData.name])
                .attr("fill", 'none')

            linePlot.selectAll(".linePlotPoint").data(cdBoth)
                .enter().append("circle") // Uses the enter().append() method
                .attr("class", "linePlotPoint") // Assign a class for styling
                .attr("cx", function(d, i) { return x(new Date(d.year, 1, 1)) })
                .attr("cy", function(d) { return y(d.val) })
                .attr("r", 3)
                .attr("stroke", colors[countryData.name])
                .attr("fill", colors[countryData.name])
                .on("mouseover", function(d) {
                    d3.select(this).attr("r", 10);
                    div.transition()
                      .duration(200)
                      .style("opacity", 1);
                    div.html( getTool(d) )
                      .style("left", (d3.event.pageX) +5 + "px")
                      .style("top", (d3.event.pageY - 28) + "px"); })
                .on("mouseout", function(d) {
                        div.transition()
                          .duration(500)
                          .style("opacity", 0); });       
        }

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call( d3.axisBottom(x).ticks(5).tickSizeOuter(0) );

        // Add the Y Axis
        svg.append("g")
            .call( d3.axisLeft(y).ticks(6).tickSizeOuter(0) );

        return fauxDiv;
    }

    render() {
        let FauxSvg = this.makeD3();

        return (
            FauxSvg.toReact()
        );
    }
}

function getTool(d){
    let {year, val, upper, lower} = d;
    val = val.toFixed(2);
    upper = upper.toFixed(2);
    lower = lower.toFixed(2);
    console.log(year);
    return (
        "<span><span><b>" + year + " </b></span><br /><span>Value: " + val + "</span><br /><span>Upper: " + upper + "</span><br /><span>Lower: " + lower + "</span></span>"
    )
}

// data transformatiuon helper functions
const getDataFor = (country) =>{
    return { 
        name:country.name, 
        data:data[[country.name]]
    }
}

const getDomain = (countries) =>{
    let d = [{val:3.0}]
    for(let c of countries){
        d = d.concat(c.data['Both']);
    }
    return d
}

const getDataActive = (countries) =>{
    let activeData = []
    for(let c of countries){
        activeData.push(getDataFor(c));
    }
    return activeData;
}

export default ReactFauxDOM.withFauxDOM(Chart);
