import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  Typography
} from '@mui/material';
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import React, { memo } from 'react';
import { diseaseToColor } from '.';



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
            {Object.entries(mapFilter.diseases).map(([key, value]) => (
              <FormControlLabel
                key={key}
                label={key}
                control={
                  <Checkbox
                    sx={{
                      [`&, &.${checkboxClasses.checked}`]: {
                        color: diseaseToColor(key),
                      },
                    }}
                    checked={value}
                    onChange={e =>
                      setMapFilter(prev => ({
                        ...prev,
                        diseases: { ...prev.diseases, [e.target.name]: e.target.checked },
                      }))
                    }
                    name={key}
                  />
                }
              />
            ))}
          </FormGroup>
        </FormControl>
        <div style={{ marginTop: 20 }}>
          <Typography>By country</Typography>
          <TextField
            variant='standard'
            label='Country'
            fullWidth
            value={mapFilter.byCountry}
            onChange={e => setMapFilter(prev => ({ ...prev, byCountry: e.target.value }))}
          />
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default memo(MapFilter)
