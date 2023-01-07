import { Paper } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

function MainPage() {
  const [slideStep, setSlideStep] = useState(0)
  const slides = [
    <Paper key={1} sx={{ height: "90vh", width: "90vw" }}
    component={motion.div} transition={{ease: "linear"}} initial={{ x: "100vw" }} animate={{x:0}} exit={{ x: "-100vw" }} >
      slide1
    </Paper>,
    <Paper key={2} sx={{ height: "90vh", width: "90vw" }}
    component={motion.div} transition={{ease: "linear"}} initial={{ x: "100vw"}} animate={{x:0, y:0}} exit={{ x: "-100vw"}}>
      slide2
    </Paper>
    , <Paper key={3} sx={{ height: "90vh", width: "90vw" }}
    component={motion.div} transition={{ease: "linear"}} initial={{ x: "100vw" }} animate={{x:0, y:0}} exit={{ x: "-100vw"}}>
      slide3
    </Paper>
  ]
  useEffect(() => {
    setInterval(() => {
      setSlideStep((slideStep + 1) % 3)
      
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