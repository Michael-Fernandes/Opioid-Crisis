import { Component } from 'react'
import * as d3 from 'd3'
import * as ReactFauxDOM from 'react-faux-dom'
import data from "../Resources/data.json"
import colors from "../Resources/colors.json"

class Chart extends Component {
    constructor(props){
        super(props);

        this.makeD3 = this.makeD3.bind(this);
        this.getActive = this.getActive.bind(this)
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
        let valueline = d3.line()
            .x(function(d) { return x(new Date(d.year, 1, 1)); })
            .y(function(d) { return y(d.val); });

        for( let countryData of activeData){
            svg.append("path")
                .datum(countryData.data)
                .attr("class", "line")
                .attr("d",valueline)
                .attr("stroke-width", "2px")
                .attr("stroke", colors[countryData.name])
                .attr('color', colors[countryData.name])
                .attr("fill", 'none');
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

const getDataFor = (country) =>{
    return { 
        name:country.name, 
        data:data[[country.name]]['Both'].sort(function(a, b){return a.year - b.year}) 
    }

}

const getDomain = (countries) =>{
    let d = [{val:3.0}]
    for(let c of countries){
        d = d.concat(c.data);
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

// makeD4(){
//     let fauxDiv = ReactFauxDOM.createElement('div');  

//     // Set the margins
//     var margin = {top: 60, right: 100, bottom: 20, left: 80},
//     width = 850 - margin.left - margin.right,
//     height = 370 - margin.top - margin.bottom;

//     let parseYear = d3.timeParse("%Y")
//     let formatYear = d3.timeFormat("%Y");
//     console.log(d3.scaleTime.domain([parseYear("1990"),parseYear("2017")]));
//     // Set the ranges
//     var x = d3.scaleTime().domain([parseYear("1990"),parseYear("2017")]).range([0, width]);
//     var y = d3.scaleLinear().range([height, 0]);

//     // Define the line
//     var valueLine = d3.line()
//     .x(function(d) { return x(d.Month); })
//     .y(function(d) { return y(+d.Sales); })

//     // Create the svg canvas in the "graph" div
//     var svg = d3.select(fauxDiv)
//                     .append("svg")
//                     .style("width", width + margin.left + margin.right + "px")
//                     .style("height", height + margin.top + margin.bottom + "px")
//                     .attr("width", width + margin.left + margin.right)
//                     .attr("height", height + margin.top + margin.bottom)
//                     .append("g")
//                     .attr("transform","translate(" + margin.left + "," + margin.top + ")")
//                     .attr("class", "svg");
    
//     // Scale the range of the data
//     x.domain(d3.extent(data, function(d) { return d.year; }));
//     y.domain([0, d3.max(data, function(d) { return d.val; })]);

//     // Set up the x axis
//     var xaxis = svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .attr("class", "x axis")
//         .call(d3.axisBottom(x)
//             .ticks(d3.timeMonth)
//             .tickSize(0, 0)
//             .tickSizeInner(0)
//             .tickPadding(10));

//     // Add the Y Axis
//     var yaxis = svg.append("g")
//         .attr("class", "y axis")
//         .call(d3.axisLeft(y)
//             .ticks(5)
//             .tickSizeInner(0)
//             .tickPadding(6)
//             .tickSize(0, 0));

//     // yaxis.select(".domain").style("display","none")

//     // Add a label to the y axis
//     svg.append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 0 - 60)
//         .attr("x", 0 - (height / 2))
//         .attr("dy", "1em")
//         .style("text-anchor", "middle")
//         .text("Deaths per Thousand")
//         .attr("class", "y axis label");

//     // Draw the line
//     svg.append("path")
//         .data([data])
//         .attr("class", "line")
//         .attr("d", valueLine);
//     console.log(data)

//     return fauxDiv;
// }