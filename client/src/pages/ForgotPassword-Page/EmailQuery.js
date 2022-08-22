import React, { useState } from 'react';
const axios=require("axios");

function EmailQuery(props) {
    const [email, setEmail] = useState(props.email);
    const [emailColor, seEmailColor] = useState("grey");
    const url = "http://localhost:5000"
    function nextStep() {
        if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {// - /^[a-zA-Z_](\.[0-9a-zA-Z_])*@([a-z])+\.((co\.([a-z]{2})) | com)$/ why wont work?
            axios.post(`${url}/forgot-password-email-check`,
                {
                    email: email,
                })
                .then((response) => {
                    let username = response.data;
                    if (username) {
                        props.submitUsername(username);
                        props.submitEmail(email)
                        props.nextStep();
                    }
                    else {
                        setEmail("Email not found!");
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
    return (
        <div>
            <p>EmailQuery</p>
            <p>
                <input onChange={e => { setEmail(e.target.value); seEmailColor('white') }} value={email} onFocus={e => { if (email === "Email" || email === "Invalid email" || email === "Email not found!") setEmail("") }} onBlur={e => { if (e.target.value === "") { setEmail("Email"); seEmailColor('grey') } }} style={{ color: emailColor }}></input>
            </p>
            <button onClick={nextStep}>submit</button>
        </div>

    )
}

export default EmailQuery