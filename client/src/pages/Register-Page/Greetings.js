import { Button, Paper, Typography } from '@mui/material'
import React from 'react'
import { motion } from 'framer-motion'

function Greetings(props) {
  return (
    <Paper sx={{ minWidth: 500, minHeight: 500 }} component={motion.div} exit={{ x: "-100vw" }} key={props.key}>
      <Typography>Thank you for choosing BlogSite!</Typography>
      <Typography>But first we need to know you a little bit better...</Typography>
      <Typography>Just a few minutes for endless possiblities!</Typography>
      <Button onClick={props.handleNext}>Start</Button>
    </Paper>
  )
}

export default Greetings