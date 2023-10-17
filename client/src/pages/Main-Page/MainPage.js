import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState, useRef} from 'react'
import create from './create.png';
import read from './read.png';
import explore from './explore.png';
import slogan from './slogan.png';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import axios from 'axios';
import {Button, Typography, Skeleton, Grid,Paper } from '@mui/material'



function MainPage() {
  const [slideStep, setSlideStep] = useState(3)
  const [recBlogs, setRecBlogs] = useState(null)
  const startHereRef = useRef(null);
  const url = SERVER_URL;
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
     onClick={()=>{ startHereRef.current?.scrollIntoView({ behavior: 'smooth' })}} component={motion.div}
     animate={{ y:["0vh","-10vh","0vh"] }} 
     transition={{duration: 2, ease: "easeInOut", times: [0, 0.5, 1], repeat: Infinity, repeatDelay: 1}}
     >Start Now!</Button>
  </Paper>
  ]
  const getRecBlogs = () => {
      axios.post(`${url}/get-rec-blogs`)
          .then((response) => {
              setRecBlogs(response.data);
          })
          .catch((error) => {
              console.error(`ERROR: ${error}`);
          });
  }
  useEffect(() => {
    /*setInterval(() => {
      setSlideStep((slideStep + 1) % 4)

    }, 5000);*/
    getRecBlogs();
  }
    , [slideStep])

  function FormRow() {
      return (
        <React.Fragment>
          <Grid item >
            <Skeleton  animation="wave" sx={{height:"70vh",width:"20vw"}}></Skeleton>
          </Grid>
          <Grid item>
            <Skeleton  animation="wave"  sx={{height:"70vh",width:"20vw"}}></Skeleton>
          </Grid>
          <Grid item>
            <Skeleton animation="wave"   sx={{height:"70vh",width:"20vw"}}></Skeleton>
          </Grid>
        </React.Fragment>
      );
    }

  return (
    <div>
      <AnimatePresence initial={false} mode="wait">
        {
          slides[slideStep]
        }
      </AnimatePresence>
      <Paper>
        <Paper ref ={startHereRef} sx ={{height:"10vh"}} elevation={0}/>
        <Typography variant="h4">Welcome to OverBlog</Typography>
        <Typography variant="h5">The best place to create and share your blogs.</Typography>
        <Typography variant="h6">Here are some of our recommended blog!</Typography>
        {recBlogs?
        <Paper sx ={{height:500}}/>
        :
        <Grid sx={{width:"80vw", height:"210vh"}} container >
        <Grid sx={{height:"70vh"}} container item justifyContent="space-evenly">
          <FormRow />
        </Grid>
        <Grid sx={{height:"70vh"}} container item justifyContent="space-evenly">
          <FormRow />
        </Grid>
        <Grid sx={{height:"70vh"}} container item justifyContent="space-evenly">
          <FormRow/>
        </Grid>
      </Grid>}
        <Typography variant="h6">Create your own blog now!</Typography>
      </Paper>
    </div>
  )
}

export default MainPage