import React from 'react'
import EmailQuery from './EmailQuery'
import { useState, useContext } from 'react'
import UsernameQuery from './UsernameQuery';
import PasswordQuery from './PasswordQuery';
import BirthDateQuery from './BirthDateQuery';
import { useNavigate } from 'react-router-dom';
import VerifyAccount from './VerifyAccount';
import { StepLabel, Stepper, Step, Button } from '@mui/material';
import Greetings from './Greetings';
import Summerize from './Summerize';
import { UsernameContext } from '../../UsernameConetxt';
import { AnimatePresence, motion } from 'framer-motion';
const axios = require("axios");

function RegisterPage() {
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [doMail, setDoMail] = useState(true);
  const [birthDateDay, setBirthDateDay] = useState("");
  const [birthDateMonth, setBirthDateMonth] = useState("");
  const [birthDateYear, setBirthDateYear] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [canContinue, setCanContinue] = useState(false)
  const { username, setUsername } = useContext(UsernameContext)
  let navigate = useNavigate();
  const stepperSteps = ['Username', 'Password', 'Birthdate', 'Email'];//summerize at the end


  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const url = SERVER_URL
  function submitInfo() {
    let date = new Date(birthDateYear, birthDateMonth, birthDateDay);
    axios.post(`${url}/new-user`,
      {
        username: newUsername,
        password: password,
        email: email,
        doMail: doMail,
        birthDate: date
      })
      .then((response) => {
        console.log(response);
        setUsername(newUsername)
        handleNext()
      })
      .catch((error) => {
        console.log(error);
      });

  }
  const queries = [
    <Greetings handleNext={handleNext} key={0}/>,
    <UsernameQuery username={newUsername} setUsername={setNewUsername} setCanContinue={setCanContinue} key={1} />,
    <PasswordQuery password={password} setPassword={setPassword} setCanContinue={setCanContinue} key={2}/>,
    <BirthDateQuery day={birthDateDay} month={birthDateMonth} year={birthDateYear} setDay={setBirthDateDay} setMonth={setBirthDateMonth} setYear={setBirthDateYear} setCanContinue={setCanContinue} key={3}/>,
    <EmailQuery email={email} setEmail={setEmail} setDoMail={setDoMail} doMail={doMail} setCanContinue={setCanContinue} key={4} />,
    <VerifyAccount email={email} username={newUsername} submitInfo={submitInfo} />,
    <Summerize />
  ];
  return (
    <div>
      <h1>Register</h1>
      <Stepper activeStep={activeStep - 1}>
        {stepperSteps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <AnimatePresence mode="wait">
        {queries[activeStep]}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {
          activeStep >= 1 && activeStep <= 4 && canContinue &&
          <Button key={1} onClick={handleNext} sx={{ mr: 1 }} component={motion.div} initial={{ y: "100vh" }} animate={{y:0}} exit={{ y: "100vh" }} disabled={!canContinue} >
            Next
          </Button>
        }
      </AnimatePresence>
      <br></br>
      <Button onClick={() => navigate('../')}>already have an account?</Button>
    </div >
  )
}

export default RegisterPage