import React, { useState, useEffect } from 'react';
import Map from '../map/Map'
import PopUp from '../pop_up/PopUp'
import Line from '../line/Line'
import Bar from '../bar/Bar'

// Import Material UI
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



import './Home.css'
const Home = () => {

  const [timeValue, setTimeValue] = useState([0, 100]);
  const [type, setType] = useState(null);

  const handleTimeChange = (event, newValue) => {
    setTimeValue(newValue);
  };

  const handleTypeChange = (event, newType) => {
    setType(newType);
  }

  console.log(type)
  console.log(timeValue)

  function timeValueText(timeValue) {
    return `${timeValue}`;
  }

  return (
    <div className="main-content">
      {/* Displaying content here */}
        <div className="row">
          <div className="col-sm-3 col-md3 col-lg-3">
            <h1>Type</h1>
            <p>Filter the visualization by types</p>

            <FormControl component="fieldset">
              <FormLabel component="legend">Type</FormLabel>
              <RadioGroup
                aria-label="gender"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={handleTypeChange}
              >
                <FormControlLabel value="typeOne" control={<Radio />} label="Type 1" />
                <FormControlLabel value="typeTwo" control={<Radio />} label="Type 2" />
                <FormControlLabel value="typeThree" control={<Radio />} label="Type 3" />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="col-sm-6 col-md-6 col-lg-6">
            <h1>Location</h1>
            <p>Select a specific location for more information</p>

            <Map />
          </div>

          <div className="col-sm-3 col-md-3 col-lg-3">
            <h1>Trend</h1>
            <p>See the overall trend with a glance</p>

            <Line />

          </div>
      </div>
      
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={timeValue}
          onChange={handleTimeChange}
          valueLabelDisplay="auto"
          getAriaValueText={timeValueText}
        />
      </Box>

      <Bar />
    </div>
  )
};

export default Home;