import { Box, CardContent, Grid, ListItem, Paper, Typography, Avatar, ListItemText } from "@mui/material";
import { TargetAutocomplete } from "../dti/TargetAutocomplete";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { useEffect, useMemo } from "react";
import InfoProtein from '../../assets/info-protein.png';

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
export const DTI = ({molecules, setTarget, target}) => {
  const url = '/dti'
  const {data, fetch} = useApiCall(url, 'POST', null, false);

  const result = useMemo( () => {
    if (!data || !target) {
      return null;
    }

    return (
      <Paper elevation={15} sx={{
        borderRadius: 5,
        backdropFilter: 'blur(28px)',
        boxShadow: '-21px 9px 46px 0 rgba(87, 76, 153, 0.29)',
        backgroundColor: 'rgba(255, 255, 255, 0.79)'}}>
        <CardContent>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Avatar>
              <img src={InfoProtein} alt="InfoProtein"/>
            </Avatar>
            <Box pl={2}>
              <Typography sx={{fontSize: 15, fontWeight: 500}}>Target Interaction, protein:</Typography>
              <Typography sx={{fontSize: 18}}>{target.label}</Typography>
            </Box>
          </Box>
          <Box my={2} style={{border: 'dashed 1px #979797', width: '100%', height: 1}}/>
          <Typography sx={{color: '#1d1d1d', fontSize: 18, fontWeight: 500}} gutterBottom>Binding Interaction score</Typography>
          <Grid container>
            <Grid item xs={6}>
              {data && data.map(el => (
                <Box>
                  <Typography sx={{fontSize: 14, fontWeight: 'bold', mb: -1}}>{el.label}</Typography>
                  <Typography sx={{fontSize: 20, fontWeight: 300, color: '#141414'}}>{el.value}</Typography>
                </Box>
              ))}
            </Grid>
            <Grid item xs={6}>
              <Box sx={{background: 'repeating-linear-gradient(\n' +
                  '  to right,\n' +
                  '  rgba(0, 0, 0, 0.11),\n' +
                  '  rgba(0, 0, 0, 0.11) 1px,' +
                  ' white 2px, white 20px' +
                  '\n)'}}>
                {data && data.map(el => (
                  <Box pt={3.35}>
                    <Graph width={el.value}/>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>
    )
  }, [data, target]);

  useEffect(() => {
    molecules = molecules.map(molecule => ({
      id: molecule.calculated_properties.SMILES,
      label: molecule.name,
    }));
    if (molecules.length && target) {
      fetch(url, 'POST', {target, drugs: molecules});
    }
  }, [target, molecules])
  return (
    <>
      <Typography variant="h5">Target Interaction</Typography>
      <TargetAutocomplete onChange={setTarget} label="Add target"/>
      <Box pt={3}>
        {result}
      </Box>
    </>
  )
}
