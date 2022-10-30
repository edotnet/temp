import {Avatar, Box, Grid, LinearProgress, Typography, useTheme} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import InfoProtein from '../../assets/info-protein.png';
import { Hr } from "../../infrastructure/components/Hr.component";
import { useDashboardContext } from "./context/useDashboarContext";
import { GraphBackground } from "../../infrastructure/components/GraphBackground";
import { ThreeDMol } from "../3dmol/ThreeDMol";
import {Endpoints} from "../../config/Consts";
import {api} from "../../infrastructure/api/instance";

const url = Endpoints.ml.drugProtein;
const urlKd = Endpoints.ml.drugProteinOld;

export const DTI = () => {
  const {state, dispatch} = useDashboardContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const progressStyle = value => ({
    pl: 1,
    fontSize: 16,
    fontWeight: 400,
    backgroundColor: theme.palette.primary.main,
    position: 'absolute',
    top: 23,
    color: 'white',
    display: 'flex',
    width: `calc(100% + ${(value-6/* 6 for style issues*/) * 10}%)`
  });
  const result = useMemo(() => {
    if (!data)
      return null;

    return data.sort((a, b) => a.pec50 - b.pec50).map((drug) => (
      <Box key={drug.name} sx={{position: 'relative'}}>
          <Typography component="span" sx={{fontSize: 16, fontWeight: 'bold'}}>{drug.name}</Typography><br/>
          <Typography component="span" sx={progressStyle(drug.pec50)}>{(drug.pec50).toFixed(4)}, {parseFloat(drug.kd).toFixed(2)}</Typography>
          <div style={{height: 35}}/>
        </Box>
    ))
  }, [data])

  useEffect(() => {
    const smiles = state.molecules.map(molecule => molecule.calculated_properties.SMILES.replaceAll('\\', '\\\\'));
    if (smiles.length && state.organism) {
      setLoading(true);
      const promises = [
        api.post(url, {smiles, protein: state.organism.sequence}),
        api.post(urlKd, {smiles, protein: state.organism.sequence}),
      ];
      Promise.all(promises).then(([pec50, kd]) => {
        const data = [];
        kd.data.forEach((kdel, i) => {
          data.push({
            name: state.molecules[i].name,
            kd: kdel,
            pec50: pec50.data[i],
          })
        })
        setData(data);
      }).catch(err => console.log('err', err))
        .finally(() => setLoading(false));
    }
  }, [state.organism, state.molecules])

  if (!state.organism || !state.molecules.length) {
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
      <Typography variant="subtitle1" gutterBottom sx={{mb: 2}}>Binding Interaction score (pEC50, log(Kd [nM]))</Typography>
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
