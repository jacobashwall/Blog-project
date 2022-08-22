import React, { useState } from 'react'
const axios=require("axios")
const url = "http://localhost:5000"

function NameQuery(props) {
  const [userNameColor, setUserNameColor] = useState("grey");
  const [userName, setUserName] = useState(props.username);
  function nextStep() {
    if (userName.includes(" ")) {//maybe add more special characters
      setUserName("Enter a valid username");
      setUserNameColor("firebrick");
    }
    else {//check if username already exist in database
      axios.post(`${url}/new-user-username-check`,
      {
        username: userName,
      })
      .then((response) => {
        let isExist=response.data;
        console.log(isExist);
        if (isExist) {
          setUserName("Username already exist!");
          setUserNameColor("firebrick");
        }
        else {
          props.submitUsername(userName);
          props.nextStep();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
  return (
    <div>
      <p className='header'>Username:</p>
      <p>
        <input onChange={e => { setUserName(e.target.value); setUserNameColor('white') }} value={userName} onFocus={e => { if (userName === "User Name" || userName === "Username already exist!" || userName === "Enter a valid username") setUserName("") }} onBlur={e => { if (e.target.value === "") { setUserName("User Name"); setUserNameColor('grey') } }} style={{ color: userNameColor }}></input>
      </p>
      <button onClick={nextStep}>next</button>
    </div>
  )
}

export default NameQuery