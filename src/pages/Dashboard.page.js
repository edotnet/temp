import { Box, Grid, Paper, Typography } from "@mui/material";
import { DrugAutocomplete } from "../modules/drug-interaction/DrugAutocomplete";
import { useState } from "react";
import { MoleculeCard } from "../modules/dashboard/MoleculeCard";
import { DrugProperties } from "../modules/dashboard/DrugProperties";
import { DrugInteraction } from "../modules/dashboard/DrugInteraction";
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

export const Dashboard = () => {
  const [molecules, setMolecules] = useState([]);
  const [detail, setDetail] = useState(false);
  const removeMolecule = (molecule) => () => {
    setMolecules(prev => prev.filter(prevMolecule => prevMolecule.drugbank_id !== molecule.drugbank_id));
  }

  return (
    <DndProvider backend={HTML5Backend}>
    <Box pl={5} pr={5}>
      <Box mt={2}>
        <Typography variant="h1" textAlign="center" color="primary">Drug Combinations</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h5">Target Disease</Typography>
              <Typography>COVID-19</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">Drugs</Typography>
              <Typography>Favipiravir</Typography>
            </Grid>
          </Grid>
          <Box sx={{pt: 2}}>
            <DrugAutocomplete
              onChange={molecule => setMolecules(prev => [...prev, molecule])}
              label="Add Molecule"
              variant="standard"/>
            <Grid container spacing={4} pt={2}>
              {molecules.map(molecule => (
                <Grid item>
                  <MoleculeCard
                    molecule={molecule}
                    onClick={() => setDetail(molecule)}
                    onDelete={removeMolecule(molecule)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={6} sx={{justifyContent: 'center', display: 'flex'}}>
          <DrugInteraction />
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {molecules.length > 0 && <DrugProperties drug={detail}/>}
      </Grid>
    </Box>
    </DndProvider>
  )
}
