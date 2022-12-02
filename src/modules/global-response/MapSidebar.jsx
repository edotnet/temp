import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, TextareaAutosize, TextField, Typography } from '@mui/material'
import React, { memo, useState } from 'react'
import DiseaseCountry from './DiseaseCountry'
import MapFilter from './MapFilter'

const MapSidebar = ({ diseasesData, selectedId, handleMarkerClick, setFilteredDiseases, filteredDiseases }) => {
  const [isShow, setIsShow] = useState(true)

  return (
    <>
      <Button variant='outlined' sx={{ position: 'absolute', top: 100, left: isShow ? 310 : 10, zIndex: 10, transition: '1s' }} onClick={() => setIsShow(!isShow)}>{isShow ? 'Hide sidebar' : 'Show sidebar'}</Button>
      <Box sx={{ position: 'absolute', top: 0, left: isShow ? 0 : -300, width: 300, height: 'auto', maxHeight: '100vh', zIndex: 9, overflowY: 'scroll', p: 3, pr: 0, transition: '1s' }}>
        <TextField label="SEARCH COUNTRY OR CITY" variant="standard" fullWidth sx={{ mb: 2, mt: 8 }} />
        {Object.entries(filteredDiseases).length ? <MapFilter filteredDiseases={filteredDiseases} setFilteredDiseases={setFilteredDiseases} /> : null}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Add Marker</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            <Grid container spacing={2}>
              <Grid item flexGrow={1}>
                <TextField label="SEARCH COUNTRY OR CITY" variant="standard" fullWidth />
              </Grid>
              <Grid item flexGrow={1}>
                <TextField label="Add: " variant="standard" fullWidth />
              </Grid>
              <Grid item flexGrow={1}>
                <TextareaAutosize
                  placeholder="Notice: "
                  minRows={3}
                  style={{ width: '100%', padding: 10, fontSize: 16, fontFamily: 'Work Sans, sans-serif', resize: 'none' }}
                />
              </Grid>
              <Grid item flexGrow={1}>
                <Button variant='outlined' fullWidth>Send</Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        {diseasesData.length && <Typography variant='h6' mt={2}>Diseases</Typography>}
        {diseasesData.length && diseasesData.map((diseaseData, i) => (
          <DiseaseCountry diseaseData={diseaseData} i={i} handleMarkerClick={handleMarkerClick} selectedId={selectedId} />
        ))}
      </Box>
      <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: 350, zIndex: 9, overflowY: 'scroll', p: 2, pt: 13, height: 'auto', maxHeight: '100vh' }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography>News</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  )
}

export default memo(MapSidebar)