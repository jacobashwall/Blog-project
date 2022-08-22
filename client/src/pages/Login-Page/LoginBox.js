import eyeIcon from './Eye-icon.png';
import './LoginBox.css'
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
const axios=require("axios")
const url = SERVER_URL;
const LoginBox = () => {
  const [userName, setUserName] = useState("User Name");
  const [password, setPassword] = useState("Password");
  const [userNameColor, setUserNameColor] = useState("grey");
  const [passwordColor, setPasswordColor] = useState("grey");
  const [seenPassword, setSeenPassword] = useState("Password");
  let navigate = useNavigate();
  function login() {
    axios.post(`${url}/login-check`,
      {
        username: userName,
        password: password
      })
      .then((response) => {
        let pass = response.data;
        console.log(pass);
        if (pass==true) {
          navigate('/Blog/' + userName);
        }
        else {
          if (pass == "username not found") {
            setUserName("Username not found");
            setUserNameColor("firebrick")
          }
          if (pass == "incorrect password") {
            setSeenPassword("Incorrect password");
            setPassword("")
            setPasswordColor("firebrick")
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
        <input onChange={e => { setUserName(e.target.value); setUserNameColor('white') }} value={userName} onFocus={e => { if (userName === "User Name"|| userName === "Username not found") setUserName("") }} onBlur={e => { if (e.target.value === "") { setUserName("User Name"); setUserNameColor('grey') } }} style={{ color: userNameColor }}></input>
      </p>
      <p className='login-header'>Password:</p>
      <p className='password-line'>
        <input className='password-input' onChange={e => { setPassword(password + e.target.value[e.target.value.length - 1]); setPasswordColor('white'); setSeenPassword(('*').repeat(e.target.value.length)); }} value={seenPassword} onFocus={e => { if (password === "Password" || seenPassword === "Incorrect password") { setPassword(""); setSeenPassword("") } }} onBlur={e => { if (e.target.value === "") { setPassword("Password"); setPasswordColor('grey'); setSeenPassword("Password") } }} style={{ color: passwordColor }}></input>
        <img onMouseEnter={() => setSeenPassword(password)} onMouseLeave={() => { if (password !== "Password") setSeenPassword(('*').repeat(password.length)) }} src={eyeIcon} className="eye-icon" alt="" />
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