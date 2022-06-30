import { Avatar, Box, Grid, LinearProgress, Typography } from "@mui/material";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { useEffect, useMemo } from "react";
import InfoProtein from '../../assets/info-protein.png';
import { Hr } from "../../infrastructure/components/Hr.component";
import { useDashboardContext } from "./context/useDashboarContext";
import { GraphBackground } from "../../infrastructure/components/GraphBackground";
import { ThreeDMol } from "../3dmol/ThreeDMol";
import {Endpoints} from "../../config/Consts";

export const DTI = () => {
  const {state, dispatch} = useDashboardContext();
  const url = Endpoints.ml.drugProtein;
  const {data, fetch, loading, reset} = useApiCall(url, 'POST', null, false);
  //const data = [{"label": "Favipiravir", "value": 4.706718444824219}, {"label": "Ibuproxam", "value": 5.687283992767334}, {"label": "Dexibuprofen", "value": 5.887485027313232}, {"label": "D-4-hydroxyphenylglycine", "value": 5.576238632202148}];
  //const loading = false;
  const progressStyle = value => ({
    pl: 1,
    fontSize: 16,
    fontWeight: 400,
    backgroundColor: 'rgba(127, 112, 218)',
    position: 'absolute',
    top: 23,
    color: 'white',
    display: 'flex',
    width: `calc(100% + ${value * 5}%)`
  });
  const result = useMemo(() => {
    if (!data || data.code !== 200)
      return null;

    return data.result.map((drug, i) => (
        <Box key={drug.name} sx={{position: 'relative'}}>
          <Typography component="span" sx={{fontSize: 16, fontWeight: 'bold'}}>{state.molecules[i].name}</Typography><br/>
          <Typography component="span" sx={progressStyle(drug)}>{(drug + 6).toFixed(4)}</Typography>
          <div style={{height: 35}}/>
        </Box>
    ))
  }, [data, state.molecules])

  useEffect(() => {
    const smiles = state.molecules.map(molecule => molecule.calculated_properties.SMILES);
    if (smiles.length && state.protein) {
      fetch(url, 'POST', {smiles, protein: state.protein.amino_acid_sequence});
    }
    if (data && !smiles.length) {
      reset();
    }
  }, [state.protein, state.molecules])

  if (!state.protein || !state.molecules.length) {
    return null;
  }

  return (
    <>
      <Typography variant="subtitle1">Target Interaction, protein:</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ border: '1px dashed red', width: 60, height: 60 }}>
          <img src={InfoProtein} alt="InfoProtein" />
        </Avatar>
        <Box pl={2}>
          <Typography variant="body1" className='body1-lg-light'>{state.protein.name}</Typography>
        </Box>
      </Box>
      <ThreeDMol />
      <Hr />
      <Typography variant="subtitle1" gutterBottom>Binding Interaction score (pEC50)</Typography>
      {loading && <LinearProgress />}
      <GraphBackground>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {result}
          </Grid>
        </Grid>
      </GraphBackground>
    </>
  )
}
