import { AnimatePresence, motion } from 'framer-motion'
import {Button, Paper } from '@mui/material'
import React, { useEffect, useState, useRef} from 'react'
import create from './create.png';
import read from './read.png';
import explore from './explore.png';
import slogan from './slogan.png';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const Slides = (props) => {
    const [slideStep, setSlideStep] = useState(0)

    useEffect(() => {
        setInterval(() => {
          setSlideStep((slideStep + 1) % 4)
    
        }, 5000);
    })

    const slides = [
        <Paper key={1} sx={{ height: "85vh", width: "80vw" }} elevation={10}
          component={motion.div} transition={{ ease: "linear" }} initial={{ x: "100vw" }} animate={{ x: 0 }} exit={{ x: "-100vw" }} >
          <img
            src={create}
            alt="create description"
            height={"100%"}
            width={"100%"}
          />
        </Paper>,
        <Paper key={2} sx={{ height: "85vh", width: "80vw" }} elevation={10}
          component={motion.div} transition={{ ease: "linear" }} initial={{ x: "100vw" }} animate={{ x: 0, y: 0 }} exit={{ x: "-100vw" }}>
          <img
            src={read}
            alt="create description"
            height={"100%"}
            width={"100%"}
          />
        </Paper>
        , <Paper key={3} sx={{ height: "85vh", width: "80vw" }} elevation={10}
          component={motion.div} transition={{ ease: "linear" }} initial={{ x: "100vw" }} animate={{ x: 0, y: 0 }} exit={{ x: "-100vw" }}>
          <img
            src={explore}
            alt="create description"
            height={"100%"}
            width={"100%"}
          />
        </Paper>
        , <Paper key={4} sx={{ height: "85vh", width: "80vw" }} elevation={10}
        component={motion.div} transition={{ ease: "linear" }} initial={{ x: "100vw" }} animate={{ x: 0, y: 0 }} exit={{ x: "-100vw" }}>
        <img
          src={slogan}
          alt="create description"
          height={"80%"}
          width={"80%"}
        />
        <br></br>
        <Button key={0} startIcon = {<KeyboardDoubleArrowDownIcon/>} endIcon={<KeyboardDoubleArrowDownIcon/>} size="large" variant="text"
         onClick={()=>{ props.startHereRef.current?.scrollIntoView({ behavior: 'smooth' })}} component={motion.div}
         animate={{ y:["0vh","-10vh","0vh"] }} 
         transition={{duration: 2, ease: "easeInOut", times: [0, 0.5, 1], repeat: Infinity, repeatDelay: 1}}
         >Start Now!</Button>
      </Paper>
      ]
    return (
        <AnimatePresence initial={false} mode="wait">
        {
          slides[slideStep]
        }
      </AnimatePresence>
    );
};

export default Slides;
