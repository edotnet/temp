import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Typography } from '@mui/material'
import React, { memo } from 'react'

const MapFilter = ({ mapFilter, setMapFilter }) => {
  return (
    <Accordion defaultExpanded={true} sx={{ mt: '0 !important' }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Filter</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl>
          <FormLabel>Diseases</FormLabel>
          <FormGroup>
            {Object.entries(mapFilter.diseases).map(([key, value]) => <FormControlLabel
              key={key}
              label={key}
              control={
                <Checkbox 
                  checked={value} 
                  onChange={e => setMapFilter(prev => ({ ...prev, diseases: { ...prev.diseases, [e.target.name]: e.target.checked } }))} 
                  name={key} 
                />
              }
            />)}
          </FormGroup>
        </FormControl>
        <div style={{ marginTop: 20 }}>
          <Typography>By country</Typography>
          <TextField variant='standard' label='Country' fullWidth value={mapFilter.byCountry} onChange={e => setMapFilter(prev => ({ ...prev, byCountry: e.target.value }))} />
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default memo(MapFilter)