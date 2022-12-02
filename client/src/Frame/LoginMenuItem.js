import React, { useState,useContext } from 'react'
import {MenuItem, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField, Button, CircularProgress } from '@mui/material';
const axios = require("axios")
const url = SERVER_URL;
import { UsernameContext } from '../UsernameConetxt';


function LoginMenuItem(props) {
  const [usernameCheck, setUsernameCheck] = useState("")
  const [passwordCheck, setPasswordCheck] = useState("")
  const { username, setUsername } = useContext(UsernameContext)

  const handleClose = () => {
    props.setLoginOpen(false);
  };

  return (
    <Dialog open={props.loginOpen} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField variant="standard" margin="normal" fullWidth label="Username"
            onChange={e => { setUsernameCheck(e.target.value); }}
            value={usernameCheck}>
          </TextField>
          <TextField variant="standard" margin="normal" fullWidth label="Password"
            onChange={e => { setPasswordCheck(e.target.value); }}
            value={passwordCheck}>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{handleClose;setUsername(usernameCheck)}}>Login</Button>
        </DialogActions>
      </Dialog>
  )
}

export default LoginMenuItem

