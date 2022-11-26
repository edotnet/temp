import { Add, CheckBoxOutlineBlank, CheckBoxOutlined, ExpandMore, Remove } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  capitalize, Chip, CircularProgress, FormControl,
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
import { useEffect, useMemo, useState } from "react";
import { DemographicBmi, DemographicYears, Endpoints } from "../../../config/Consts";
import { api } from "../../../infrastructure/api/instance";
import { PrimaryButton } from "../../../infrastructure/components/PrimaryButton";
import { useApiCall } from "../../../infrastructure/hooks/useApiCall";
import { useDashboardContext } from "../context/useDashboarContext";
import GenesPagination from "./GenesPagination";
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
    values: ["Middle East", "asia", "europe", "africa", "oceania", "carribbean", "russia", "c. America", "n. America", "s. America"]
  },
  ethnicities: {
    type: 'radio',
    values: [
      "White", "Latino", "Asian", "African American", "American Indian", "Alaska Native", "Native Hawaiian", "Pacific Islander", 
      "Arabs", "Han Chinese", "Afrikaners", "Afro-Brazilian", "Afro-Carribean", "Albanians", "Amish", "Armenians", "Assyrians", "Balochs",
      "Bahama", "Baiti", "Basque", "Belarusian", "Bosniak", "Burgher", "Bwa", "Camminanti", "Catalan", "Circassian", "Copt", "Corsican",
      "Dane", "Dutch", "Dogon", "English", "Fantefolk", "Finn", "French", "Galician", "German", "Greek", "Gujaratie", "Italian",
      "Japanese", "Korean", "Kurd", "Malay", "Maltese", "Maya"
    ]
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
  const [diseaseInputValue, setDiseaseInputValue] = useState('')
  const [isFetchGenes, setIsFetchGenes] = useState(false)
  const [moreEthnicities, setMoreEthnicities] = useState(true)

  const isValid = useMemo(() => {
    return Object.keys(information).every(key => information[key] !== null);
  }, [information]);

  const onSubmit = () => {
    dispatch({type: 'addDemographics', payload: information});
    onClose();
  }

  const getDiseases = searchTerm => {
    fetch(Endpoints.genephenotype.search, 'POST', { query: searchTerm });
  }

  const getDiseaseData = (_, v) => {
    if (v && v.length) {
      setIsFetchGenes(true)
      api.post(Endpoints.genephenotype.genes, { query: v }).then(res => {
        const { hpoResult, phenolyzerResult } = res.data
        const hpoData = hpoResult.map(hpo => ({ ...hpo, genes: [...new Set([...hpo.genes, ...phenolyzerResult])] }))
        const diseaseData = { hpoResult: hpoData, id: Date.now().toString(), disease: v }
        setInformation(prev => ({...prev, diseases: prev.diseases ? [...prev.diseases, diseaseData] : [diseaseData]}))
      }).finally(() => {
        setIsFetchGenes(false)
      })
    }
  }

  const renderRadio = (type, showMore) => {
    return (
      <>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={(_, v) => setInformation(prev => ({...prev, [type]: v}))}
            value={information[type]}
            row
            >
            {options[type].values.slice(0, moreEthnicities ? 10 : options[type].values.length).map(value => <FormControlLabel 
              value={value}
              control={<Radio checkedIcon={<CheckBoxOutlined />} icon={<CheckBoxOutlineBlank />} 
              sx={(type === 'geo' || type === 'ethnicities') ? { pr: 0.7 } : {}} color="info" />}
              label={capitalize(value)}
              key={value} 
            />)}
          </RadioGroup>
        </FormControl>
        {type === 'ethnicities' && 
          <div style={{display: 'flex'}}>
            <Chip 
              clickable 
              sx={{ m: 'auto' }} 
              onClick={() => setMoreEthnicities(prev => !prev)} 
              label={showMore ? 'MORE' : 'LESS'} 
              color='primary' 
              variant='outlined' 
            />
          </div>
        }
      </>
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

  const diseasesAutoComplete = () => {
    return (
      <Autocomplete
        disabled={isFetchGenes}
        options={diseaseInputValue.length > 3 && data ? data : []}
        onChange={getDiseaseData}
        loading={loading}
        renderInput={params => (
          <TextField
            {...params}
            disabled={isFetchGenes}
            label="Search Disease"
            fullWidth
            value={diseaseInputValue} 
            onChange={e => {
              if (e.target.value.length > 3) {
                getDiseases(e.target.value)
              };
              setDiseaseInputValue(e.target.value)
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isFetchGenes ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    )
  }

  const renderDiseasesData = () => (
    <div style={{marginTop: 20}}> 
      {Array.isArray(information.diseases) && information.diseases.map(diseaseData => (
        <Accordion key={diseaseData.id}>
          <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content">
            <Typography variant="h6">{diseaseData.disease}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {diseaseData.hpoResult.map((hpoData, i) => (
              <div key={i}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 1}}>
                  <Typography variant="subtitle2">HPO:</Typography>
                  <Typography>{hpoData.hpoId}</Typography>
                </Box>
                {hpoData.genes.length && <>
                  <Typography variant="subtitle2">Genes</Typography>
                  <GenesPagination genes={hpoData.genes} />
                </>}
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
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

  return <><Modal open={open} onClose={onClose}>
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
          {renderRadio('ethnicities', moreEthnicities)}
        </Box>
        <Box>
          {diseasesAutoComplete()}
          {renderDiseasesData()}
        </Box>
        <Stack direction="row" spacing={2} sx={{justifyContent: "flex-end"}}>
          <PrimaryButton
            disabled={isFetchGenes}
            variant="outlined"
            onClick={onClose}
            title="Cancel" 
          />
          <PrimaryButton
            disabled={!isValid || isFetchGenes}
            onClick={onSubmit}
            title="Submit"
          />
        </Stack>
      </Stack>
    </Box>
  </Modal>
  </>
}

DemographicModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
