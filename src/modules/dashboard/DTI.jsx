import { Box, CardContent, Grid, ListItem, Paper, Typography, Avatar, ListItemText } from "@mui/material";
import { TargetAutocomplete } from "../dti/TargetAutocomplete";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { useEffect, useMemo } from "react";
import InfoProtein from '../../assets/info-protein.png';
import { ModalPaper } from "../../infrastructure/components/ModalPaper";
import { Hr } from "../../infrastructure/components/Hr.component";
import { useDashboardContext } from "./context/useDashboarContext";
import {GraphBackground} from "../../infrastructure/components/GraphBackground";
import {Graph} from "../../infrastructure/components/graph/Graph";

export const DTI = () => {
  const { state, dispatch} = useDashboardContext();
  const {protein} = state;
  const url = '/dti'
  //const {data, fetch, reset} = useApiCall(url, 'POST', null, false);
  const data = [{"label": "Favipiravir", "value": 4.706718444824219}, {"label": "Ibuproxam", "value": 5.687283992767334}, {"label": "Dexibuprofen", "value": 5.887485027313232}, {"label": "D-4-hydroxyphenylglycine", "value": 5.576238632202148}];

  useEffect(() => {
    const molecules = state.molecules.map(molecule => ({
      id: molecule.calculated_properties.SMILES,
      label: molecule.name,
    }));
    if (molecules.length && protein) {
      //fetch(url, 'POST', {target: protein, drugs: molecules});
    }
    if (data && !molecules.length) {
      //reset();
    }
  }, [protein, state.molecules])

  if (!protein || !state.molecules.length) {
    return null;
  }

  return (
    <>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Avatar>
          <img src={InfoProtein} alt="InfoProtein"/>
        </Avatar>
        <Box pl={2}>
          <Typography sx={{fontSize: 15, fontWeight: 500}}>Target Interaction, protein:</Typography>
          <Typography sx={{fontSize: 18}}>{protein.label}</Typography>
        </Box>
      </Box>
      <Hr/>
      <Typography sx={{color: '#1d1d1d', fontSize: 18, fontWeight: 500}} gutterBottom>Binding Interaction score</Typography>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          {data && data.map(el => (
            <Box key={el.label}>
              <Typography sx={{fontSize: 14, fontWeight: 'bold', mb: -1}}>{el.label}</Typography>
              <Typography sx={{fontSize: 20, fontWeight: 300, color: '#141414'}}>{el.value.toFixed(4)}</Typography>
            </Box>
          ))}
        </Grid>
        <Grid item xs={7}>
          <GraphBackground>
            {data && data.map(el => (
              <Box pt={3.3} key={el.value}>
                <Graph width={el.value}/>
              </Box>
            ))}
          </GraphBackground>
        </Grid>
      </Grid>
    </>
  )
}
