import {
  Box,
  capitalize,
  FormControl,
  FormControlLabel,
  Grid, IconButton,
  Modal,
  Radio,
  RadioGroup,
  Stack, TextField,
  Typography
} from "@mui/material";
import {PrimaryButton} from "../../../infrastructure/components/PrimaryButton";
import * as PropTypes from "prop-types";
import {Add, Remove} from "@mui/icons-material";
import {useDashboardContext} from "../context/useDashboarContext";
import {useEffect, useMemo, useState} from "react";
import {styled} from "@mui/material/styles";
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

  useEffect(() => {
    if (id) {
      setInformation(state.demographics.find(demo => demo.id === id));
      return;
    }
    setInformation(initialState);
  }, [id, initialState, state.demographics]);

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
    }}>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item sm={1}>
          </Grid>
          <Grid item sm={6}>
            <Box sx={{px: 2}}>
              <Stack spacing={3}>
                <Stack direction="row" spacing={5} sx={{alignItems: "center"}}>
                  <Typography>AGE</Typography>
                  {renderNumber('age')}
                </Stack>
                <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
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
          <Grid item sm={1}/>
          <Grid item sm={3}>
            <Typography>GEO</Typography>
            {renderRadio('geo')}
          </Grid>
        </Grid>
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