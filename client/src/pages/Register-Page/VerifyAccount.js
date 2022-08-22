import React, { useState, useEffect } from 'react';
const axios = require("axios");
import Reaptcha from 'reaptcha';

function VerifyAccount(props) {
  const [verificationCode, setVarificationCode] = useState("Verification Code");
  const [codeColor, setCodeColor] = useState("grey");
  const [isHuman, setIsHuman] = useState(false);
  const url = SERVER_URL;
  const captchaSiteKey = "6Ld9CJchAAAAAAilSyF7kvbpzM8nrVsbmgWpmgYq";

  const onVerify = (recaptchaResponse) => {
    setIsHuman(true);
  };

  useEffect(() => {
    sendMail();
  }, []);

  function sendMail() {
    axios.post(`${url}/email-verification-send-code`,
      {
        username: props.username,
        email: props.email
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function submit(e) {
    if(isHuman){
    axios.post(`${url}/email-verification-check-code`,
      {
        username: props.username,
        email: props.email,
        code: verificationCode
      })
      .then((response) => {
        console.log(response.data)
        if (response.data == true) {
          props.submitInfo();
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
    else{
      setVarificationCode("Beep Boop, you are a robot.");
      setCodeColor("firebrick")
    }
  }
  return (
    <div>
      <p>Verification code has been sent to your mail:</p>
      <p>{props.email}</p>
      <input onChange={e => { setVarificationCode(e.target.value); setCodeColor('white') }} value={verificationCode} onFocus={e => { if (verificationCode === "Verification Code" || verificationCode === "Invalid code" || verificationCode === "Beep Boop, you are a robot.") setVarificationCode("") }} onBlur={e => { if (e.target.value === "") { setVarificationCode("Verification Code"); setCodeColor('grey') } }} style={{ color: codeColor }}></input>
      <Reaptcha sitekey={captchaSiteKey} onVerify={onVerify} theme={'dark'} />
      <button onClick={submit}>submit</button>
      <p><b>I dident get any mail!</b></p>
      <p>Please check your spam.</p>
      <p>or</p>
      <button onClick={sendMail}>resend mail</button>
    </div>
  )
}

export default VerifyAccount