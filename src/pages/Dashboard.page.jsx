import { Box, Button, Grid, Typography } from "@mui/material";
import { DrugAutocomplete } from "../modules/drug-interaction/DrugAutocomplete";
import { MoleculeCard } from "../modules/dashboard/MoleculeCard";
import { DrugProperties } from "../modules/dashboard/DrugProperties";
import { DrugInteraction } from "../modules/dashboard/drug-interaction/DrugInteraction";
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DTI } from "../modules/dashboard/DTI";
import { CategoryAutocomplete } from "../modules/drug-interaction/CategoryAutocomplete";
import { Navbar } from "../modules/dashboard/Navbar";
import { DashboardContextProvider } from "../modules/dashboard/context/DashboardContext";
import { useDashboardContext } from "../modules/dashboard/context/useDashboarContext";
import { AdverseEffects } from "../modules/dashboard/AdverseEffects";

export const DashboardPage = () => {
  const {state, dispatch} = useDashboardContext();

  const setDetail = (molecule) => () => {
    dispatch({type: 'selectMolecule', payload: molecule})
  }
  const removeMolecule = (molecule) => () => {
    dispatch({type: 'removeMolecule', payload: molecule})
  }

  const setCategory = (category) => {
    dispatch({type: 'setCategory', payload: category});
  }

  const _onDrugSelected = (molecule) => {
    dispatch({type: 'addMolecule', payload: molecule});
  }

  return (
    <Box>
      <Navbar/>
      <DndProvider backend={HTML5Backend}>
        <Box pl={5} pr={5} className="dashboarddnd">
          <Box>
            <Typography variant="h5" textAlign="center" color="primary" gutterBottom>Drug Interactions</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" gutterBottom>Molecule Selection</Typography>
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
                  category={state.category}
                  label="Add Molecule"/>
                <Grid container spacing={4} pt={2}>
                  {state.molecules.map(molecule => (
                    <Grid item key={molecule.drugbank_id}>
                      <MoleculeCard
                        molecule={molecule}
                        onClick={setDetail(molecule)}
                        onDelete={removeMolecule(molecule)}
                        selected={state.interactingMolecules.map(mol => mol.drugbank_id).includes(molecule.drugbank_id)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>              
            </Grid>
            <Grid item xs={6}
                  sx={{justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Box sx={{justifyContent: 'center', display: 'flex', flexDirection: 'row'}}>
                <DrugInteraction/>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <DTI/>              
            </Grid>
          </Grid>
          {state.molecules.length > 0 && 
            <Grid container sx={{transform: 'translateY(-10)'}}>
              <Grid xs={3}>
                <Box>
                  <DrugProperties/>
                </Box>
              </Grid>
              <Grid xs={6}></Grid>
              <Grid xs={3}>
                <Box pt={2} bgcolor="transparent">
                  <AdverseEffects />
                </Box>              
              </Grid>
            </Grid>
          }
        </Box>
      </DndProvider>
    </Box>
  )
}

export const Dashboard = () => (
  <DashboardContextProvider>
    <DashboardPage/>
  </DashboardContextProvider>
)
