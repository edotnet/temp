import { Box, Paper } from "@mui/material";
import { Close } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useDashboardContext } from "../context/useDashboarContext";
import { DrugInteractionContent } from "../drug-interaction/DrugInteractionContent";
import { DTI } from "../DTI";
import { Hr } from "../../../infrastructure/components/Hr.component";
import { DrugInteractionContentFirst } from "../drug-interaction/DrugInteractionContentFirst";
import './PresentationModal.scss'
import {ThreeDMolFeature} from "../ThreeDMolFeature";

export const PresentationModal = () => {
  const {state, dispatch} = useDashboardContext();
  const isDTI = state.organism && state.molecules.length;
  const isDIFirstMolecule = state.interactingMolecules.length === 1;
  const isDI = state.interactingMolecules.length === 2;
  const isPdb = state.pdbid && state.pdbid !== "";
  if (!isDI && ! isDIFirstMolecule && ! isDTI && ! isPdb) {
    return null;
  }

  const close = () => {
    dispatch({type: 'resetInteractingMolecules'})
  }

  return (
    <Paper className='presentationModal' elevation={0}>
      <IconButton className='iconButton' size="large" onClick={close}>
        <Close/>
      </IconButton>
      <Box p={4} pt={15}>
        <DrugInteractionContentFirst/>
        <DrugInteractionContent/>
        {(isDIFirstMolecule || isDI) && isDTI && <Hr block/>}
        <ThreeDMolFeature />
        <DTI/>
      </Box>
    </Paper>
  )
}
