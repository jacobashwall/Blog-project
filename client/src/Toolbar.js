import './Toolbar.css';
import settingsIcon from './Settings-icon.png';
import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom'

const Toolbar=()=> {
  const [search,setSearch]=useState("Search");
  const [searchColor,setSearchColor]=useState("gray");
  const location = useLocation();
  const navigate=useNavigate();
    return(
        <nav className="toolBar">
        <a href="./Settings" ><img src={settingsIcon} className="settings-icon" alt="" /> </a>
        <div className="gap">
        <input onChange={e => { setSearch(e.target.value); setSearchColor('white') }} value={search} onFocus={e => { if (search === "Search") setSearch("") }} onBlur={e => { if (e.target.value === "") { setSearch("Search"); setSearchColor('grey') } }} style={{ color: searchColor }}></input>
        <button onClick={()=>{navigate('./username/Search/'+search)}}>Search</button>
        <h1>{location.pathname}</h1>
        </div>
        <a href="/">Home</a>
        <a href="./Register">Register</a>
        <a href="./About-Us">About-Us</a>
      </nav>
    )
}
export default Toolbar;