import React from 'react'
import { Box, Grid, LinearProgress, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import { ModalPaper } from '../../infrastructure/components/ModalPaper';
import { useDashboardContext } from "./context/useDashboarContext";

export const AdverseEffects = () => {
  const {state} = useDashboardContext()
  if (!state.selectedMolecule) {
    return null;
  }
  const sumEffects = () => {
    
  }
  return (
    <ModalPaper>
    <Box sx={{display: 'flex', flexDirection: 'row'}} p={2}>      
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Box sx={{borderRadius: 2, mr: 2, width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <PersonRemoveAlt1OutlinedIcon color='info' sx={{height: 30, width: 30}}/>
        </Box>
      </Box>      
      <Box>
        <Typography sx={{fontSize: 17, fontWeight: '500'}}>Adverse effects & contraindications</Typography>
        <Box sx={{display: 'flex'}}>
          <Box>
            <Typography sx={{fontSize: 20, fontWeight: 500}}>546</Typography>
          </Box>
          <Grid container spacing={1} sx={{alignItems: 'center', pl: 2}}>
            <Grid item xs={6}>
              <LinearProgress variant="determinate" value={50} color="info" sx={{height: 10, borderRadius: 10, backgroundColor: 'rgba(219, 223, 241, 1)'}}/>
            </Grid>
            <Grid item xs={6}>
              <LinearProgress variant="determinate" value={25} color="error" sx={{height: 10, borderRadius: 10, backgroundColor: 'rgba(219, 223, 241, 1)'}}/>
            </Grid>
          </Grid>
        </Box>
      </Box>      
    </Box>
    </ModalPaper>
  )
}
