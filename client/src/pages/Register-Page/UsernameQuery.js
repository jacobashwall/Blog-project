import { Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
const axios = require("axios")
const url = SERVER_URL

function NameQuery(props) {
  const [isAlreadyExist, setIsAlreadyExist] = useState(false)
  const [isNotValid, setIsNotValid] = useState(false)

  useEffect(() => { props.setCanContinue(false) }, [])

  function checkUsername() {
    if (props.username.includes(" ") || props.username == "") {//maybe add more special characters
      setIsNotValid(true);
    }
    else {//check if username already exist in database
      setIsNotValid(false)
      axios.post(`${url}/new-user-username-check`,
        {
          username: props.username,
        })
        .then((response) => {
          let isExist = response.data;
          console.log(isExist);
          if (!isExist) {
            setIsAlreadyExist(false)
            props.setCanContinue(true)
          }
          else {
            setIsAlreadyExist(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <Paper sx={{minWidth:500, minHeight:500}}>
      <Typography>Choose a username:</Typography>
      <TextField
        error={isNotValid || isAlreadyExist}
        helperText={(isNotValid ? "Please enter a valid username!" : (isAlreadyExist ? "Username already exists!" : ""))}
        variant="filled"
        onChange={e => { props.setUsername(e.target.value) }}
        onBlur={checkUsername}
        value={props.username}
        label="Username">
      </TextField>
    </Paper>
  )
}

export default NameQuery