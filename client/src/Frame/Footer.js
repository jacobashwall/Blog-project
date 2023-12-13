import React from 'react';
import { Paper, Typography } from '@mui/material';

function Footer() {
  return (
    <Paper elevation={-1} sx={{backgroundColor:"#D3D3D3", marginTop:"1vh"}}>
      <Typography variant="caption" gutterBottom = {true}>First published 2022 by Jacob Shalev &trade;, Petah-Tikva, a division of a larger and more powerful company called JCT Inc., which is wealthier and more populous than eighteen of the fifty states of America, all of Central America, and all of the former Soviet Republic combined and tripled. That said, no matter how big such companies are, and how many things they own, or how much money they have or make or control, their influence over the daily lives and hearts of individuals, and thus, like ninety-nine percent of what is done by official people in cities like Washington, or Moscow, of Sao Paulo or Auckland, their effect on the short, fraught lives of human beings who limp around and sleep and dream of flying through bloodstreams, who love the smell of rubber cement and think of space travel while having intercourse, is very very small, and so hardly worth worrying about.</Typography>
      <br></br>
      <Typography variant="caption" gutterBottom>Copyright © Jacob (Jonthan) Shalev 2022.</Typography>
      <br></br>
      <Typography variant="caption" gutterBottom>Height: 1.71m; Weight: you wish; Eyes: brown; Hair: black; Hands: chubbier and smaller than one would expect; Allergies: dust, feathers, olive tree blossom and cockroach feces; Place on sexual-orientation scale, with one being perfectly straight, and 10 being perfectly gay: confidential.</Typography>
    </Paper>
  )
}

export default Footer