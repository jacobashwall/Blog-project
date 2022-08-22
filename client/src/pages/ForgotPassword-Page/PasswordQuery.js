import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
const axios = require("axios");
function PasswordQuery(props) {
  const [password1Color, setPassword1Color] = useState("grey");
  const [password2Color, setPassword2Color] = useState("grey");
  const [email,setEmail]=useState(props.email)
  const [password1, setPassword1] = useState(props.password);
  const [password2, setPassword2] = useState(props.password);
  const url = SERVER_URL;
  let navigate = useNavigate();

  function changePassword(props) {
    if (password1.includes(" ")) {
      setPassword1("Enter a valid password");
      setPassword1Color("firebrick");
    }
    else {
      if (password1 != password2) {
        setPassword2("Passwords do not match!");
        setPassword2Color("firebrick");
      } else {
        axios.post(`${url}/forgot-password-change-password`,
          {
            email: email,
            password: password1
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        navigate('../');
      }
    }
  }

  return (
    <div>
      <p className='header'>New password:</p>
      <p>
        <input onChange={e => { setPassword1(e.target.value); setPassword1Color('white') }} value={password1} onFocus={e => { if (password1 === "Password" || password1 === "Enter a valid password") setPassword1("") }} onBlur={e => { if (e.target.value === "") { setPassword1("Password"); setPassword1Color('grey') } }} style={{ color: password1Color }}></input>
      </p>
      <p className='header'>Password again:</p>
      <p>
        <input onChange={e => { setPassword2(e.target.value); setPassword2Color('white') }} value={password2} onFocus={e => { if (password2 === "Password" || password2 === "Passwords do not match!") setPassword2("") }} onBlur={e => { if (e.target.value === "") { setPassword2("Password"); setPassword2Color('grey') } }} style={{ color: password2Color }}></input>
      </p>
      <button onClick={changePassword}>submit</button>

    </div>
  )
}

export default PasswordQuery