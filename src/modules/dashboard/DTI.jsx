import { Avatar, Box, Grid, LinearProgress, Typography } from "@mui/material";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { useEffect } from "react";
import InfoProtein from '../../assets/info-protein.png';
import { Hr } from "../../infrastructure/components/Hr.component";
import { useDashboardContext } from "./context/useDashboarContext";
import { GraphBackground } from "../../infrastructure/components/GraphBackground";
import { ThreeDMol } from "../3dmol/ThreeDMol";

export const DTI = () => {
  const { state, dispatch } = useDashboardContext();
  const { protein } = state;
  const url = '/dti'
  const { data, fetch, loading, reset } = useApiCall(url, 'POST', null, false);
  //const data = [{"label": "Favipiravir", "value": 4.706718444824219}, {"label": "Ibuproxam", "value": 5.687283992767334}, {"label": "Dexibuprofen", "value": 5.887485027313232}, {"label": "D-4-hydroxyphenylglycine", "value": 5.576238632202148}];
  //const loading = false;

  useEffect(() => {
    const molecules = state.molecules.map(molecule => ({
      id: molecule.calculated_properties.SMILES,
      label: molecule.name,
    }));
    if (molecules.length && protein) {
      const target = {
        id: protein.amino_acid_sequence,
        label: protein.name,
      }
      fetch(url, 'POST', { target, drugs: molecules });
    }
    if (data && !molecules.length) {
      reset();
    }
  }, [protein, state.molecules])

  if (!protein || !state.molecules.length) {
    return null;
  }
  const progressStyle = value => ({
    pl: 1,
    fontSize: 16,
    fontWeight: 400,
    backgroundColor: 'rgba(127, 112, 218)',
    position: 'absolute',
    top: 23,
    color: 'white',
    display: 'flex',
    width: `calc(100% - ${value * 5}%)`
  });

  return (
    <>
      <Typography className="TypoBody-subTitle" >Target Interaction, protein:</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ border: '1px dashed red', width: 60, height: 60 }}>
          <img src={InfoProtein} alt="InfoProtein" />
        </Avatar>
        <Box pl={2}>
          <Typography className="TypoBody-paragraph" >{protein.name}</Typography>
        </Box>
      </Box>
      <ThreeDMol />
      <Hr />
      <Typography className="TypoBody-subTitle" gutterBottom>Binding Interaction score</Typography>
      {loading && <LinearProgress />}
      <GraphBackground>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {data && data.map(el => (
              <Box key={el.label} sx={{ position: 'relative' }}>
                <Typography component="span" sx={{ fontSize: 14, fontWeight: 'bold' }}>{el.label}</Typography><br />
                <Typography component="span" sx={progressStyle(el.value)}>{el.value.toFixed(4)}</Typography>
                <div style={{ height: 35 }} />
              </Box>
            ))}
          </Grid>
        </Grid>
      </GraphBackground>
    </>
  )
}
