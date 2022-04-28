import { Box, CardContent, CardHeader, Grid, Paper, Typography } from "@mui/material";
import {Fragment} from 'react';

const keys = [
  { key: 'calculated_properties.Molecular Weight', title: 'Molecular mass', color: '#17D74D' },
  { key: 'calculated_properties.logP', title: 'LogP', color: '#AE2AFF'},
  { key: 'calculated_properties.ALOGPS.logS', title: 'LogS', color: '#0050C9' },
  { key: 'calculated_properties.ADMET.ames_toxicity.probability', title: 'AMES tox', color: '#001959'}, 
  { key: 'calculated_properties.Bioavailability', title: 'Bio Availability', color: '#FF9898'},
  { key: 'calculated_properties.Ghose Filter', title: 'Ghose Filter', color: '#17D74D'},
  { key: 'calculated_properties.H Bond Acceptor Count', title: 'H Bond Acceptor Count', color: '#AE2AFF'}, 
  { key: 'calculated_properties.H Bond Donor Count', title: 'H Bond Donor Count', color: '#0050C9' },
  { key: 'calculated_properties.MDDR-Like Rule', title: 'MDDR-Like Rule', color: '#001959'},
  { key: 'calculated_properties.Molecular Formula', title: 'Molecular Formula', color: '#17D74D'},
  { key: 'calculated_properties.Molecular Weight', title: 'Molecular Weight', color: '#AE2AFF'},
  { key: 'calculated_properties.Monoisotopic Weight', title: 'Monoisotopic Weight', color: '#0050C9'},
  { key: 'calculated_properties.Number of Rings', title: 'Number of Rings', color: '#001959'},
  { key: 'calculated_properties.Physiological Charge', title: 'Physiological Charge', color: '#FF9898'},
  { key: 'calculated_properties.Polar Surface Area (PSA)', title: 'Polar Surface Area (PSA)', color: '#17D74D'},
  { key: 'calculated_properties.Polarizability', title: 'Polarizability', color: '#AE2AFF'},
  { key: 'calculated_properties.Refractivity', title: 'Refractivity', color: '#0050C9'},
  { key: 'calculated_properties.Rotatable Bond Count', title: 'Rotatable Bond Count', color: '#001959'},
  { key: 'calculated_properties.Rule of Five', title: 'Rule of Five' , color: '#17D74D'},
  { key: 'calculated_properties.pKa (strongest acidic)', title: 'pKa (strongest acidic)', color: '#AE2AFF' },
  { key: 'calculated_properties.pKa (strongest basic)', title: 'pKa (strongest basic)' ,color: '#0050C9' }
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


export const DrugProperties = (
  {drug}) => {
    if (!drug) {
      return (
        <Box>
          <Paper elevation={2} sx={{ justifyContent: 'center', alignItems: 'center', width: 450, height: 251, display: 'flex', flexGrow: 1, marginBottom: '50px'}}>
            <Typography>Click a drug</Typography>
          </Paper>
        </Box>
      )
    }

    return (
      <Box>
        <Paper elevation={2} sx={{  width: 450, height: 271, marginBottom: '50px'}}>
          <CardContent sx = {{padding: '16px 5px 16px 16px'}}>
            <Grid container sx= {{marginBottom: '5px'}}>
              <Grid item xs={5}>
                <Typography variant="h5" sx={{color:'#383874', 'marginBottom': '20px', position: 'relative'}} gutterBottom component="div"> Drug Properties </Typography>
              </Grid>
              <Grid item xs={6}>
              <Typography sx={{color: '#383874', fontSize: '13px', textAlign: 'right', marginTop: '5px'}}>({drug.name})</Typography>
              </Grid>
            </Grid>
            <Paper sx={{height: 180, overflowY: 'scroll', boxShadow: 'none'}}>
              <Grid container>
                {
                  keys.map(key => (
                    <Fragment key={key.title}>
                      <Grid item xs={8} sx={{marginBottom : '10px'}}>
                        <Box component="div" sx={{height: '10px', width: '10px', borderRadius: '50%' , backgroundColor:key.color, display: 'inline-block'}}></Box>
                          <Typography sx={{'fontWeight': 'bold', color: '#383874', position:'relative', display: 'inline-block', paddingLeft: '10px'}}>
                            {key.title}
                          </Typography>
                        </Grid>
                        <Grid item xs={3} sx={{marginBottom : '10px'}}>
                          <Typography sx={{ color: '#9292C1', textAlign: 'right'}}>{fetchFromObject(drug, key.key)}</Typography>
                        </Grid>
                      </Fragment>
                    ))
                  }
                </Grid>
              </Paper>
            </CardContent>
          </Paper>
        </Box>
      );
    }
