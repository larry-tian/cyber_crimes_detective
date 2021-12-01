import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/home/Home'
import Nav from './components/nav/Nav'
import './App.css';

const App = () => {

  return (
    <div>
      <Nav />
      <div className="content">
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </div>
    </div>
  )
};

export default App;
