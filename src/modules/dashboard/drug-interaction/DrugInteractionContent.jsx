import { ModalPaper } from "../../../infrastructure/components/ModalPaper";
import { Avatar, Box, Typography } from "@mui/material";
import { CustomChip } from "../../../infrastructure/components/CustomChip";
import { Hr } from "../../../infrastructure/components/Hr.component";
import * as PropTypes from "prop-types";
import { useDashboardContext } from "../context/useDashboarContext";
import IconButton from "@mui/material/IconButton";
import { CancelOutlined } from "@mui/icons-material";

export const DrugInteractionContent = () => {
  const {state, dispatch} = useDashboardContext();
  if (!state.interactingMoleculesResult) {
    return null;
  }
  const [drug1, drug2] = state.interactingMolecules;
  const close = () => {
    dispatch({type: 'resetInteractingMolecules'})
  }
  return (
    <ModalPaper sx={{px: 8, py: 5, mt: 3, position: "absolute", maxWidth: 550}} elevation={8}>
      <IconButton sx={{position: "absolute", top:0, right:0}} size="large" onClick={close}>
        <CancelOutlined />
      </IconButton>
      <Typography sx={{fontSize: 40, fontWeight: 100}}>Drug interactions</Typography>
      <Box sx={{display: "flex"}}>
        <Avatar sx={{bgcolor: "#d0eed2", width: 100, height: 100}}>
          <Typography sx={{fontSize: 40, fontWeight: 300, color: "#1d1d1d"}}>{state.interactingMoleculesResult.value}%</Typography>
        </Avatar>
        <Box sx={{pl: 2, pt: 1}}>
          <Typography sx={{fontSize: 18, fontWeight: 500}} gutterBottom>Drug Interaction molecules</Typography>
          <Box sx={{display: "flex", justifyContent: "space-around"}}>
            <CustomChip label={drug1.name}/>
            <CustomChip label={drug2.name} sx={{marginLeft: 1}}/>
          </Box>
        </Box>
      </Box>
      <Hr/>
      <Typography sx={{fontSize: 18, fontWeight: 500, color: "#1d1d1d"}}>RESULT DESCRIPTION</Typography>
      <Typography sx={{fontSize: 24, fontWeight: 300}}>
        {state.interactingMoleculesResult.label
          .replace("#Drug1", drug1.name)
          .replace("#Drug2", drug2.name)}
      </Typography>
    </ModalPaper>
  );
}

DrugInteractionContent.propTypes = {
  maxValue: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.any),
  data: PropTypes.any,
  prop3: PropTypes.func
};
