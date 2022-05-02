import React, { useMemo } from 'react'
import { Box, Grid, LinearProgress, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import { ModalPaper } from '../../infrastructure/components/ModalPaper';
import { useDashboardContext } from "./context/useDashboarContext";

export const AdverseEffects = () => {
  const {state} = useDashboardContext()
  const sumEffects = useMemo(() => {
    if (!state.selectedMolecule) {
      return 0;
    }
    let total = 0;
    let adverseEffects = 0;
    let contraindications = 0;
    if (state.selectedMolecule.structured_adverse_effects && state.selectedMolecule.structured_adverse_effects.length) {
      adverseEffects = state.selectedMolecule.structured_adverse_effects.length;
      total += adverseEffects
    }
    if (state.selectedMolecule.structured_contraindications && state.selectedMolecule.structured_contraindications.length) {
      contraindications = state.selectedMolecule.structured_adverse_effects.length;
      total += contraindications;
    }
    return {
      total,
      adverseEffects: adverseEffects > 100 ? 100 : adverseEffects,
      contraindications: contraindications > 100 ? 100 : contraindications,
    };
  }, [state.selectedMolecule])

  if (!state.selectedMolecule) {
    return null;
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
            <Typography sx={{fontSize: 20, fontWeight: 500}}>{sumEffects.total}</Typography>
          </Box>
          <Grid container spacing={1} sx={{alignItems: 'center', pl: 2}}>
            <Grid item xs={6}>
              <LinearProgress variant="determinate" value={sumEffects.adverseEffects} color="info" sx={{height: 10, borderRadius: 10, backgroundColor: 'rgba(219, 223, 241, 1)'}}/>
            </Grid>
            <Grid item xs={6}>
              <LinearProgress variant="determinate" value={sumEffects.contraindications} color="error" sx={{height: 10, borderRadius: 10, backgroundColor: 'rgba(219, 223, 241, 1)'}}/>
            </Grid>
          </Grid>
        </Box>
      </Box>      
    </Box>
    </ModalPaper>
  )
}
