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
    width: `calc(100% + ${value * 10}%)`
  });
  const result = useMemo(() => {
    if (!data)
      return null;

    return data.sort((a, b) => a.pec50 - b.pec50).map((drug) => (
      <Box key={drug.name} sx={{position: 'relative'}}>
          <Typography component="span" sx={{fontSize: 16, fontWeight: 'bold'}}>{drug.name}</Typography><br/>
          <Typography component="span" sx={progressStyle(drug.pec50)}>{(drug.pec50 + 6).toFixed(4)}, {parseFloat(drug.kd).toFixed(2)}</Typography>
          <div style={{height: 35}}/>
        </Box>
    ))
  }, [data])

  useEffect(() => {
    const smiles = state.molecules.map(molecule => molecule.calculated_properties.SMILES);
    const smilesKd = state.molecules.map(molecule => ({id: molecule.calculated_properties.SMILES.replaceAll('\\', '\\\\'), label: molecule.name}));
    let smilesKdString = "";
    smilesKd.forEach(smile => {
      smilesKdString += `{"id": "${smile.id}", "label": "${smile.label}"},`;
    });
    smilesKdString = smilesKdString.slice(0, -1);
    if (smiles.length && state.protein) {
      setLoading(true);
      const promises = [
        api.post(url, {smiles, protein: state.protein.amino_acid_sequence}),
        api.post(urlKd, {smiles: [smilesKdString], protein: state.protein.amino_acid_sequence}),
      ];
      Promise.all(promises).then(([pec50, kd]) => {
        const data = [];
        kd.data.result.forEach((kdel, i) => {
          data.push({
            name: Object.keys(kdel)[0],
            kd: Object.values(kdel)[0],
            pec50: pec50.data.result[i],
          })
        })
        setData(data);
      }).catch(err => console.log('err', err))
        .finally(() => setLoading(false));
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
      <Typography variant="subtitle1" gutterBottom sx={{mb: 2}}>Binding Interaction score (pEC50, Kd)</Typography>
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
