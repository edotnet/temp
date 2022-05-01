import { Box, CardContent, Grid, ListItem, Paper, Typography, Avatar, ListItemText } from "@mui/material";
import { TargetAutocomplete } from "../dti/TargetAutocomplete";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { useEffect, useMemo } from "react";
import InfoProtein from '../../assets/info-protein.png';
import { ModalPaper } from "../../infrastructure/components/ModalPaper";
import { Hr } from "../../infrastructure/components/Hr.component";
import { useDashboardContext } from "./context/useDashboarContext";

const Graph = ({ width }) => {
  const rest = 100 - width*10;
  return (
    <div style={{
      width: `calc(100% - ${rest}%)`,
      height: 14,
      objectFit: 'contain',
      backgroundImage: 'linear-gradient(to left, rgba(0, 103, 255, 0.61) 0%, rgba(127, 0, 255, 0.62) 35%, rgba(255, 83, 0, 0.38) 100%)'
    }}/>
  )
}

export const DTI = () => {
  const { state, dispatch} = useDashboardContext();
  const {protein} = state;
  const url = '/dti'
  const {data, fetch, reset} = useApiCall(url, 'POST', null, false);

  const result = useMemo( () => {
    if (!data || !protein) {
      return null;
    }

    return (
      <ModalPaper elevation={15}>
        <Box p={3}>
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
          <Grid container>
            <Grid item xs={3}>
              {data && data.map(el => (
                <Box key={el.label}>
                  <Typography sx={{fontSize: 14, fontWeight: 'bold', mb: -1}}>{el.label}</Typography>
                  <Typography sx={{fontSize: 20, fontWeight: 300, color: '#141414'}}>{el.value.toFixed(4)}</Typography>
                </Box>
              ))}
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={8}>
              <Box sx={{
                background: 'repeating-linear-gradient(\n' +
                  '  to right,\n' +
                  '  rgba(0, 0, 0, 0.11),\n' +
                  '  rgba(0, 0, 0, 0.11) 1px,' +
                  ' white 2px, white 20px' +
                  '\n)'
              }}>
                {data && data.map(el => (
                  <Box pt={3.3} key={el.value}>
                    <Graph width={el.value}/>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ModalPaper>
    )
  }, [data, protein]);

  const handleChange = (protein) => {
    dispatch({type:'addProtein', payload: protein})
  }

  useEffect(() => {
    const molecules = state.molecules.map(molecule => ({
      id: molecule.calculated_properties.SMILES,
      label: molecule.name,
    }));
    if (molecules.length && protein) {
      fetch(url, 'POST', {target: protein, drugs: molecules});
    }
    if (data && !molecules.length) {
      reset();
    }
  }, [protein, state.molecules])
  return (
    <>
      <Typography variant="h5">Target Interaction</Typography>
      <TargetAutocomplete onChange={handleChange} label="Add target"/>
      <Box pt={3}>
        {result}
      </Box>
    </>
  )
}
