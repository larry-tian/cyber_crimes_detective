const { useState, useEffect } = require("react")

import React, {useState, useEffect} from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';



var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var projection = d3.geoNaturalEarth1()
    .scale(width / 1.3 / Math.PI)
    .translate([width / 2, height / 2])

d3.csv("breaches.csv") {

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
            .attr("fill", "#69b3a2")
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            .style("stroke", "#fff")
})

const App = () => {
    return (
    <Nav>
        <div>

        </div>
    </Nav>
    

    )
}


export default App; 