import { Box, Grid, Paper, Typography } from "@mui/material";
import { Fragment } from 'react';
import { ModalPaper } from "../../infrastructure/components/ModalPaper";
import { useDashboardContext } from "./context/useDashboarContext";

const keys = [
  {key: 'calculated_properties.Molecular Weight', title: 'Molecular Weight', color: '#AE2AFF'},
  {key: 'calculated_properties.Molecular Formula', title: 'Molecular Formula', color: '#17D74D'},
  {key: 'calculated_properties.logP', title: 'LogP', color: '#FF9898'},
  {key: 'calculated_properties.ALOGPS.logS', title: 'LogS', color: '#0050C9'},
  {key: 'calculated_properties.ADMET.ames_toxicity.probability', title: 'AMES Toxicity', color: '#001959'},
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


export const DrugProperties = ({drug}) => {
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
  return (
    <Box>

      <ModalPaper elevation={2} sx={{width: 450, marginBottom: '50px'}}>
        <Box sx={{padding: '16px 5px 16px 16px'}}>
          <Grid container sx={{marginBottom: '5px'}}>
            <Grid item xs={6}>
              <Typography variant="h5" sx={{color: '#383874', 'marginBottom': '20px', position: 'relative'}}
                          gutterBottom component="div"> Drug Properties </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{
                color: '#383874',
                fontSize: '13px',
                textAlign: 'right',
                marginTop: '5px'
              }}>({state.selectedMolecule.name})</Typography>
            </Grid>
            {state.selectedMolecule.clinical_description ? <Grid item xs={12}>
              <Box>
                <Typography variant="p">{state.selectedMolecule.clinical_description}</Typography>
              </Box>
            </Grid> : null}
          </Grid>
          <Box sx={{height: 180, overflowY: 'auto', boxShadow: 'none'}} pt={1}>
            <Grid container>
              {
                keys.map(key => (
                  <Fragment key={key.title}>
                    <Grid item xs={8} sx={{marginBottom: '10px'}}>
                      <Box component="div" sx={{
                        height: 10,
                        width: 10,
                        borderRadius: '50%',
                        backgroundColor: key.color,
                        display: 'inline-block'
                      }}/>
                      <Typography sx={{
                        'fontWeight': 'bold',
                        color: '#383874',
                        position: 'relative',
                        display: 'inline-block',
                        pl: 2
                      }}>
                        {key.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sx={{marginBottom: '10px'}}>
                      <Typography
                        sx={{color: '#9292C1', textAlign: 'right'}}>{fetchFromObject(state.selectedMolecule, key.key)}</Typography>
                    </Grid>
                  </Fragment>
                ))
              }
            </Grid>
          </Box>
        </Box>
      </ModalPaper>
    </Box>
  );
}
