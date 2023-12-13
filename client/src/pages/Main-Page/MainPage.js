import React, { useEffect, useState, useRef} from 'react'
import axios from 'axios';
import {Typography, Skeleton, Grid,Paper } from '@mui/material'
import Slides from './slides';

function MainPage() {
  const [recBlogs, setRecBlogs] = useState(null)
  const startHereRef = useRef(null);
  const url = SERVER_URL;
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
    getRecBlogs();
  })

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
      <Slides startHereRef={startHereRef}/>
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