// import React, { useState, useEffect } from 'react';
// import * as d3 from 'd3';
// import data from './data/breaches.csv';
// import { nest } from 'd3-collection';

// const Bar = () => {

//   useEffect(() => {
//     const row = d => {
//       d.Individuals_Affected
//     }
//     drawChart();
//   }, [data]);

//   function drawChart() {
//     // set the dimensions and margins of the graph
//     var margin = { top: 10, right: 30, bottom: 30, left: 60 },
//       width = 460 - margin.left - margin.right,
//       height = 400 - margin.top - margin.bottom;

//     // append the svg object to the body of the page
//     var svg = d3.select("#my_dataviz")
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");

//     const breach = d3.csv(data).then(function(dataset) {
//       // attributes of breaches
//       var subgroups = dataset.columns.slice(1)

//       // On click -> Pass a function

//       var groups = nest()
//         .key(function(d) {
//           return d.State;
//         })
//         .entries(dataset)

//       // x axis
//       var x = d3.scaleBand()
//         .domain(groups.map(d => d.key))
//         .range([0, width])
//         .padding([0.2])
//       svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x).ticks(0));

//       // y axis
//       var y = d3.scaleLinear()
//         .domain([0, 500000]) // d3.max(groups, d => d['Individuals_Affected']
//         .range([height, 0]);
//       svg.append("g")
//         .call(d3.axisLeft(y));

//       var subgroups = dataset.columns.slice(1)
//       console.log(subgroups);

//       // Another scale for subgroup position?
//       var xSubgroup = d3.scaleBand()
//         .domain(subgroups)
//         .range([0, x.bandwidth()])
//         .padding([0.05])

//       var map = dataset.reduce((prev, next) => {
//         if (next.State in prev) {
//           prev[next.State].Individuals_Affected += next.Individuals_Affected;
//         } else {
//           prev[next.State] = next;
//         }
//         return prev;
//       }, {});

//       var result = Object.keys(map).map(State=> map[State]);

//       //console.log(result); 
//       result.forEach(function(obj, index){
//         console.log(index);
//         for (var key in obj){
//             console.log(key, obj[key]);
//         }
//       });

//         // let map = data.reduce((prev, next) =>{
//         //   if (next.id in prev) {
//         //     prev[next.id].total += next.total;
//         //   } else {
//         //      prev[next.id] = next;
//         //   }
//         //   return prev;
//         // }, {});
        
//         // let result = Object.keys(map).map(id => map[id]);
        
//         // console.log(result);

//       // color palette = one color per subgroup
//       // var color = d3.scaleOrdinal()
//       //   .domain(subgroups)
//       //   .range(['#e41a1c', '#377eb8', '#4daf4a'])

//       // Show the bars
//       // svg.append("g")
//       //   .selectAll("g")
//       //   // Enter in data = loop group per group
//       //   .data(data)
//       //   .enter()
//       //   .append("g")
//       //   .attr("transform", function (d) { return "translate(" + x(d.group) + ",0)"; })
//       //   .selectAll("rect")
//       //   .data(function (d) { return subgroups.map(function (key) { return { key: key, value: d[key] }; }); })
//       //   .enter().append("rect")
//       //   .attr("x", function (d) { return xSubgroup(d.key); })
//       //   .attr("y", function (d) { return y(d.value); })
//       //   .attr("width", xSubgroup.bandwidth())
//       //   .attr("height", function (d) { return height - y(d.value); })
//       //   .attr("fill", function (d) { return color(d.key); });
//     })
//   }

//   return (
//     <svg id="my_dataviz" width="500" height="400"></svg>
//   )
// };

// export default Bar;