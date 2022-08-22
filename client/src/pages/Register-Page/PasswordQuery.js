import React, { useState } from 'react'

function PasswordQuery(props) {
    const [password1Color, setPassword1Color] = useState("grey");
    const [password2Color, setPassword2Color] = useState("grey");
    const [password1, setPassword1] = useState(props.password);
    const [password2, setPassword2] = useState(props.password);
    function nextStep() {
        if (password1.includes(" ")) {
            setPassword1("Enter a valid password");
            setPassword1Color("firebrick");
        }
        else {
            if (password1 != password2) {
                setPassword2("Passwords do not match!");
                setPassword2Color("firebrick");
            } else {
                props.submitPassword(password1);
                props.nextStep();
            }
        }
    } 
    function previousStep() {
        props.previousStep();
    }
    return (
        <div>
            <p className='header'>Password:</p>
            <p>
                <input onChange={e => { setPassword1(e.target.value); setPassword1Color('white') }} value={password1} onFocus={e => { if (password1 === "Password" || password1 === "Enter a valid password") setPassword1("") }} onBlur={e => { if (e.target.value === "") { setPassword1("Password"); setPassword1Color('grey') } }} style={{ color: password1Color }}></input>
            </p>
            <p className='header'>Password again:</p>
            <p>
                <input onChange={e => { setPassword2(e.target.value); setPassword2Color('white') }} value={password2} onFocus={e => { if (password2 === "Password" || password2 === "Passwords do not match!") setPassword2("") }} onBlur={e => { if (e.target.value === "") { setPassword2("Password"); setPassword2Color('grey') } }} style={{ color: password2Color }}></input>
            </p>
            <button onClick={previousStep}>previous</button>
            <button onClick={nextStep}>next</button>
        </div>
    )
}

export default PasswordQuery