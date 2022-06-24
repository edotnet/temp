import { Box, Grid, Typography } from "@mui/material";
import { MoleculeAutocomplete } from "../modules/dashboard/MoleculeAutocomplete";
import { MoleculeCard } from "../modules/dashboard/MoleculeCard";
import { DrugProperties } from "../modules/dashboard/DrugProperties";
import { DrugInteraction } from "../modules/dashboard/drug-interaction/DrugInteraction";
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { CategoryAutocomplete } from "../modules/drug-interaction/CategoryAutocomplete";
import { Navbar } from "../modules/dashboard/Navbar";
import { useDashboardContext } from "../modules/dashboard/context/useDashboarContext";
import { TargetAutocomplete } from "../modules/dti/TargetAutocomplete";
import { PresentationModal } from "../modules/dashboard/presentation-modal/PresentationModal";
import { PDBSelector } from "../modules/3dmol/PDBSelector";
import './Dashboard.scss'

export const Dashboard = () => {
  const {state, dispatch} = useDashboardContext();

  const setDetail = (molecule) => (e) => {
    molecule.coordinates = {
      x: e.clientX,
      y: e.clientY,
    }
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

  const _onProteinSelected = (protein) => {
    dispatch({type: 'addProtein', payload: protein})
  }

  return (
    <Box>
      <Navbar/>
      <DndProvider backend={HTML5Backend}>
        <Grid pl={5} pr={5} className="dashboarddnd">
          <Box>
            <Typography variant="h5" className="title" color="secondary">DRUG INTERACTOR</Typography>
            <Typography variant="h6" className="subTitle">Drop molecules here for checking
              interactions </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography variant="h4" color="secondary" gutterBottom>DRUG INTERACTION</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CategoryAutocomplete
                    key="category-autocomplete"
                    onChange={setCategory}
                    onEmpty={() => setCategory(null)}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TargetAutocomplete onChange={_onProteinSelected} label="ADD TARGET PROTEIN"/>
                  {state.protein && <Box pt={3}>
                    <PDBSelector options={state.protein.pdb_ids}/>
                  </Box>}
                </Grid>
                <Grid item xs={12}>
                  <Box pt={2}>
                    <MoleculeAutocomplete
                      key="drug-autocomplete"
                      onChange={_onDrugSelected}
                      category={state.category}
                      label="+ Add Drug Molecule"/>
                  </Box>
                  <Box pl={1} pt={2}>
                    {state.molecules.length > 0 &&
                      <Typography style={{fontSize: 16, fontWeight: 300}}>Selected for interaction:</Typography>}
                  </Box>
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
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <DrugInteraction/>
            </Grid>
            <Grid item xs={3}>
              <PresentationModal/>
            </Grid>
          </Grid>
        </Grid>
        <DrugProperties/>
      </DndProvider>
    </Box>
  )
}
