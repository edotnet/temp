import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { Fragment } from 'react';
import { ModalPaper } from "../../infrastructure/components/ModalPaper";
import { useDashboardContext } from "./context/useDashboarContext";
import { Hr } from "../../infrastructure/components/Hr.component";
import { AdverseEffectsInfo } from "./adverse-effects/AdverseEffectsInfo";
import { ContentCopy } from "@mui/icons-material";
import { CopyComponent } from "../../infrastructure/components/Copy.component";

const keys = [
  {key: 'calculated_properties.Molecular Weight', title: 'Mass.', color: '#AE2AFF'},
  {key: 'calculated_properties.logP', title: 'LogP', color: '#FF9898'},
  {key: 'calculated_properties.ADMET.ames_toxicity.probability', title: 'AMES Tox', color: '#001959'},
  //{key: 'calculated_properties.Molecular Formula', title: 'Mol. Form.', color: '#17D74D'},
  {key: 'calculated_properties.ALOGPS.logS', title: 'LogS', color: '#0050C9'},
  // { key: 'calculated_properties.Bioavailability', title: 'Bio Availability', color: '#FF9898'},
  // { key: 'calculated_properties.Ghose Filter', title: 'Ghose Filter', color: '#17D74D'},
  // { key: 'calculated_properties.H Bond Acceptor Count', title: 'H Bond Acceptor Count', color: '#AE2AFF'},
  // { key: 'calculated_properties.H Bond Donor Count', title: 'H Bond Donor Count', color: '#0050C9' },
  // { key: 'calculated_properties.MDDR-Like Rule', title: 'MDDR-Like Rule', color: '#001959'},
  // { key: 'calculated_properties.Monoisotopic Weight', title: 'Monoisotopic Weight', color: '#0050C9'},
  // { key: 'calculated_properties.Number of Rings', title: 'Number of Rings', color: '#001959'},
  // { key: 'calculated_properties.Physiological Charge', title: 'Physiological Charge', color: '#FF9898'},
  // { key: 'calculated_properties.Polar Surface Area (PSA)', title: 'Polar Surface Area (PSA)', color: '#17D74D'},
  // { key: 'calculated_properties.Polarizability', title: 'Polarizability', color: '#AE2AFF'},
  // { key: 'calculated_properties.Refractivity', title: 'Refractivity', color: '#0050C9'},
  // { key: 'calculated_properties.Rotatable Bond Count', title: 'Rotatable Bond Count', color: '#001959'},
  // { key: 'calculated_properties.Rule of Five', title: 'Rule of Five' , color: '#17D74D'},
  // { key: 'calculated_properties.pKa (strongest acidic)', title: 'pKa (strongest acidic)', color: '#AE2AFF' },
  // { key: 'calculated_properties.pKa (strongest basic)', title: 'pKa (strongest basic)' ,color: '#0050C9' }
];


function fetchFromObject(obj, prop) {
  if (typeof obj === 'undefined') {
    return false;
  }

  var _index = prop.indexOf('.')
  if (_index > -1) {
    return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
  }

  return obj[prop];
}


export const DrugProperties = () => {
  const {state} = useDashboardContext()
  if (!state.selectedMolecule) {
    return (
      <Box>
        <ModalPaper elevation={2} sx={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 450,
          height: 251,
          display: 'flex',
          flexGrow: 1,
          marginBottom: '50px'
        }}>
          <Typography>Click a drug</Typography>
        </ModalPaper>
      </Box>
    )
  }

  function renderDescription() {
    if (!state.selectedMolecule.clinical_description) {
      return null;
    }
    return (
      <>
        <Hr/>
        <Box>
          <Typography variant="p" sx={{fontSize: 16}}>{state.selectedMolecule.clinical_description}</Typography>
        </Box>
      </>
    )

  }

  function renderCalculatedProperties() {
    return keys.map(key => (
      <Fragment key={key.title}>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={6}>
              <Typography sx={{color: '#9292C1'}}>
                {key.title}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography
                sx={{
                  color: '#383874',
                  textAlign: 'right',
                  fontWeight: 500
                }}>{fetchFromObject(state.selectedMolecule, key.key)}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    ));
  }


  return (
    <Box>
      <ModalPaper elevation={2} sx={{width: 450, marginBottom: '50px', px: 2}}>
        <Box p={2} pb={3}>
          <Box>
            <Typography sx={{
              fontWeight: 500,
              fontSize: '18px',
              marginTop: '10px',
            }}> Drug Properties </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Box>
                <Typography variant="h5" sx={{color: '#383874', fontSize: 30}} gutterBottom
                            component="span">{state.selectedMolecule.name}</Typography>
                <Typography variant="h5" sx={{color: '#373767', pl: 2, fontWeight: 300, fontSize: 30}} gutterBottom
                            component="span">{state.selectedMolecule.calculated_properties["Molecular Formula"].toUpperCase()}</Typography>
              </Box>
              <CopyComponent text={`${state.selectedMolecule.name}
                  ${state.selectedMolecule.calculated_properties["Molecular Formula"].toUpperCase()}
                  ${state.selectedMolecule.clinical_description}`}
              />
            </Box>
          </Box>
          {renderDescription()}
          <Hr/>
          <Grid container columnSpacing={3}>
            {renderCalculatedProperties()}
          </Grid>
          <AdverseEffectsInfo/>
        </Box>
      </ModalPaper>
    </Box>
  );
}
