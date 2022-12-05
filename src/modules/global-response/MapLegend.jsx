import { Circle, ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import React, { memo } from 'react'
import { allDiseases, diseaseToColor } from '.'
import vector from './vector.png'

const MapLegend = () => {
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls='panel1a-content'
        id='panel1a-header'>
        <Typography variant='h6'>Map Legend</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0 }}>
        <List sx={{ p: 0 }}>
          <ListItem sx={{ pt: 0 }}>
            <ListItemAvatar>
              <Avatar
                sx={{ borderRadius: 0, width: 20, height: 20 }}
                alt='Prepaire Event'
                src={vector}
              />
            </ListItemAvatar>
            <ListItemText primary='Prepaire Event' />
          </ListItem>
          {/* {diseasesData.map(({ disease }) => (
                <ListItem sx={{ pt: 0 }}>
                  <ListItemIcon>
                    <Circle fontSize='small' sx={{ color: diseaseToColor(disease) }} />
                  </ListItemIcon>
                  <ListItemText primary={disease} />
                </ListItem>
              ))} */}
          {allDiseases.map((disease, i) => (
            <ListItem key={i} sx={{ pt: 0 }}>
              <ListItemIcon>
                <Circle fontSize='small' sx={{ color: diseaseToColor(disease) }} />
              </ListItemIcon>
              <ListItemText primary={disease} />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  )
}

export default memo(MapLegend)
