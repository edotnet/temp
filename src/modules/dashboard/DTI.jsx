import {Box, Grid, LinearProgress, Paper, Stack, Typography} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import {Hr} from "../../infrastructure/components/Hr.component";
import {useDashboardContext} from "./context/useDashboarContext";
import {GraphBackground} from "../../infrastructure/components/GraphBackground";
import {Endpoints} from "../../config/Consts";
import {api} from "../../infrastructure/api/instance";

const url = Endpoints.ml.drugsProtein;

export const DTI = () => {
  const {state, dispatch} = useDashboardContext();

  const [loading, setLoading] = useState(false);
  const progressStyle = value => ({
    pl: 1,
    fontSize: 16,
    fontWeight: 400,
    backgroundColor: value > 51 ? 'green' : value > 40 ? 'yellow' : 'red',
    color: value > 51 ? 'white' : value > 40 ? 'black' : 'white',
    position: 'absolute',
    top: 23,
    display: 'flex',
    justifyContent: 'center',
    width: `calc(100% - ${100 - value}%)`
  });
  const result = useMemo(() => {
    if (!state.drugsProtein) return null;

    return state.drugsProtein.result.sort((a, b) => b.meanPercentage - a.meanPercentage).map((drug) => (
      <Box key={drug.name} sx={{
        position: 'relative', width: '100%', '.hover': {display: 'none'}, '&:hover .hover': {display: 'block'}
      }}>
        <Typography component="span" sx={{fontSize: 16, fontWeight: 'bold'}}>{drug.name}</Typography><br/>
        <Typography component="span"
                    sx={progressStyle(drug.meanPercentage)}>{(drug.meanPercentage).toFixed(2)}%</Typography>
        <div style={{height: 35}}/>
        <Paper sx={{position: 'absolute', top: 0}} className="hover">
          <Box sx={{
            borderRadius: 5,
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'flex-start',
            p: 4
          }}>
            <Stack spacing={1} direction="row">
              <Typography fontWeight="700">log(Kd [nm]):</Typography>
              <Typography>{drug.kdValue.toFixed(1)} ({drug.kdPercentage.toFixed(2)}%)</Typography>
            </Stack>
            <Stack spacing={1} direction="row">
              <Typography fontWeight="700"> pEC50:</Typography>
              <Typography>{drug.pec50Value.toFixed(1)} ({drug.pec50Percentage.toFixed(2)}%)</Typography>
            </Stack>
          </Box>
        </Paper>

      </Box>))
  }, [state.drugsProtein])

  useEffect(() => {
    const compounds = state.molecules.map(molecule => ({
      name: molecule.name, smiles: molecule.calculated_properties.SMILES.replaceAll('\\', '\\\\'),
    }));
    if (compounds.length && state.organism) {
      setLoading(true);
      api.post(url, {compounds, protein: state.organism.sequence}).then((res) => {
        dispatch({type: 'setDrugsProtein', payload: res.data});
      }).catch(err => console.log('err', err))
      .finally(() => setLoading(false));
    }
  }, [state.organism, state.molecules])

  if (!state.organism || !state.molecules.length) {
    return null;
  }

  return (<>
      <Hr/>
      <Typography variant="subtitle1" gutterBottom sx={{mb: 2}}>Binding Interaction score (pEC50, log(Kd
        [nM]))</Typography>
      {loading && <LinearProgress/>}
      <GraphBackground>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {result}
          </Grid>
        </Grid>
      </GraphBackground>
    </>)
}
