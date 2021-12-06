import React, { useState, useEffect } from 'react';

import logoImg from '../../img/logo.png'
import logoHoverImg from '../../img/logo_hover.png'

import './Nav.css'
const Nav = () => {

  return (
    <div>
        <nav className="navbar">
            <ul className="nav-layout">
              <img className="logo" src={logoImg} onMouseOver={e => (e.currentTarget.src= logoHoverImg)} onMouseOut={e => (e.currentTarget.src = logoImg)}/>
              <h1 className="logo-name">Cybercrime Detective</h1>
            </ul>
        </nav>
    </div>
  )
};

export default Nav;