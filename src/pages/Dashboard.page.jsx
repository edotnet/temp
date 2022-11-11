import {Box, Grid, Stack, Typography, useTheme} from '@mui/material';
import {MoleculeAutocomplete} from "../modules/dashboard/MoleculeAutocomplete";
import {MoleculeCard} from "../modules/dashboard/MoleculeCard";
import {DrugProperties} from "../modules/dashboard/DrugProperties";
import {DrugInteraction} from "../modules/dashboard/drug-interaction/DrugInteraction";
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import {OrganismAutocomplete} from '../modules/dashboard/OrganismAutocomplete';
import {useDashboardContext} from "../modules/dashboard/context/useDashboarContext";
import {TargetAutocomplete} from "../modules/dti/TargetAutocomplete";
import {PresentationModal} from "../modules/dashboard/presentation-modal/PresentationModal";
import {PDBSelector} from "../modules/3dmol/PDBSelector";
import './Dashboard.scss'
import {useNavigate} from "react-router-dom";
import {DemographicFeature} from "../modules/dashboard/DemographicFeature";
import {dockingFetcher} from "../modules/dashboard/DockingFetcher";
import HAILO from '../assets/svg/HAILO.svg'

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

    return (
        <>
            <Box>
                <DndProvider backend={HTML5Backend}>
                    <Grid pl={5} pr={5} className="dashboarddnd">
                        <Grid container spacing={2}>
                            <Grid item xs={3} sx={{mt: 2}}>
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
                                            <TargetAutocomplete onChange={_onProteinSelected}
                                                                label="ADD TARGET PROTEIN"/>
                                            {state.protein && <OrganismAutocomplete onChange={_onOrganismSelected}
                                                                                    label="ADD TARGET ORGANISM"/>}
                                            {state.organism && <PDBSelector organism={state.organism}/>}
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
                                                    <Typography style={{fontSize: 16, fontWeight: 300}}>Selected for
                                                        interaction:</Typography>
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
                                <Stack spacing={2}>
                                    <img src={HAILO} alt="HAILO" style={{width: '15%', alignSelf: 'center'}}/>
                                    <Typography variant="subtitle1" align="center" >Drop molecules here for checking
                                        interactions </Typography>
                                </Stack>
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
        </>
    )
}
