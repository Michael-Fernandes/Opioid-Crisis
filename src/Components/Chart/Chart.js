import React, { Component } from 'react';
import * as d3 from 'd3';
import * as ReactFauxDOM from 'react-faux-dom';
import data from "../../Resources/data.json";
import colors from "../../Resources/colors.json";
import sizeMe from "react-sizeme";

class Chart extends Component {
    constructor(props){
        super(props);

        this.makeD3 = this.makeD3.bind(this);
        this.getActive = this.getActive.bind(this);
        this.getDataFor = this.getDataFor.bind(this);
    }

    getActive(){
        let countries = this.props.countries;
        let active = countries.filter(el => el.active === true); // I have no idea but this call drops data.....
        return active;
    }

    getDataFor(country, gender="Both"){
        return country['data'][[gender]].sort(function(a, b){return a.year - b.year});
    }

    makeD3(){
        // React Faux Dom wasn't the best choice for this project, because of the updates
        // I needed to make.
        let fauxDiv = ReactFauxDOM.createElement('div');  
       

        const activeNames = this.getActive();
        const activeData = getDataActive(activeNames)
        
        // set the dimensions and margins of the graph
        const margin = {top: 20, right: 20, bottom: 30, left: 37.5},
            height = 540 - margin.top - margin.bottom;
        //let width = console.log(this.props.size.width);
        const width = 940 - margin.right - margin.left;
        // parse the date / time
        // set the ranges
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        let svg = d3.select(fauxDiv).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const parseYear = d3.timeParse("%Y");
        const domain = [1989, 2018];
        x.domain(d3.extent(domain, function(d) { return parseYear(d) }));
        y.domain([0, d3.max(getDomain(activeData), function(d) { return d.val; })]);

        // Accepts "upper", "lower", "val"
        const valueline = (valueType) =>{ 
            return d3.line()
                    .x(function(d) { return x(new Date(d.year, 1, 1)); })
                    .y(function(d) { return y(d[valueType]); }); 
        }

        let div = d3.select(".Chart-Wrapper").append("div")
                        .attr("class", "tooltip")
                        .style("opacity", 0);
        
        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call( d3.axisBottom(x).ticks(5).tickSizeOuter(0).tickSize(0) )
            .append("text")
                .attr('transform', "translate(" +width / 2 + "," + 30 + ")")
                .attr("font-size", "1.5em")
                .attr("text-anchor", "middle")
                .text("Year");

        // Add the Y Axis
        svg.append("g")
            .call( d3.axisLeft(y).ticks(6).tickSizeOuter(0).tickSize(0) )
            .append("text")
                .attr('transform', "translate(" + -25 + "," + height / 2 + ") rotate(-90)")
                .attr("text-anchor", "middle")
                .attr("font-size", "1.5em")
                .text("Fatalities per 100,000 Capita");;
        
        svg.selectAll(".tick > text")
                .attr("font-size", "1.25em")

        for( let countryData of activeData ){
            const cd = this.getDataFor( countryData );
            
            let linePlot = svg.append("g").attr("class", "linePlot");
            
            linePlot.append("path")
                        .datum( cd )
                        .attr("class", "line")
                        .attr("d",valueline("val"))
                        .attr("stroke-width", "2.5px")
                        .attr("stroke", colors[countryData.name])
                        .attr('color', colors[countryData.name])
                        .attr("fill", 'none')

            linePlot.selectAll(".linePlotPoint").data( cd )
                        .enter().append("circle") 
                        .attr("class", "linePlotPoint")
                        .attr("cx", function(d, i) { return x(new Date(d.year, 1, 1)) })
                        .attr("cy", function(d) { return y(d.val) })
                        .attr("r", 3)
                        .attr("stroke", colors[countryData.name])
                        .attr("fill", colors[countryData.name])
                        .on("mouseover", function(d) {
                            div.transition() 
                                .duration(200)
                                .style("opacity", 0.9);
                            div.html( getTool(d, countryData.name) )
                                .style("left", (d3.event.pageX) +5 + "px")
                                .style("top", (d3.event.pageY - 28) + "px"); })
                        .on("mouseout", function(d) {
                                div.transition()
                                    .duration(500)
                                    .style("opacity", 0); });       
            }

        return fauxDiv;
    }

    render() {
        let FauxSvg = this.makeD3();

        return (
            FauxSvg.toReact()
        );
    }
}

const getTool = (d, name) => {
    let {year, val, upper, lower} = d;
    val = val.toFixed(2);
    upper = upper.toFixed(2);
    lower = lower.toFixed(2);
    return ( 
        "<span><span><b>" +  name + "(" + year + ")</b></span><br /><span>Value: " + val + "</span><br /><span>Upper: " + upper + "</span><br /><span>Lower: " + lower + "</span></span>"
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
