import { Box, Grid, Paper, Typography } from "@mui/material";
import { DrugAutocomplete } from "../modules/drug-interaction/DrugAutocomplete";
import { useState } from "react";
import { MoleculeCard } from "../modules/dashboard/MoleculeCard";
import { DrugProperties } from "../modules/dashboard/DrugProperties";
import { DrugInteraction } from "../modules/dashboard/DrugInteraction";
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DTI } from "../modules/dashboard/DTI";
import { CategoryAutocomplete } from "../modules/drug-interaction/CategoryAutocomplete";
import { TargetDiseaseAutocomplete } from "../modules/drug-interaction/TargetAutocomplete";
import { AppBarComponent } from "../infrastructure/components/Appbar.component";

export const Dashboard = () => {
  const [molecules, setMolecules] = useState([]);
  const [interactingMolecules, setInteractingMolecules] = useState([]);
  const [detail, setDetail] = useState(false);
  const [category, setCategory] = useState(null);
  const removeMolecule = (molecule) => () => {
    setMolecules(prev => prev.filter(prevMolecule => prevMolecule.drugbank_id !== molecule.drugbank_id));
  }

  return (
    <>
    <AppBarComponent/> 
    <DndProvider backend={HTML5Backend}>
    <Box pl={5} pr={5}>
      <Box mt={2}>
        <Typography variant="h1" textAlign="center" color="primary">Drug Combinations</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Grid container spacing={2}>
            {/*<Grid item xs={6}>
              <Typography variant="h5">Target Disease</Typography>
              <TargetDiseaseAutocomplete label="Without filter" onChange={() => null} variant="standard"/>
            </Grid>*/}
            <Grid item xs={12}>
              <Typography variant="h5">Category</Typography>
              <CategoryAutocomplete
                label="Without filter"
                onChange={setCategory}
                onEmpty={() => setCategory(null)}
                variant="standard"
              />
            </Grid>
          </Grid>
          <Box sx={{pt: 2}}>
            <DrugAutocomplete
              onChange={molecule => setMolecules(prev => [...prev, molecule])}
              category={category}
              label="Add Molecule"/>
            <Grid container spacing={4} pt={2}>
              {molecules.map(molecule => (
                <Grid item key={molecule.drugbank_id}>
                  <MoleculeCard
                    molecule={molecule}
                    onClick={() => setDetail(molecule)}
                    onDelete={removeMolecule(molecule)}
                    selected={interactingMolecules.map(mol => mol.drugbank_id).includes(molecule.drugbank_id)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={6} sx={{justifyContent: 'center', display: 'flex'}}>
          <DrugInteraction onNewItems={setInteractingMolecules} />
        </Grid>
        <Grid item xs={3}>
          <DTI drugs={molecules} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {molecules.length > 0 && <DrugProperties drug={detail}/>}
      </Grid>
    </Box>
    </DndProvider>
    </>
  )
}
