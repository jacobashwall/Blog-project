import { Button, Paper, Typography } from '@mui/material'
import React from 'react'

function Greetings(props) {
  return (
    <Paper sx={{ minWidth: 500, minHeight: 500 }}>
      <Typography>Thank you for choosing BlogSite!</Typography>
      <Typography>But first we need to know you a little bit better...</Typography>
      <Typography>Just a few minutes for endless possiblities!</Typography>
      <Button onClick={props.handleNext}>Start</Button>
    </Paper>
  )
}

export default Greetings