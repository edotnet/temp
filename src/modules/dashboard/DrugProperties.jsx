import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { Fragment } from 'react';
import { ModalPaper } from "../../infrastructure/components/ModalPaper";
import { useDashboardContext } from "./context/useDashboarContext";
import { Hr } from "../../infrastructure/components/Hr.component";
import { AdverseEffectsInfo } from "./adverse-effects/AdverseEffectsInfo";
import { Close, ContentCopy } from "@mui/icons-material";
import { CopyComponent } from "../../infrastructure/components/Copy.component";
import { fetchFromObject } from "../../infrastructure/utils";
import $3Dmol from '3dmol';
import $ from 'jquery/dist/jquery.min.js';

const keys = [
  {key: 'calculated_properties.Molecular Weight', title: 'Mass.', color: '#AE2AFF'}, //900 / 1
  {key: 'calculated_properties.logP', title: 'LogP', color: '#FF9898'},  // -9 / 9
  {key: 'calculated_properties.ADMET.ames_toxicity.probability', title: 'AMES Tox', color: '#001959'},
  //{key: 'calculated_properties.Molecular Formula', title: 'Mol. Form.', color: '#17D74D'},
  {key: 'calculated_properties.ALOGPS.logS', title: 'LogS', color: '#0050C9'}, //-11 / 3
  {key: 'solubility', title: 'Solubility', color: '#FFC000', parse: val => parseFloat(val).toFixed(3)}, // 0 / 1000
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
  // { key: 'calculated_properties.Rotatable Bond Count', title: 'Rotatable Bond Count', color: '#001959'}, // 0 / 20
  // { key: 'calculated_properties.Rule of Five', title: 'Rule of Five' , color: '#17D74D'},
  // { key: 'calculated_properties.pKa (strongest acidic)', title: 'pKa (strongest acidic)', color: '#AE2AFF' },
  // { key: 'calculated_properties.pKa (strongest basic)', title: 'pKa (strongest basic)' ,color: '#0050C9' }
];


export const DrugProperties = () => {
  const {state, dispatch} = useDashboardContext()
  if (!state.selectedMolecule) {
    return null;
  } else {
    if(state.selectedMolecule.cid !== null) {
      setTimeout(()=> {
        const element = $('#container-01')
        const config = { backgroundColor: 'white' }
        const viewer = $3Dmol.createViewer(element, config)
        $3Dmol.download(`cid:${state.selectedMolecule.cid}`, viewer, {}, function() {
          viewer.setStyle({}, { stick: {} })
          viewer.render()
        })
      },1000);
    } else {
      return null;
    }
  }

  const close = () => {
    dispatch({type: 'unselectMolecule'})
  }

  function renderDescription() {
    if (!state.selectedMolecule.clinical_description) {
      return null;
    }
    return (
      <>
        <Hr/>
        <Box>
          <Typography variant="body2" sx={{ fontSize: 16 }} color="secondary" >{state.selectedMolecule.clinical_description}</Typography>
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
                }}>{'parse' in key ? key.parse(fetchFromObject(state.selectedMolecule, key.key)) : fetchFromObject(state.selectedMolecule, key.key)}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    ));
  }

  const renderToxicity = () => {
    const hasToxicity = state.selectedMolecule.toxicity && typeof state.selectedMolecule.toxicity === 'object';
    
    return hasToxicity && (<Grid container>
      {Object.keys(state.selectedMolecule.toxicity).map(key => <Grid item xs={6}>
        <Grid container>
          <Grid item xs={6}>
            <Typography sx={{color: '#9292C1'}} noWrap>
              {key}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              sx={{
                color: '#383874',
                textAlign: 'right',
                fontWeight: 500
              }}>{parseFloat(state.selectedMolecule.toxicity[key]).toFixed(3)}</Typography>
          </Grid>
        </Grid>
      </Grid>)}
    </Grid>)
  }

  return (
    <Box sx={{position: 'absolute', top: state.selectedMolecule?.coordinates?.y || '50%', left: state.selectedMolecule?.coordinates?.x || '50%'}}>
      <ModalPaper elevation={2} sx={{width: 450, marginBottom: '50px', px: 2}}>
        <IconButton sx={{position: "absolute", top: 0, right: 0}} size="large" onClick={close}>
          <Close/>
        </IconButton>
        <Box p={2} pb={3}>
          <Box>
            <Typography variant="subtitle1"> Drug Properties </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Box>
                <Typography sx={{color: '#383874', fontWeight: 400, fontSize: 30}} gutterBottom
                            component="span">{state.selectedMolecule.name}
                  <Typography sx={{color: '#373767', fontSize: 30}} gutterBottom
                            component="span">{state.selectedMolecule.calculated_properties["Molecular Formula"]?.toUpperCase()}</Typography>
                </Typography>
              </Box>
              <CopyComponent text={`${state.selectedMolecule.name}
                  ${state.selectedMolecule.calculated_properties["Molecular Formula"]?.toUpperCase()}
                  ${state.selectedMolecule.clinical_description}`}
              />
            </Box>
          </Box>
          {renderDescription()}
          <Hr/>
          <Grid container columnSpacing={3}>
            {renderCalculatedProperties()}
          </Grid>
          <Hr/>
          <Typography>Toxicity</Typography>
          {renderToxicity()}
          <AdverseEffectsInfo/>
          <Hr/>
          <div id="container-01" className="mol-container"></div>
        </Box>
      </ModalPaper>
    </Box>
  );
}
