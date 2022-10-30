import {Box, Button, Grid, Modal, Stack, Typography, useTheme} from '@mui/material';
import { MoleculeAutocomplete } from "../modules/dashboard/MoleculeAutocomplete";
import { MoleculeCard } from "../modules/dashboard/MoleculeCard";
import { DrugProperties } from "../modules/dashboard/DrugProperties";
import { DrugInteraction } from "../modules/dashboard/drug-interaction/DrugInteraction";
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import {OrganismAutocomplete} from '../modules/dashboard/OrganismAutocomplete';
import { CategoryAutocomplete } from "../modules/drug-interaction/CategoryAutocomplete";
import { Navbar } from "../modules/dashboard/Navbar";
import { useDashboardContext } from "../modules/dashboard/context/useDashboarContext";
import { TargetAutocomplete } from "../modules/dti/TargetAutocomplete";
import { PresentationModal } from "../modules/dashboard/presentation-modal/PresentationModal";
import { PDBSelector } from "../modules/3dmol/PDBSelector";
import './Dashboard.scss'
import { useNavigate } from "react-router-dom";
import { DemographicFeature } from "../modules/dashboard/DemographicFeature";
import {PrimaryButton} from "../infrastructure/components/PrimaryButton";
import {ArrowRight} from "@mui/icons-material";
import {Endpoints} from "../config/Consts";
import {dockingFetcher} from "../modules/dashboard/DockingFetcher";

export const Dashboard = () => {
  const {state, dispatch} = useDashboardContext();
  const theme = useTheme();
  const navigate = useNavigate();
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

  const _onDrugSelected = (molecule) => {
    dispatch({type: 'addMolecule', payload: molecule});
    if (state.pdbid) {
      dockingFetcher(state.pdbid, molecule, dispatch);
    }
  }

  const _onProteinSelected = (protein) => {
    dispatch({type: 'addProtein', payload: protein})
  }

  const _onOrganismSelected = (organism) => {
    dispatch({type: 'addOrganism', payload: organism})
  }

  const _onDrugToXDL = () => {
    navigate('/engine/drug2xdl')
  }

  return (
    <>
      <Box>
        <DndProvider backend={HTML5Backend}>
          <Grid pl={5} pr={5} className="dashboarddnd">
            <Box>
              <Typography gutterBottom variant="h5" className="title" color="secondary">DRUG INTERACTOR</Typography>
              <Typography variant="h6" className="subTitle">Drop molecules here for checking interactions </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="h4" color="secondary" gutterBottom>DRUG INTERACTION</Typography>
                <Grid container spacing={2}>
                  {/*
                  <Grid item xs={12}>
                    <CategoryAutocomplete
                      key="category-autocomplete"
                      onChange={setCategory}
                      onEmpty={() => setCategory(null)}
                      variant="standard"
                    />
                  </Grid>
                    */}
                  <Grid item xs={12}>
                    <Stack spacing={2}>
                      <TargetAutocomplete onChange={_onProteinSelected} label="ADD TARGET PROTEIN"/>
                      {state.protein && <OrganismAutocomplete onChange={_onOrganismSelected} label="ADD TARGET ORGANISM"/>}
                      {state.organism && <PDBSelector pdbs={state.organism.pdbs.sort((a,b) => b.pident - a.pident)} />}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Box pt={2}>
                      <MoleculeAutocomplete
                        key="drug-autocomplete"
                        onChange={_onDrugSelected}
                        category={state.category}
                        label="+ Add Drug Molecule"/>
                    </Box>
                    <Box sx={{pt: 3, pl: 1, display: 'flex', justifyContent: 'space-between'}}>
                      {state.molecules.length > 0 &&
                        <>
                          <Typography style={{fontSize: 16, fontWeight: 300}}>Selected for interaction:</Typography>
                          <PrimaryButton onClick={_onDrugToXDL} sx={{mt: -1}} title="to XDL" endIcon={<ArrowRight />}/>
                        </>}
                    </Box>
                    <Grid container spacing={4} pt={2} style={{minHeight: 150}}>
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
                <DemographicFeature/>
              </Grid>
              <Grid item xs={6}>
                <DrugInteraction />
              </Grid>
              <Grid item xs={3}>
                <PresentationModal/>
              </Grid>
            </Grid>
          </Grid>
          <DrugProperties/>
        </DndProvider>
      </Box>
    </>
  )
}
