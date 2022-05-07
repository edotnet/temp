import React from 'react'
import { Box } from "@mui/material";
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import { ModalPaper } from '../../infrastructure/components/ModalPaper';
import { useDashboardContext } from "./context/useDashboarContext";
import { AdverseEffectsInfo } from "./adverse-effects/AdverseEffectsInfo";


export const AdverseEffects = () => {
  const {state} = useDashboardContext()

  if (!state.selectedMolecule) {
    return null;
  }
  return (
    <ModalPaper>
      <Box sx={{display: 'flex', flexDirection: 'row'}} p={2}>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <Box sx={{
            borderRadius: 2,
            mr: 2,
            width: 50,
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <PersonRemoveAlt1OutlinedIcon color='info' sx={{height: 30, width: 30}}/>
          </Box>
        </Box>
        <AdverseEffectsInfo/>
      </Box>
    </ModalPaper>
  )
}
