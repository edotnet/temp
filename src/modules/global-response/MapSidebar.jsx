import { Circle, ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import React, { memo, useState } from 'react'
import { diseaseToColor } from '.'
import AddPrepaireEvent from './AddPrepaireEvent'
import DiseaseCountry from './DiseaseCountry'
import MapFilter from './MapFilter'
import vector from './vector.png'

export const needToRemove = ['COVID-19', 'Monkeypox', 'Marburg Virus', 'Ebola Virus', 'Lassa Fever']

const MapSidebar = ({
  diseasesData,
  selectedId,
  handleMarkerClick,
  setMapFilter,
  mapFilter,
  loading,
  onChangeCountryAutoComplete,
  countries,
  countryId,
  countryValue,
  onChangeCountry,
  onChangeCityAutoComplete,
  cityValue,
  cities,
  onChangeCity,
  prepaireEvent,
  setPrepaireEvent,
  resetPrepaireEvent,
}) => {
  const [isShow, setIsShow] = useState(true)

  return (
    <>
      <Button
        variant='outlined'
        sx={{
          position: 'absolute',
          top: 100,
          left: isShow ? 310 : 10,
          zIndex: 10,
          transition: '1s',
        }}
        onClick={() => setIsShow(!isShow)}>
        {isShow ? 'Hide sidebar' : 'Show sidebar'}
      </Button>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: isShow ? 0 : -300,
          width: 300,
          height: 'auto',
          maxHeight: '100vh',
          zIndex: 9,
          overflowY: 'scroll',
          p: 3,
          pr: 0,
          transition: '1s',
        }}>
        <Box sx={{ mb: 2, mt: 9.5 }}></Box>
        {/* <TextField
          label='SEARCH COUNTRY OR CITY'
          variant='standard'
          fullWidth
          sx={{ mb: 2, mt: 8 }}
        /> */}
        {Object.entries(mapFilter).length ? (
          <MapFilter mapFilter={mapFilter} setMapFilter={setMapFilter} />
        ) : null}
        <AddPrepaireEvent
          cities={cities}
          cityValue={cityValue}
          countries={countries}
          countryId={countryId}
          countryValue={countryValue}
          loading={loading}
          onChangeCity={onChangeCity}
          onChangeCityAutoComplete={onChangeCityAutoComplete}
          onChangeCountry={onChangeCountry}
          onChangeCountryAutoComplete={onChangeCountryAutoComplete}
          prepaireEvent={prepaireEvent}
          setPrepaireEvent={setPrepaireEvent}
          resetPrepaireEvent={resetPrepaireEvent}
        />
        {diseasesData.length && (
          <Typography variant='h6' mt={2}>
            Diseases
          </Typography>
        )}
        {diseasesData.length &&
          diseasesData.map((diseaseData, i) => (
            <DiseaseCountry
              diseaseData={diseaseData}
              i={i}
              handleMarkerClick={handleMarkerClick}
              selectedId={selectedId}
            />
          ))}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 300,
          zIndex: 9,
          overflowY: 'scroll',
          p: 2,
          height: 'auto',
          maxHeight: '100vh',
        }}>
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
              {needToRemove.map(disease => (
                <ListItem sx={{ pt: 0 }}>
                  <ListItemIcon>
                    <Circle fontSize='small' sx={{ color: diseaseToColor(disease) }} />
                  </ListItemIcon>
                  <ListItemText primary={disease} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  )
}

export default memo(MapSidebar)
