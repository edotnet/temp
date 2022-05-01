import React from 'react'
import './style.css';
import { Box, Grid, LinearProgress, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';

export const ProgressWidget = () => {
  return (/*
    <>
      <div className="progressWidget">
        <div className='progressWidget__avatar'>
          <ManageAccountsIcon color='primary' />
        </div>
        <div className='progressWidget__info'>
                    <span className='progressWidget__info--title'>
                        Adverse effect & contraindications
                    </span>

          <div className='progressWidget__info--pWrapper'>
            <span className='progressWidget__info--count'>546</span>
            <span className='progressWidget__info--progressBar'>
                            <span className="pBar pBar1"/>
                            <span className="pBar pBar2"/>
                        </span>
          </div>
        </div>
      </div>
    </>*/
    <Box sx={{display: 'flex'}}>
      <Box sx={{borderRadius: 2, mr: 2, width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <PersonRemoveAlt1OutlinedIcon color='info' sx={{height: 40, width: 40}}/>
      </Box>
      <Box>
        <Typography sx={{fontSize: 17, fontWeight: '500'}}>Adverse effects & contraindications</Typography>
        <Box sx={{display: 'flex'}}>
          <Box>
            <Typography sx={{fontSize: 20, fontWeight: 500}}>546</Typography>
          </Box>
          <Grid container spacing={2} sx={{alignItems: 'center', pl: 2}}>
            <Grid item xs={6}>
              <LinearProgress variant="determinate" value={50} color="secondary" sx={{height: 10, borderRadius: 10, backgroundColor: 'rgba(219, 223, 241, 1)'}}/>
            </Grid>
            <Grid item xs={6}>
              <LinearProgress variant="determinate" value={25} color="error" sx={{height: 10, borderRadius: 10, backgroundColor: 'rgba(219, 223, 241, 1)'}}/>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
