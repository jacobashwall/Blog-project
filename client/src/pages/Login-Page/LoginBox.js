import eyeIcon from './Eye-icon.png';
import './LoginBox.css'
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
const axios = require("axios")
const url = SERVER_URL;
const LoginBox = () => {
  const [username, setUsername] = useState("User Name");
  const [password, setPassword] = useState("Password");
  const [usernameColor, setUsernameColor] = useState("grey");
  const [passwordColor, setPasswordColor] = useState("grey");
  let navigate = useNavigate();
  function login() {
    axios.post(`${url}/login-check`,
      {
        username: username,
        password: password
      })
      .then((response) => {
        let pass = response.data;
        console.log(pass);
        if (pass == true) {
          navigate(`./${username}/Main`);
        }
        else {
          if (pass == "username not found") {
            setUsername("Username not found");
            setUsernameColor("firebrick")
          }
          if (pass == "incorrect password") {
            setPassword("Incorrect password")
            setPasswordColor("firebrick")
            const input = document.querySelector(".password-input"); 
            input.setAttribute("type", "text"); 
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="LoginBox">
      <p className='login-header'>Username:</p>
      <p>
        <input onChange={e => { setUsername(e.target.value); setUsernameColor('white') }} value={username} onFocus={e => { if (username === "User Name" || username === "Username not found") setUsername("") }} onBlur={e => { if (e.target.value === "") { setUsername("User Name"); setUsernameColor('grey') } }} style={{ color: usernameColor }}></input>
      </p>
      <p className='login-header'>Password:</p>
      <p className='password-line'>
        <input className='password-input' type='password'  onMouseEnter={() => { const input = document.querySelector(".password-input"); input.setAttribute("type", "password"); }} onChange={e => { setPassword(e.target.value); setPasswordColor('white') }} value={password} onFocus={e => { if (password === "Password" || password === "Incorrect password") setPassword("") }} onBlur={e => { if (e.target.value === "") { setPassword("Password"); setPasswordColor('grey') } }} style={{ color: passwordColor }}></input>
        <img onMouseEnter={() => { const input = document.querySelector(".password-input"); input.setAttribute("type", "text"); }} onMouseLeave={() => { const input = document.querySelector(".password-input"); input.setAttribute("type", "password"); }} src={eyeIcon} className="eye-icon" alt="" />
      </p>
      <button className="loginButton" onClick={login}>Login</button>
      <br></br>
      <a href="./Forgot-my-password"><b>I forgot my password!</b></a>
      <p className="register">
        <label className='register-header'>New here?</label>
        <br></br>
        <a className='register-link' href="./Register"> <b>Create free account</b> </a>
      </p>
    </div>
  )
}
export default LoginBox;

