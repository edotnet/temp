import {
  Box,
  Button, capitalize,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import {DemographicItem} from "./DemographicItem";
import {useMemo, useState} from "react";
import {useDashboardContext} from "./context/useDashboarContext";
import {styled} from "@mui/material/styles";
import {Add, Remove} from "@mui/icons-material";

const CustomTextField = styled(TextField)({
  '&.MuiTextField-root': {
    input: {
      padding: 5,
      textAlign: 'center',
    },
  },
  '.MuiOutlinedInput-root': {
    borderRadius: 20,
  }
});

const PillButton = styled(Button)({
  '&.MuiButton-root': {
    borderRadius: 50,
    width: '70%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    border: '1px dashed #ccc',
    paddingTop: 10,
    paddingBottom: 10,
    float: 'left'
  },
  '&.MuiLabel': {
    textAlign: 'left'
  }
});

const options = {
  weight: {
    type: 'number',
    values: {
      min: 1,
      max: 150,
    },
  },
  age: {
    type: 'number',
    values: {
      min: 1,
      max: 150,
    },
  },
  gender: {
    type: 'radio',
    values: ["male", "female"],
  },
  geo: {
    type: 'radio',
    values: ["asia", "europe", "africa", "australia", "america"]
  }
}
export const DemographicFeature = () => {
  const {state, dispatch} = useDashboardContext();
  const [open, setOpen] = useState(false);
  const initialState = useMemo(() => {
    const info = {
      id: state.demographics.length + 1,
    };
    Object.keys(options).forEach(key => {
      info[key] = null;
    });
    return info;
  }, [state.demographics]);
  const [information, setInformation] = useState(() => initialState);
  const isValid = useMemo(() => {
    return Object.keys(information).every(key => information[key] !== null);
  }, [information]);

  const openModal = () => {
    setInformation(() => initialState)
    setOpen(true);
  }

  const closeModal = () => {
    setOpen(false);
  }

  const editDemographics = (id) => () => {
    setInformation(state.demographics.find(demo => demo.id === id));
    setOpen(true);
  }

  const onSubmit = () => {
    dispatch({type: 'addDemographics', payload: information});
    closeModal();
  }

  const renderRadio = (type) => {
    return (
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={(e, v) => setInformation(prev => ({...prev, [type]: v}))}
          value={information[type]}
        >
          {options[type].values.map(value => <FormControlLabel value={value} control={<Radio color="info"/>}
                                                               label={capitalize(value)}
                                                               key={value}/>)}
        </RadioGroup>
      </FormControl>
    )
  }

  const renderNumber = (type) => (
    <Box sx={{px: 3}}>
      <Stack direction="row">
        <IconButton onClick={() => setInformation(prev => ({...prev, [type]: (parseInt(prev[type]) || 0) + 1}))}>
          <Add color="info"/>
        </IconButton>
        <CustomTextField
          size="small"
          value={information[type]}
          onChange={e => setInformation(prev => ({...prev, [type]: parseFloat(e.target.value)}))}/>
        <IconButton onClick={() => setInformation(prev => ({...prev, [type]: (parseInt(prev[type]) || 0) - 1}))}>
          <Remove color="info"/>
        </IconButton>
      </Stack>
    </Box>
  )

  return (
    <>
      <Stack>
        <PillButton onClick={openModal}>+ Add demographic</PillButton>
        <Box sx={{pt: 3, pl: 1, display: 'flex', justifyContent: 'space-between'}}>
          {state.demographics.length > 0 &&
            <>
              <Typography style={{fontSize: 16, fontWeight: 300}}>Selected for interaction:</Typography>
            </>}
        </Box>
        <Box sx={{minHeight: 150}}>
          {state.demographics.map(demographic =>
            <DemographicItem
              key={demographic.id}
              demographic={demographic}
              onClick={editDemographics(demographic.id)}
            />
          )}
        </Box>
      </Stack>
      <Modal open={open} onClose={closeModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          p: 4,
          boxShadow: 24,
          bgcolor: 'background.paper',
        }}>
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item sm={1}>
              </Grid>
              <Grid item sm={6}>
                <Box sx={{px: 2}}>
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={5} sx={{alignItems: 'center'}}>
                      <Typography>AGE</Typography>
                      {renderNumber('age')}
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
                      <Typography>WEIGHT</Typography>
                      {renderNumber('weight')}
                    </Stack>
                    <Box>
                      <Typography>GENDER</Typography>
                      {renderRadio('gender')}
                    </Box>
                  </Stack>
                </Box>

              </Grid>
              <Grid sm={1}/>
              <Grid item sm={3}>
                <Typography>GEO</Typography>
                {renderRadio('geo')}
              </Grid>
            </Grid>
            <Stack direction="row" spacing={2} sx={{justifyContent: 'flex-end'}}>
              <Button
                sx={{borderRadius: 20}}
                color="info"
                variant="outlined"
                onClick={closeModal}>Cancel</Button>
              <Button
                sx={{borderRadius: 20}}
                color="info"
                variant="contained"
                disabled={!isValid}
                onClick={onSubmit}>Submit</Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}
