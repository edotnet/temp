import { Box, CardContent, CardHeader, Grid, Paper, Typography } from "@mui/material";

const keys = [
  {
    key: 'calculated_properties.Molecular Weight',
    title: 'Molecular mass',
  }, {
    key: 'calculated_properties.logP',
    title: 'LogP',
  },
  {
    key: 'calculated_properties.ALOGPS.logS',
    title: 'LogS'
  },
  {
    key: 'calculated_properties.ADMET.ames_toxicity.probability',
    title: 'AMES tox',
  }
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
  if (!drug) {
    return (
      <Box>
        <Paper elevation={2} sx={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 300,
          height: 200,
          display: 'flex',
          flexGrow: 1
        }}>
          <Typography>Click a drug</Typography>
        </Paper>
      </Box>
    )
  }

  return (
    <Box>
      <Paper elevation={2} sx={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 251,
        display: 'flex',
        flexGrow: 1,
      }}>
        <CardContent>
          <Typography variant="h5" gutterBottom component="div">Drug Properties</Typography>
          <Grid container spacing={1}>
            {keys.map(key => (
              <>
                <Grid item xs={7}>
                  <Typography>{key.title}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>{fetchFromObject(drug, key.key)}</Typography>
                </Grid>
              </>
            ))}
          </Grid>
        </CardContent>
      </Paper>
    </Box>
  );
}
