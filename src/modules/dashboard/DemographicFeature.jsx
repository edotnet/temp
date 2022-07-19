import {
  Box, Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup, Slider, Tooltip,
  Typography
} from "@mui/material";
import { DemographicItem } from "./DemographicItem";
import { useEffect, useState } from "react";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { Endpoints } from "../../config/Consts";
function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}
export const DemographicFeature = () => {
  const url = Endpoints.drugbank.calculateMaintenanceDosage;
  const {fetch, data} = useApiCall(url, 'POST', null, false);
  const options = {
    drug: {
      values: ["favipiravir", "balicatib", "ritonavir", "remdesivir", "cephalexin", "ivermectin"],
      type: 'radio'
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
      min: 1,
      max: 110,
    },
    gender: {
      type: 'radio',
      values: ["male", "female"]
    },
    geo: {
      type: 'radio',
      values: ["asia", "europe", "africa", "australia", "america"]
    }
  }
  const [property, setProperty] = useState(null);
  const [information, setInformation] = useState(() => {
    const info = {};
    Object.keys(options).forEach(key => {
      info[key] = null;
    });
    return info;
  });

  const openDemographicModal = (type) => () => {
    setProperty(type);
  }

  useEffect(() => {
    if (information.drug && information.weight && information.age && information.gender && information.geo) {
      fetch(url, 'POST', information)
    }
  }, [information]);

  const renderRadio = (type) => {
    return (
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={(e, v) => setInformation(prev => ({...prev, [type]: v}))}
          value={information[type]}
        >
          {options[type].values.map(value => <FormControlLabel value={value} control={<Radio />} label={value} key={value}/>)}
        </RadioGroup>
      </FormControl>
    )
  }

  const renderNumber = (type) => (
    <Slider
      valueLabelDisplay="auto"
      components={{
        ValueLabel: ValueLabelComponent,
      }}
      defaultValue={20}
      value={information[type]}
      onChange={(e, value) => {setInformation({...information, [type]: value})}}
    />
  )

  return (
    <>
    <Grid container spacing={2}>
      {Object.keys(options).map((prop) => (
        <Grid item xs={6} sm={6} md={4} key={prop}>
          <DemographicItem onClick={openDemographicModal(prop)} title={prop} value={information[prop]}/>
        </Grid>
      ))}
      {!!data && <Grid item xs={6} sm={6} md={4}>
        <Box sx={{display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
          <Typography variant="h4">{parseFloat(data.maintenanceDosage).toFixed(2)}</Typography>
        </Box>
      </Grid>}
    </Grid>
      <Modal open={!!property} onClose={() => setProperty(null)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          p: 4,
          boxShadow: 24,
          bgcolor: 'background.paper',
        }}>
          <Typography>{property}</Typography>
          <Box>
            {!!property && options[property].type === 'radio' && renderRadio(property)}
            {!!property && options[property].type === 'number' && renderNumber(property)}
          </Box>
        </Box>
      </Modal>
    </>
  )
}
