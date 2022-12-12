import { Box, Button, Typography } from '@mui/material'
import React, { memo, useState } from 'react'
import { numberWithCommas } from '.'
import AddPrepaireEvent from './AddPrepaireEvent'
import DiseaseCountry from './DiseaseCountry'
import MapFilter from './MapFilter'

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
          pr: 1.25,
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
        {diseasesData.length ? (
          <>
            <Typography variant='h6' mt={2}>
              Diseases
            </Typography>
            {diseasesData.map((diseaseData, i) => (
              <DiseaseCountry
                key={i}
                diseaseData={diseaseData}
                i={i}
                handleMarkerClick={handleMarkerClick}
                selectedId={selectedId}
              />
            ))}
          </>
        ) : null}
      </Box>
      {Object.entries(mapFilter).length ? <div
        style={{
          zIndex: 10,
          position: 'absolute',
          right: 53,
          top: 90,
          width: 231,
          padding: '10px 15px',
          backgroundColor: '#fff',
          boxShadow: '0 0 0 2px rgb(0 0 0 / 10%)',
          borderRadius: 4,
          textAlign: 'center',
        }}>
        <Typography fontSize={13}>Total Cases Worldwide</Typography>
        <Typography fontSize={28} fontWeight={700}>
          {numberWithCommas(diseasesData.filter(({ disease }) => mapFilter.diseases[disease]).reduce((acc, v) => acc + v.totalCases, 0))}
        </Typography>
        <Typography fontSize={12}>Total Deaths</Typography>
        <Typography fontSize={26} fontWeight={500}>
          {numberWithCommas(diseasesData.filter(({ disease }) => mapFilter.diseases[disease]).reduce((acc, v) => acc + v.totalDeaths, 0))}
        </Typography>
      </div> : null}
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
        {/* <MapLegend /> */}
      </Box>
    </>
  )
}

export default memo(MapSidebar)
