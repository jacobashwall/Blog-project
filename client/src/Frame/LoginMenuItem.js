import React, { useState, useContext } from 'react'
import { MenuItem, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField, Button, CircularProgress, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
const axios = require("axios")
const url = SERVER_URL;
import { UsernameContext } from '../UsernameConetxt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';


function LoginMenuItem(props) {
  const [usernameCheck, setUsernameCheck] = useState("")
  const [passwordCheck, setPasswordCheck] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)
  const [isCorrectPassword, setIsCorrectPassword] = useState(false)
  const { username, setUsername } = useContext(UsernameContext)
  const navigate = useNavigate()

  function login() {
    //navigate("./Jacob/6374bb23e8fcbeb9dfa7736c/Edit")

    axios.post(`${url}/login-check`,
      {
        username: usernameCheck,
        password: passwordCheck
      })
      .then((response) => {
        let pass = response.data;
        console.log(pass);
        if (pass == true) {
          setUsername(usernameCheck);
          setIsNotFound(false)
          setIsCorrectPassword(false)
          navigate(`./${usernameCheck}/Main`);
        }
        else {
          if (pass == "username not found") {
            setIsNotFound(true)
          }
          if (pass == "incorrect password") {
            setIsCorrectPassword(true)
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const handleClose = () => {
    props.setLoginOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <Dialog open={props.loginOpen} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField error={isNotFound} helperText={isNotFound ? "Username is not found!" : ""} variant="outlined" margin="normal" fullWidth label="Username"
          onChange={e => { setUsernameCheck(e.target.value); }}
          value={usernameCheck} >
        </TextField>
        <TextField fullWidth variant="outlined"

          type={showPassword ? 'text' : 'password'}
          value={passwordCheck}
          error={isCorrectPassword}
          onChange={e => setPasswordCheck(e.target.value)}
          label="Password"
          InputProps={{
            endAdornment: 
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }}>
        </TextField>
        <DialogContentText>New here?</DialogContentText>
        <Button variant="contained" onClick={() => { handleClose(); navigate("./Register") }}>Register</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => { login() }}>Login</Button>
      </DialogActions>
    </Dialog >
  )
}

export default LoginMenuItem

