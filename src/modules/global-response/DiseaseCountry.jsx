import { ExpandMore, KeyboardArrowRight } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, List, ListItemButton, ListItemIcon, ListItemText, Pagination, Typography } from '@mui/material'
import React, { memo, useState } from 'react'

const DiseaseCountry = ({ diseaseData, i, handleMarkerClick, selectedId }) => {
  const [page, setPage] = useState(1)

  return (
    <Accordion key={diseaseData.id} sx={i === 0 ? { mt: '0 !important' } : {}}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{diseaseData.disease}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0, px: 0 }}>
        <List component="nav">
          {diseaseData.map.slice((page - 1) * 10, ((page - 1) * 10) + 10).map(country => {
            const itemId = country.diseaseId + country.name
            return (
              <ListItemButton
                id={itemId}
                key={itemId}
                selected={selectedId === itemId}
                onClick={() => handleMarkerClick(country, itemId)}>
                <ListItemText primary={country.name} />
                <ListItemIcon>
                  <KeyboardArrowRight sx={{ ml: 'auto' }} />
                </ListItemIcon>
              </ListItemButton>
            )
          })}
          <Pagination 
            count={Math.ceil(diseaseData.map.length / 10)} 
            siblingCount={0} 
            page={page} 
            onChange={(_, v) => setPage(v)} 
            sx={{ mt: 2 }} 
          />
        </List>
      </AccordionDetails>
    </Accordion>
  )
}

export default memo(DiseaseCountry)