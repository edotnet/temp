import {
  Box,
  capitalize,
  FormControl,
  FormControlLabel, Grid,
  IconButton, InputLabel, MenuItem,
  Modal,
  Radio,
  RadioGroup, Select,
  Stack, TextField,
  Typography
} from "@mui/material";
import {PrimaryButton} from "../../../infrastructure/components/PrimaryButton";
import * as PropTypes from "prop-types";
import { Add, CheckBoxOutlineBlank, CheckBoxOutlined, Remove } from "@mui/icons-material";
import {useDashboardContext} from "../context/useDashboarContext";
import {useEffect, useMemo, useState} from "react";
import {styled} from "@mui/material/styles";
import {DemographicBmi, DemographicYears} from "../../../config/Consts";
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
const options = {
  weight: {
    type: 'number',
    values: {
      min: 1,
      max: 150,
    },
  },
  height: {
    type: 'number',
    values: {
      min: 1,
      max: 220,
    },
  },
  age: {
    type: 'radio',
    values: DemographicYears,
  },
  gender: {
    type: 'radio',
    values: ["male", "female"],
  },
  geo: {
    type: 'radio',
    values: ["asia", "europe", "africa", "australia", "america"]
  },
  bmi: {
    type: 'radio',
    values: DemographicBmi,
  },
  allergies: {
    type: 'text',
  },
  comorbidities: {
    type: 'text'
  },
  weightSystem: {
    type: 'select',
    values: ['kg', 'lbs'],
  },
  heightSystem: {
    type: 'select',
    values: ['cm', 'in'],
  }
}
export const DemographicModal = ({onClose, open, id}) => {
  const {state, dispatch} = useDashboardContext();

  const initialState = useMemo(() => {
    const info = {
      id: state.demographics.length + 1,
    };
    Object.keys(options).forEach(key => {
      info[key] = undefined;
    });
    return info;
  }, [state.demographics]);
  const [information, setInformation] = useState(() => initialState);

  const isValid = useMemo(() => {
    return Object.keys(information).every(key => information[key] !== null);
  }, [information]);

  const onSubmit = () => {
    dispatch({type: 'addDemographics', payload: information});
    onClose();
  }

  const renderRadio = (type) => {
    return (
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={(e, v) => setInformation(prev => ({...prev, [type]: v}))}
          value={information[type]}
          row
        >
          {options[type].values.map(value => <FormControlLabel value={value}
                                                               control={<Radio checkedIcon={<CheckBoxOutlined />} icon={<CheckBoxOutlineBlank />} color="info"/>}
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

  const renderText = (type) => (
    <Box>
      <TextField sx={{display: 'flex'}} multiline rows={3} value={information[type]} onChange={e => setInformation(prev => ({...prev, [type]: e.target.value}))}/>
    </Box>
  )

  const renderSelect = (type, label) => (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={information[type]}
          label={label}
          onChange={e => setInformation(prev => ({...prev, [type]: e.target.value}))}
        >
          {options[type].values.map(value => <MenuItem value={value} key={value}>{value}</MenuItem>)}
        </Select>
      </FormControl>

  )

  useEffect(() => {
    if (id) {
      setInformation(state.demographics.find(demo => demo.id === id));
      return;
    }
    setInformation(initialState);
  }, [id, initialState, state.demographics]);

  useEffect(() => {
    if (information.weight && information.height) {
      setInformation({...information, bmi: parseFloat(information.weight / (information.height / 100) ** 2).toFixed(2)});
    }
  }, [information.height, information.weight]);

  return <Modal open={open} onClose={onClose}>
    <Box sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 800,
      p: 4,
      boxShadow: 24,
      bgcolor: "background.paper",
      overflow: 'scroll',
      height: 'calc(100% - 100px)',
      flexGrow: 1
    }}>
      <Stack spacing={5}>
        <Box>
          <Typography variant="h6">Age Demographic</Typography>
          {renderRadio('age')}
        </Box>
        <Box>
          <Typography variant="h6">BMI {information.bmi}</Typography>

          <Grid container sx={{alignItems: 'center'}}>
            <Grid item xs={2}>
              <Typography>Weight</Typography>
            </Grid>
            <Grid item xs={4}>
              {renderNumber('weight')}
            </Grid>
            <Grid item xs={3}>
              {renderSelect('weightSystem', 'Measure')}
            </Grid>
          </Grid>
          <Box sx={{py: 1}}/>
          <Grid container sx={{alignItems: 'center'}}>
            <Grid item xs={2}>
              <Typography>Height</Typography>
            </Grid>
            <Grid item xs={4}>
              {renderNumber('height')}
            </Grid>
            <Grid item xs={3}>
              {renderSelect('heightSystem', 'Measure')}
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Typography variant="h6">Sex</Typography>
          {renderRadio('gender')}
        </Box>
        <Box>
          <Typography variant="h6">Geographic Location</Typography>
          {renderRadio('geo')}
        </Box>
        <Box>
          <Typography variant="h6">Allergies</Typography>
          {renderText('allergies')}
        </Box>
        <Box>
          <Typography variant="h6">Comorbidities</Typography>
          {renderText('comorbidities')}
        </Box>
        <Stack direction="row" spacing={2} sx={{justifyContent: "flex-end"}}>
          <PrimaryButton
            variant="outlined"
            onClick={onClose}
            title="Cancel"/>
          <PrimaryButton
            disabled={!isValid}
            onClick={onSubmit}
            title="Submit"/>
        </Stack>
      </Stack>
    </Box>
  </Modal>;
}

DemographicModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};