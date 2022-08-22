import React, { useState } from 'react'
import './RegisterPage.css'


function BirthDateQuery(props) {
    const [doAgree, setDoAgree] = useState(false);
    const [day, setDay] = useState(props.birthDateDay);
    const [dayColor, setDayColor] = useState('grey');
    const [month, setMonth] = useState(props.birthDateMonth);
    const [monthColor, setMonthColor] = useState('grey');
    const [year, setYear] = useState(props.birthDateYear);
    const [yearColor, setYearColor] = useState('grey');
    const [error, setError] = useState("");
    function previousStep() {
        props.previousStep();
    }
    function nextStep() {
        let errorFlag = false;
        if ( !(/^[0-9]+$/.test(year)) || year < 1900 || year > 2020) {
            setYearColor("firebrick");
            errorFlag = true;
        }
        if (!(/^[0-9]+$/.test(month)) || month < 1 || month > 12) {
            setMonthColor("firebrick");
            errorFlag = true;
        }
        if (!(/^[0-9]+$/.test(day)) || day < 1 || day > 31) {
            setDayColor("firebrick");
            errorFlag = true;
        }
        if (errorFlag) {
            setError("Please enter a valid date");
        }
        else {
            props.submitBirthDateDay(day);
            props.submitBirthDateMonth(month);
            props.submitBirthDateYear(year);
            props.nextStep();
        }
    }
    return (
        <div>
            <p>birthDate</p>
            <p className='birth-date'>
                <input onChange={e => { setDay(e.target.value); setDayColor('white') }} value={day} onFocus={e => { if (day === "Day") setDay("") }} onBlur={e => { if (e.target.value === "") { setDay("Day"); setDayColor('grey') } }} style={{ color: dayColor }}></input>
                /<input onChange={e => { setMonth(e.target.value); setMonthColor('white') }} value={month} onFocus={e => { if (month === "Month") setMonth("") }} onBlur={e => { if (e.target.value === "") { setMonth("Month"); setMonthColor('grey') } }} style={{ color: monthColor }}></input>
                /<input onChange={e => { setYear(e.target.value); setYearColor('white') }} value={year} onFocus={e => { if (year === "Year") setYear("") }} onBlur={e => { if (e.target.value === "") { setYear("Year"); setYearColor('grey') } }} style={{ color: yearColor }}></input>
            </p>
            <p style={{ color: "firebrick" }}>{error}</p>
            <input type="checkbox" checked={doAgree} onChange={() => setDoAgree(!doAgree)} /> I agree to the terms and service.
            <p></p>
            <button onClick={previousStep}>previous</button>
            <button onClick={nextStep} disabled={!doAgree}>next</button>
        </div>

    )
}

export default BirthDateQuery