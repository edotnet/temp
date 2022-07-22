import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import {DemographicItem} from "./DemographicItem";
import {useMemo, useState} from "react";
import {useDashboardContext} from "./context/useDashboarContext";
import {styled} from "@mui/material/styles";

function ValueLabelComponent(props) {
  const {children, value} = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

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
  drug: {
    values: ["favipiravir", "balicatib", "ritonavir", "remdesivir", "cephalexin", "ivermectin"],
    type: 'checkbox',
  },
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
      id: state.demographics.length+1
    };
    Object.keys(options).forEach(key => {
      info[key] = null;
    });
    return info;
  }, [state.demographics]);
  const [information, setInformation] = useState(() => initialState);

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
          {options[type].values.map(value => <FormControlLabel value={value} control={<Radio/>} label={value}
                                                               key={value}/>)}
        </RadioGroup>
      </FormControl>
    )
  }

  const renderNumber = (type) => (
    <Box sx={{px: 3}}>
      <Slider
        valueLabelDisplay="auto"
        components={{
          ValueLabel: ValueLabelComponent,
        }}
        defaultValue={20}
        min={options[type].values.min}
        max={options[type].values.max}
        value={information[type]}
        onChange={(e, value) => {
          setInformation({...information, [type]: value})
        }}
      />
    </Box>
  )

  const isValid = useMemo(() => {
    return Object.keys(information).every(key => information[key] !== null);
  }, [information]);

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
        <Grid container spacing={4} pt={2} style={{minHeight: 150}}>
          {state.demographics.map(demographic => <Grid item xs={3} key={demographic.id}>
            <DemographicItem
              key={demographic.id}
              demographic={demographic}
              onClick={editDemographics(demographic.id)}
            />
          </Grid>)}
        </Grid>
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
          <Grid container>
            <Grid item sm={6}>
              <Box sx={{px: 2}}>
                <Grid container>
                  <Grid item xs={3}>
                    <Typography>AGE</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {renderNumber('age')}
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>{information.age}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>WEIGHT</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {renderNumber('weight')}
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>{information.weight}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>GENDER</Typography>
                    {renderRadio('gender')}
                  </Grid>
                  <Grid item xs={6}>

                  </Grid>
                </Grid>
              </Box>

            </Grid>
            <Grid item sm={3}>
              <Typography>GEO</Typography>
              {renderRadio('geo')}
            </Grid>
            <Grid item sm={3}>
              <Typography>DRUG</Typography>
              {renderRadio('drug')}
            </Grid>
          </Grid>
          <Box>
            <Button
              variant="contained"
              disabled={!isValid}
              onClick={onSubmit}>Submit</Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
