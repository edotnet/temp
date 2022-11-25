import { Add, CheckBoxOutlineBlank, CheckBoxOutlined, Remove } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  capitalize, Chip, FormControl,
  FormControlLabel, Grid,
  IconButton, InputLabel, MenuItem,
  Modal,
  Radio,
  RadioGroup, Select,
  Stack, TextField,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import * as PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DemographicBmi, DemographicYears, Endpoints } from "../../../config/Consts";
import { PrimaryButton } from "../../../infrastructure/components/PrimaryButton";
import { useApiCall } from "../../../infrastructure/hooks/useApiCall";
import { useDashboardContext } from "../context/useDashboarContext";
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
const ComorbiditiesField = styled(TextField)({
  '.MuiOutlinedInput-root': {
    alignItems: 'flex-start',
  }
})
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
    values: ["asia", "europe", "africa", "oceania", "carribbean", "russia", "c. America", "n. America", "s. America"]
  },
  ethnicities: {
    type: 'radio',
    values: ["White", "Latino", "Asian", "African American", "American Indian", "Alaska Native", "Native Hawaiian", "Pacific Islander"]
  },
  bmi: {
    type: 'radio',
    values: DemographicBmi,
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
  const {loading, data, fetch} = useApiCall(Endpoints.genephenotype.search, 'POST', null, false);

  const initialState = useMemo(() => {
    const info = {
      id: state.demographics.length + 1,
    };
    Object.keys(options).forEach(key => {
      info[key] = undefined;
    });
    return {
        ...info,
      weightSystem: 'kg',
      heightSystem: 'cm',
    }
  }, [state.demographics]);
  const [information, setInformation] = useState(() => initialState);
  const [comorbiditiesInputValue, setComorbiditiesInputValue] = useState('')

  const isValid = useMemo(() => {
    return Object.keys(information).every(key => information[key] !== null);
  }, [information]);

  const onSubmit = () => {
    dispatch({type: 'addDemographics', payload: information});
    onClose();
  }

  const onRun = useCallback(searchTerm => {
    fetch(Endpoints.genephenotype.s, 'POST', { query: searchTerm });
  }, [comorbiditiesInputValue]);

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
          {options[type].values.map(value => <FormControlLabel 
            value={value}
            control={<Radio checkedIcon={<CheckBoxOutlined />} icon={<CheckBoxOutlineBlank />} 
            sx={(type === 'geo' || type === 'ethnicities') ? { pr: 0.7 } : {}} color="info" />}
            label={capitalize(value)}
            key={value} 
          />)}
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

  const comorbiditiesAutoComplete = () => (
    <Autocomplete
      multiple
      options={comorbiditiesInputValue.length > 3 && data ? data : []}
      freeSolo
      value={information.comorbidities || []}
      onChange={(_, v) => {
        setInformation(prev => ({...prev, comorbidities: v}))
      }}
      loading={loading}
      renderTags={(value, getTagProps) => {
        return value.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
        }
      }
      renderInput={params => (
        <ComorbiditiesField 
          sx={{display: 'flex'}} 
          multiline 
          value={comorbiditiesInputValue} 
          onChange={e => {
            if (e.target.value.length > 3) {
              onRun(e.target.value)
            };
            setComorbiditiesInputValue(e.target.value)
          }} 
          rows={3} 
          {...params} 
        />
      )}
    />
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
          <Typography variant="h6">Ethnicities</Typography>
          {renderRadio('ethnicities')}
        </Box>
        <Box>
          {comorbiditiesAutoComplete()}
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
