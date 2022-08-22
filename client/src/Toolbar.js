import './Toolbar.css';
import settingsIcon from './Settings-icon.png';
import React from 'react';


const Toolbar=()=> {
    return(
        <nav className="toolBar">
        <a href="./Settings" ><img src={settingsIcon} className="settings-icon" alt="" /> </a>
        <p className="gap"></p>
        <a href="/">Home</a>
        <a href="./Register">Register</a>
        <a href="./About-Us">About-Us</a>
      </nav>
    )
}
export default Toolbar;