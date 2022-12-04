import { Circle, ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { memo, useState } from 'react'
import { allDiseases, diseaseToColor } from '.'
import { Endpoints } from '../../config/Consts'
import { api } from '../../infrastructure/api/instance'

const AddPrepaireEvent = ({
  loading,
  onChangeCountryAutoComplete,
  countries,
  countryValue,
  onChangeCountry,
  countryId,
  prepaireEvent,
  setPrepaireEvent,
  onChangeCityAutoComplete,
  cities,
  cityValue,
  onChangeCity,
  resetPrepaireEvent,
}) => {
  const [sending, setSending] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const sendPrepaireEvent = () => {
    const { title, description } = prepaireEvent
    const data = { ...prepaireEvent, title: title.trim(), description: description.trim() }
    setSending(true)
    api
      .post(Endpoints.map.event, data)
      .then(() => {
        enqueueSnackbar('Prepaire event was created successfully', { variant: 'success' })
        resetPrepaireEvent()
      })
      .catch(() => enqueueSnackbar('Prepare event not created', { variant: 'error' }))
      .finally(() => setSending(false))
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Add Prepaire Event</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0 }}>
        <Grid container direction={'column'} spacing={2}>
          <Grid item flexGrow={1}>
            <Autocomplete
              disablePortal
              loading={loading}
              onChange={onChangeCountryAutoComplete}
              options={countries ? countries.items.map(({ name }) => name) : []}
              renderInput={params => (
                <TextField
                  value={countryValue || ''}
                  onChange={onChangeCountry}
                  label='SEARCH COUNTRY OR CITY'
                  fullWidth
                  variant='standard'
                  {...params}
                />
              )}
            />
          </Grid>
          {countryId && (
            <Grid item flexGrow={1}>
              <Autocomplete
                disablePortal
                loading={loading}
                onChange={onChangeCityAutoComplete}
                options={cities ? cities.items.map(({ name }) => name) : []}
                renderInput={params => (
                  <TextField
                    value={cityValue || ''}
                    onChange={onChangeCity}
                    label='SEARCH COUNTRY OR CITY'
                    fullWidth
                    variant='standard'
                    {...params}
                  />
                )}
              />
            </Grid>
          )}
          <Grid item flexGrow={1}>
            <TextField
              label='Title'
              variant='outlined'
              fullWidth
              value={prepaireEvent.title}
              onChange={e => setPrepaireEvent(prev => ({ ...prev, title: e.target.value }))}
            />
          </Grid>
          <Grid item flexGrow={1}>
            <TextareaAutosize
              placeholder='Notes'
              value={prepaireEvent.description}
              onChange={e => setPrepaireEvent(prev => ({ ...prev, description: e.target.value }))}
              minRows={3}
              style={{
                width: '100%',
                padding: 10,
                fontSize: 16,
                fontFamily: 'Work Sans, sans-serif',
                resize: 'none',
              }}
            />
          </Grid>
          <Grid item flexGrow={1}>
            <Typography>Select a marker</Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {allDiseases.map((disease, i) => (
                <div
                  style={{
                    borderRadius: '50%',
                    border: `${prepaireEvent.type === disease ? 1 : 0}px solid #000`,
                    width: 20,
                    height: 20,
                    margin: 3,
                    backgroundColor: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  key={i}>
                  <Circle
                    onClick={() =>
                      setPrepaireEvent(prev => ({
                        ...prev,
                        type: disease === prev.type ? 'event' : disease,
                      }))
                    }
                    fontSize='small'
                    sx={{ color: diseaseToColor(disease), cursor: 'pointer' }}
                  />
                </div>
              ))}
            </div>
          </Grid>
          <Grid item flexGrow={1}>
            <Button
              variant='outlined'
              disabled={sending || !(prepaireEvent.title && prepaireEvent.cityId)}
              fullWidth
              onClick={sendPrepaireEvent}>
              {sending ? <CircularProgress size={25} sx={{ color: '#ddd' }} /> : 'Send'}
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default memo(AddPrepaireEvent)
