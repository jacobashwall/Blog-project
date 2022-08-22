import React from 'react'
import './RegisterPage.css'
import EmailQuery from './EmailQuery'
import { useState } from 'react'
import UsernameQuery from './UsernameQuery';
import PasswordQuery from './PasswordQuery';
import BirthDateQuery from './BirthDateQuery';
import { useNavigate } from 'react-router-dom';
import VerifyAccount from './VerifyAccount';
const axios = require("axios");

function RegisterPage() {
  const [username, setUsername] = useState("User Name");
  const [password, setPassword] = useState("Password");
  const [email, setEmail] = useState("Email");
  const [doMail, setDoMail] = useState(false);
  const [birthDateDay, setBirthDateDay] = useState("Day");
  const [birthDateMonth, setBirthDateMonth] = useState("Month");
  const [birthDateYear, setBirthDateYear] = useState("Year");
  const [step, setStep] = useState(0);
  let navigate=useNavigate();
  function nextStep() {
    setStep(step + 1);
  }
  function previousStep() {
    setStep(step - 1);
  }

  const url = SERVER_URL
  function submitInfo() {
    let date=new Date(birthDateYear,birthDateMonth,birthDateDay);
    axios.post(`${url}/new-user`,
      {
        username: username,
        password: password,
        email: email,
        doMail: doMail,
        birthDate: date
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("submit");
    navigate("../Blog/"+username);
  }
  const queries = [<UsernameQuery username={username} nextStep={nextStep} submitUsername={setUsername} />,
  <PasswordQuery password={password} nextStep={nextStep} previousStep={previousStep} submitPassword={setPassword} />,
  <EmailQuery email={email} doMail={doMail} nextStep={nextStep} previousStep={previousStep} submitEmail={setEmail} submitDoMail={setDoMail} />,
  <BirthDateQuery birthDateDay={birthDateDay} birthDateMonth={birthDateMonth} birthDateYear={birthDateYear} previousStep={previousStep} nextStep={nextStep} submitBirthDateDay={setBirthDateDay} submitBirthDateMonth={setBirthDateMonth} submitBirthDateYear={setBirthDateYear}/>,
  <VerifyAccount email={email} username={username} submitInfo={submitInfo}/>];
  return (
    <div>
      <h1>Register</h1>
      <div className='register-box' >
        {queries[step]}
        <br></br>
        <a href='./'>already have an account?</a>
      </div>
    </div>
  )
}

export default RegisterPage