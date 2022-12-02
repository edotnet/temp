import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Typography } from '@mui/material'
import React, { memo } from 'react'

const MapFilter = ({ filteredDiseases, setFilteredDiseases }) => {
  return (
    <Accordion defaultExpanded={true} sx={{ mt: '0 !important' }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Filter</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl>
          <FormLabel>Diseases</FormLabel>
          <FormGroup>
            {Object.entries(filteredDiseases.diseases).map(([key, value]) => <FormControlLabel
              key={key}
              label={key}
              control={
                <Checkbox 
                  checked={value} 
                  onChange={e => setFilteredDiseases(prev => ({ ...prev, diseases: { ...prev.diseases, [e.target.name]: e.target.checked } }))} 
                  name={key} 
                />
              }
            />)}
          </FormGroup>
        </FormControl>
        <>
          <Typography>By country</Typography>
          <TextField variant='standard' label='Country' fullWidth value={filteredDiseases.byCountry} onChange={e => setFilteredDiseases(prev => ({ ...prev, byCountry: e.target.value }))} />
        </>
      </AccordionDetails>
    </Accordion>
  )
}

export default memo(MapFilter)