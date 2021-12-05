const { useState, useEffect } = require("react")

import React, {useState, useEffect} from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';


const App = () => {
    return (
    <Nav>
        <div>
        <script src="https://d3js.org/d3.v4.js"></script>
        <script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
        <script src="https://d3js.org/d3-geo-projection.v2.min.js"></script>

        {/* <!-- Create an element where the map will take place --> */}
        <svg id="my_dataviz" width="400" height="300"></svg>
        </div>
    </Nav>
    

    )
}


export default App; 