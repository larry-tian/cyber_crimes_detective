// import React, { useState, useEffect } from 'react';
// import * as d3 from 'd3';
// import data from './data/breaches.csv';
// import { scaleBand } from 'd3';

// const width = 960;
// const height = 500;
// const margin = {top: 20, right: 20, bottom:20, left:20};

// const Bar = () => {

//   // data
//   const breach = d3.csv(data).then(function(dataset) {
//     const innerHeight = height - margin.top - margin.bottom;
//     const innerWidth = width - margin.left - margin.right;
  
//     const yScale = d3.scaleBand()
//       .domain(dataset.map(d => d.Type_Of_Breach))
//       .range([0, innerHeight]);
  
//     const xScale = d3.scaleLinear()
//       .domain([0, d3.max(dataset, d => d.Individ)])
//       .range([0, innerWidth]);

//   })

//   useEffect(() => {
//     const row = d => {
//       d.Individ = +d["Individuals_Affected"]
//     }
//     d3.csv(data, row).then(breach);
//   }, []);

//   // const innerHeight = height - margin.top - margin.bottom;
//   // const innerWidth = width - margin.left - margin.right;

//   // const yScale = scaleBand()
//   //   .domain(breach.map(d => d.Type_Of_Breach))
//   //   .range([0, innerHeight]);

//   // const xScale = scaleLinear()
//   //   .domain([0, max(data, d => d.Individ)])
//   //   .range([0, innerWidth]);

//   return (
//     <svg>
//       <g transform={`translate(${margin.left},${margin.top})`}>
//         {data.map(d => (
//           <rect
//             x={0}
//             y={yScale(d.Type_Of_Breach)}
//             width={xScale(d.Individ)}
//             height={yScale.bandwidth()}
//             />
//         ))}
//       </g>
//     </svg>
//   )
// }

// export default Bar;

// // const [data, dataset] = useState(null);
//   // useEffect(() => {
//   //   d3.csv(data).then(function(dataset) {console.log(dataset)});
//   // }, []);

//   // plot(chart, width, height) {
//   //   const xScale = d3.scaleBand()
//   //     .domain(breach.map(d => d.Type_Of_Breach))
//   //     .range([0, width])
//   // }

//   // function drawChart() { }

// Global function called when select element is changed
function onTypeChanged() {
    let radioInput = d3.select('input[name="type"]:checked').property("value");
    console.log(radioInput)
    // Update chart with the selected category of letters
    updateLine(radioInput, typesData);
}

// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 60, left: 60},
width = 400 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#line-chart")
.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
.append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Deine the color
var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];




// Load the data 
d3.csv("./breaches.csv").then(function(dataset) {
    typesData = dataset 

    // Group the dataset
    var nestData = d3.nest()
    .key(function(d) {
        return d.Type_of_Breach;
    })
    .entries(dataset);

    // Add X axis
    // set the ranges
    var x = d3.scaleTime().range([0, width])
    .domain(d3.extent(dataset, function(d) { 
        return Date.parse(d.breach_start); 
    }));

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickFormat(d3.timeFormat("%Y-%m-%d")))
        .selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)" );

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return +d.Individuals_Affected; })])
        .range([ height, 0 ]);

    svg.append("g")
        .call(d3.axisLeft(y).ticks(8));

    // color palette
    var res = nestData.map(function(d){ return d.key }) // list of group names
    var color = d3.scaleOrdinal()
        .domain(res)
        .range(colorArray)
    
    // Draw the line
    svg.selectAll(".line")
        .data(nestData)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 1.5)
        .attr("d", function(d){
            return d3.line()
            .x(function(d) { return x( Date.parse(d.breach_start)); })
            .y(function(d) { return y(+d.Individuals_Affected); })
            .curve(d3.curveMonotoneX)
            (d.values)
        })
    
    updateLine("", typesData)
})

function updateLine(type, dataset) {

    // Filter data 
    var filteredData = typesData.filter(function(d) {
        return d.Type_of_Breach.includes(type)
    })

    console.log(filteredData)


}


