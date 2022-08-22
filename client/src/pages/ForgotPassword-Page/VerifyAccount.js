import React, { useState, useEffect } from 'react';
const axios = require("axios");

function VerifyAccount(props) {
  const [verificationCode, setVarificationCode] = useState("Verification Code");
  const [codeColor, setCodeColor] = useState("grey");
  const url = SERVER_URL

  useEffect(() => {
   sendMail();
  }, []);

  function sendMail(){
    axios.post(`${url}/forgot-password-send-code`,
      {
        email: props.email,
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
    });
  }

  function submit() {
    axios.post(`${url}/forgot-password-check-code`,
      {
        email: props.email,
        code: verificationCode
      })
      .then((response) => {
        if (response.data == true) {
          props.nextStep();
        }
        else {
          setVarificationCode("Invalid code");
          setCodeColor("firebrick")
        }
      })
      .catch((error) => {
        console.log(error);
      }
      );
  }
  return (
    <div>
      <p>Greetings {props.username}!</p>
      <p>Verification code has been sent to your mail.</p>
      <input onChange={e => { setVarificationCode(e.target.value); setCodeColor('white') }} value={verificationCode} onFocus={e => { if (verificationCode === "Verification Code" || verificationCode === "Invalid code") setVarificationCode("") }} onBlur={e => { if (e.target.value === "") { setVarificationCode("Verification Code"); setCodeColor('grey') } }} style={{ color: codeColor }}></input>
      <button onClick={submit}>submit</button>
      <p><b>I dident get any mail!</b></p>
      <p>Please check your spam.</p>
      <p>or</p>
      <button onClick={sendMail}>resend mail</button>
    </div>
  )
}

export default VerifyAccount