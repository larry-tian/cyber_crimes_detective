import React, { useState, useEffect } from 'react';
import Map from '../map/Map'
import PopUp from '../pop_up/PopUp'
import Line from '../line/Line'
import Bar from '../bar/Bar'
const Home = () => {

  return (
    <div>
        <h1>Home</h1>
        <Map />
        <Line />
        <Bar />
    </div>
  )
};

export default Home;