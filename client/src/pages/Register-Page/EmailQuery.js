import React, { useState } from 'react';
const axios=require("axios")
const url = "http://localhost:5000"

function EmailQuery(props) {
    const [emailColor, seEmailColor] = useState("grey");
    const [email, setEmail] = useState(props.email);
    const [doMail, setDoMail] = useState(props.doMail);
    function nextStep() {
        if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {// - /^[a-zA-Z_](\.[0-9a-zA-Z_])*@([a-z])+\.((co\.([a-z]{2})) | com)$/ why wont work?
            axios.post(`${url}/new-user-email-check`,
            {
              email: email,
            })
            .then((response) => {
              let isExist=response.data;
              console.log(isExist);
              if (!isExist) {
                props.submitEmail(email);
                props.submitDoMail(doMail);
                props.nextStep();
              }
              else {
                setEmail("Email already in use!");
                seEmailColor("firebrick")
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
        else {
            setEmail("Invalid email");
            seEmailColor("firebrick")
        }
    }
    function previousStep() {
        props.previousStep();
    }

    return (
        <div>
            <p className='header'>Email:</p>
            <p>
                <input onChange={e => { setEmail(e.target.value); seEmailColor('white') }} value={email} onFocus={e => { if (email === "Email" || email === "Invalid email"|| email === "Email already in use!") setEmail("") }} onBlur={e => { if (e.target.value === "") { setEmail("Email"); seEmailColor('grey') } }} style={{ color: emailColor }}></input>
            </p>
            <label><input type="checkbox" checked={doMail} onChange={() => setDoMail(!doMail)} /> I want news to be sent to my email.</label>
            <p></p>
            <button onClick={previousStep}>previous</button>
            <button onClick={nextStep}>next</button>
        </div>
    )
}

export default EmailQuery