import { Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'


function BirthDateQuery(props) {
    const [dayError, setDayError] = useState(true)
    const [monthError, setMonthError] = useState(true)
    const [yearError, setYearError] = useState(true)
    useEffect(() => checkDay(), [props.day])
    useEffect(() => checkMonth(), [props.month])
    useEffect(() => checkYear(), [props.year])
    useEffect(() => { props.setCanContinue((!dayError) && (!monthError) && (!yearError)) }, [dayError, monthError, yearError])
    function checkDay() {
        if ((/^[0-9]+$/.test(props.day)) && props.day >= 1 && props.day <= 31) {
            setDayError(false)
        }
        else {
            setDayError(true)
        }
    }
    function checkMonth() {
        if ((/^[0-9]+$/.test(props.month)) && props.month >= 1 && props.month <= 12) {
            setMonthError(false)
        }
        else {
            setMonthError(true)
        }
    }
    function checkYear() {
        if ((/^[0-9]+$/.test(props.year)) && props.year >= 1900 && props.year <= 2022) {
            setYearError(false)
        }
        else {
            setYearError(true)
        }
    }
    return (
        <Paper sx={{minWidth:500, minHeight:500}}>
            <TextField sx={{ width: "80px" }}
                error={dayError && props.day != ""}
                helperText={(dayError && props.day != "") ? "Invalid day!" : ""}
                variant="filled"
                onChange={e => { props.setDay(e.target.value) }}
                value={props.day}
                inputProps={{ style: { textAlign: 'center' } }}
                label="Day">
            </TextField>
            <Typography>/</Typography>
            <TextField sx={{ width: "80px" }}
                error={monthError && props.month != ""}
                helperText={(monthError && props.month != "") ? "Invalid month!" : ""}
                variant="filled"
                onChange={e => { props.setMonth(e.target.value) }}
                value={props.month}
                inputProps={{ style: { textAlign: 'center' } }}
                label="Month">
            </TextField>
            <Typography>/</Typography>
            <TextField sx={{ width: "160px" }}
                error={yearError && props.year != ""}
                helperText={(yearError && props.year != "") ? "Invalid year!" : ""}
                variant="filled"
                onChange={e => { props.setYear(e.target.value) }}
                value={props.year}
                inputProps={{ style: { textAlign: 'center' } }}
                label="Year">
            </TextField>
        </Paper>

    )
}

export default BirthDateQuery