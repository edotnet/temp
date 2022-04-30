import { Box, Button, Grid, Typography } from "@mui/material";
import { DrugAutocomplete } from "../modules/drug-interaction/DrugAutocomplete";
import { useState } from "react";
import { MoleculeCard } from "../modules/dashboard/MoleculeCard";
import { DrugProperties } from "../modules/dashboard/DrugProperties";
import { DrugInteraction } from "../modules/dashboard/DrugInteraction";
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DTI } from "../modules/dashboard/DTI";
import { CategoryAutocomplete } from "../modules/drug-interaction/CategoryAutocomplete";
import { AppBarComponent } from "../infrastructure/components/Appbar.component";
import { useEventDispatch } from "../infrastructure/event-system/hooks/useEventDispatch";
import { EventTypes } from "../infrastructure/event-system/Event.types";

export const Dashboard = () => {
  const [molecules, setMolecules] = useState([]);
  const [interactingMolecules, setInteractingMolecules] = useState([]);
  const [detail, setDetail] = useState(false);
  const [category, setCategory] = useState(null);
  const [target, setTarget] = useState(null);
  const dispatch = useEventDispatch();
  const removeMolecule = (molecule) => () => {
    setMolecules(prev => prev.filter(prevMolecule => prevMolecule.drugbank_id !== molecule.drugbank_id));
  }

  const _onDrugSelected = (molecule) => {
    if (molecules.map(mol => mol.drugbank_id).includes(molecule.drugbank_id)) {
      return;
    }
    setMolecules(prev => [...prev, molecule])
  }

  const reset = () => {
    setInteractingMolecules([]);
    dispatch(EventTypes.DASHBOARD.RESET, null);
  }

  return (
    <>
      <AppBarComponent/>
      <DndProvider backend={HTML5Backend}>
        <Box pl={5} pr={5}>
          <Box mt={2}>
            <Typography variant="h1" textAlign="center" color="primary">Drug Interactions</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Grid container spacing={2}>
                {/*<Grid item xs={6}>
              <Typography variant="h5">Target Disease</Typography>
              <TargetDiseaseAutocomplete label="Without filter" onChange={() => null} variant="standard"/>
            </Grid>*/}
                <Grid item xs={12}>
                  <Typography variant="h5">Drug Category</Typography>
                  <CategoryAutocomplete
                    key="category-autocomplete"
                    onChange={setCategory}
                    onEmpty={() => setCategory(null)}
                    variant="standard"
                  />
                </Grid>
              </Grid>
              <Box sx={{pt: 2}}>
                <DrugAutocomplete
                  key="drug-autocomplete"
                  onChange={_onDrugSelected}
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
            <Grid item xs={6}
                  sx={{justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Box sx={{justifyContent: 'center', display: 'flex', mt: 3}}>
                {interactingMolecules.length > 0 &&
                <Button variant="outlined" onClick={reset}>Clear</Button>}
              </Box>
              <Box sx={{justifyContent: 'center', display: 'flex', flexDirection: 'row'}}>
                <DrugInteraction onNewItems={setInteractingMolecules}/>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <DTI molecules={molecules} setTarget={setTarget} target={target}/>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={3}>
              {molecules.length > 0 && <DrugProperties drug={detail}/>}
            </Grid>
            <Grid item xs={6}>

            </Grid>
            <Grid item xs={3}/>
          </Grid>
        </Box>
      </DndProvider>
    </>
  )
}
