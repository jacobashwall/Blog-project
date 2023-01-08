import { Paper, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import create from './create.png';
import read from './read.png';
import explore from './explore.png';
import slogan from './slogan.png';

function MainPage() {
  const [slideStep, setSlideStep] = useState(0)
  const slides = [
    <Paper key={1} sx={{ height: "90vh", width: "80vw" }} elevation={10}
      component={motion.div} transition={{ ease: "linear" }} initial={{ x: "100vw" }} animate={{ x: 0 }} exit={{ x: "-100vw" }} >
      <img
        src={create}
        alt="create description"
        height={"100%"}
        width={"100%"}
      />
    </Paper>,
    <Paper key={2} sx={{ height: "90vh", width: "80vw" }} elevation={10}
      component={motion.div} transition={{ ease: "linear" }} initial={{ x: "100vw" }} animate={{ x: 0, y: 0 }} exit={{ x: "-100vw" }}>
      <img
        src={read}
        alt="create description"
        height={"100%"}
        width={"100%"}
      />
    </Paper>
    , <Paper key={3} sx={{ height: "90vh", width: "80vw" }} elevation={10}
      component={motion.div} transition={{ ease: "linear" }} initial={{ x: "100vw" }} animate={{ x: 0, y: 0 }} exit={{ x: "-100vw" }}>
      <img
        src={explore}
        alt="create description"
        height={"100%"}
        width={"100%"}
      />
    </Paper>
    , <Paper key={4} sx={{ height: "90vh", width: "80vw" }} elevation={10}
    component={motion.div} transition={{ ease: "linear" }} initial={{ x: "100vw" }} animate={{ x: 0, y: 0 }} exit={{ x: "-100vw" }}>
    <img
      src={slogan}
      alt="create description"
      height={"80%"}
      width={"80%"}
    />
    <br></br>
    <Typography variant="h2">Start Now!</Typography>
  </Paper>
  ]
  useEffect(() => {
    setInterval(() => {
      setSlideStep((slideStep + 1) % 4)

    }, 5000);
  }
    , [slideStep])
  return (
    <div>
      <AnimatePresence initial={false} mode="wait">
        {
          slides[slideStep]
        }
      </AnimatePresence>
    </div>
  )
}

export default MainPage