import { Button, Paper, Typography } from '@mui/material'
import { motion } from 'framer-motion';
import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { UsernameContext } from '../../UsernameConetxt';
function Summerize() {
  let navigate=useNavigate()
  const { username, setUsername } = useContext(UsernameContext)
  return (
    <Paper sx={{ minWidth: 500, minHeight: 500 }}  component={motion.div} initial={{ x: "100vw" }} animate={{x:0}} key={props.key}>
      <Typography>Welcome {username}</Typography>
      <Typography>Thanks for joining our family!</Typography>
      <Typography>You can start creating right now.</Typography>
      <Button variant='contained' onClick={()=>{navigate(`../${username}/Main`)}}>To my workspace</Button>
      <Typography>Or return to the main menu.</Typography>
      <Button onClick={()=>{navigate('/')}} >Back to main menu</Button>
    </Paper>
  )
}

export default Summerize