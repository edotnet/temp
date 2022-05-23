import { Box, Paper } from "@mui/material";
import { Close } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useDashboardContext } from "../context/useDashboarContext";
import { DrugInteractionContent } from "../drug-interaction/DrugInteractionContent";
import { DTI } from "../DTI";
import { Hr } from "../../../infrastructure/components/Hr.component";
import { DrugInteractionContentFirst } from "../drug-interaction/DrugInteractionContentFirst";

export const PresentationModal = () => {
  const {state, dispatch} = useDashboardContext();
  const isDTI = state.protein && state.molecules.length;
  const isDIFirstMolecule = state.interactingMolecules.length === 1;
  const isDI = state.interactingMolecules.length === 2;
  if (!isDI && ! isDIFirstMolecule && ! isDTI) {
    return null;
  }

  const close = () => {
    dispatch({type: 'resetInteractingMolecules'})
  }

  return (
    <Paper sx={{position: 'absolute', width: 500, top: 0, right: 0, height: '100vh'}} elevation={0}>
      <IconButton sx={{position: "absolute", top: 0, right: 0}} size="large" onClick={close}>
        <Close/>
      </IconButton>
      <Box p={4} pt={6}>
        <DrugInteractionContentFirst/>
        <DrugInteractionContent/>
        {(isDIFirstMolecule || isDI) && isDTI && <Hr block/>}
        <DTI/>
      </Box>
    </Paper>
  )
}
