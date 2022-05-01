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

export const DashboardPage = () => {
  const {state, dispatch} = useDashboardContext();
  const {molecules, category, interactingMolecules} = state;

  const setDetail = (molecule) => () => {
    dispatch({type: 'selectMolecule', payload: molecule})
  }
  const removeMolecule = (molecule) => () => {
    dispatch({type: 'removeMolecule', payload: molecule})
  }

  const setCategory = (category) => () => {
    dispatch({type: 'setCategory', payload: category});
  }

  const _onDrugSelected = (molecule) => {
    dispatch({type: 'addMolecule', payload: molecule});
  }

  const reset = () => {
    dispatch({type: 'resetInteractingMolecules'})
  }

  return (
    <Box component='div' className="dashboardMain">
      <Navbar/>
      <DndProvider backend={HTML5Backend}>
        <Box pl={5} pr={5} className="dashboarddnd">
          <Box>
            <Typography variant="h1" textAlign="center" color="primary">Drug Interactions</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Grid container spacing={2}>
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
                        onClick={setDetail(molecule)}
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
              <Box sx={{justifyContent: 'center', display: 'flex', flexDirection: 'row'}}>
                <DrugInteraction/>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <DTI/>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={3}>
              {molecules.length > 0 && <DrugProperties/>}
            </Grid>
            <Grid item xs={6}>

            </Grid>
            <Grid item xs={3}/>
          </Grid>
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