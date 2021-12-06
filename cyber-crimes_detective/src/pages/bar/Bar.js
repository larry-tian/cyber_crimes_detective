import React, { useState, useEffect } from 'react';

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// data parsing
d3.csv("/data/breaches.csv", function(data) {

  // attributes of breaches
  var subgroups = data.columns.slice(1)

  var groups = d3.map(data, function(d) {
    return (d.Type_Of_Breaches )
  })

})

const Bar = () => {

  return (
    <div>
        <h1>Bar</h1>
    </div>
  )
};

export default Bar;