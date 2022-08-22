import React, { useState } from 'react'
import EmailQuery from './EmailQuery';
import VerifyAccount from './VerifyAccount';
import PasswordQuery from './PasswordQuery';
import './ForgotPasswordPage.css';

function ForgotPasswordPage() {
  const [username, setUsername] = useState("Username");
  const [email, setEmail] = useState("Email");
  const [step, setStep] = useState(0);

  function nextStep() {
    setStep(step + 1);
  }

  const queries = [
    <EmailQuery email={email} nextStep={nextStep} submitEmail={setEmail} submitUsername={setUsername} />,
    <VerifyAccount email={email} username={username} nextStep={nextStep}/>,
    <PasswordQuery email={email} username={username} password={"Password"}/>];
  return (
    <div>
      <h1>forgot password</h1>
      <div className='forgot-password-box' >
        {queries[step]}
      </div>
    </div>
  )
}


export default ForgotPasswordPage