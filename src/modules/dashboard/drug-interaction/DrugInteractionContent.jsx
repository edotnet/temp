import { Avatar, Box, CircularProgress, LinearProgress, Typography } from "@mui/material";
import { CustomChip } from "../../../infrastructure/components/CustomChip";
import { Hr } from "../../../infrastructure/components/Hr.component";
import * as PropTypes from "prop-types";
import { useDashboardContext } from "../context/useDashboarContext";
import { CustomWidthTooltip } from "../../../infrastructure/components/CustomWidthTooltip";
import { colorful_language } from "../../../infrastructure/utils";

export const DrugInteractionContent = () => {
  const {state, dispatch} = useDashboardContext();
  if (state.interactingMolecules.length !== 2) {
    return null;
  }
  const [drug1, drug2] = state.interactingMolecules;

  const getStyles = (color) => {
    const {hue, saturation, luminosity} = color;
    const moleculeColor = `hsla(${hue},${saturation}%, ${luminosity}%, 0.25)`;
    return {
      boxShadow: `0 6px 5px 0 ${moleculeColor}`,
      border: `solid 1px ${moleculeColor}`,
    }
  }

  if (!state.interactingMoleculesResult) {
    return (
      <>
        <Typography variant="subtitle1" gutterBottom>Drug Interaction molecules</Typography>
        <Box sx={{display: "flex"}}>
          <CircularProgress style={{width: 100, height: 100}} color="primary"/>
          {renderPills()}
        </Box>
      </>
    );
  }

  function renderPills() {
    return <Box sx={{pl: 2, pt: 1}}>
      <Box sx={{display: "flex", flexDirection: 'column'}}>
        <Box pb={1}>
          <CustomWidthTooltip title={drug1.name}>
            <CustomChip label={drug1.name} style={getStyles(drug1.color)}/>
          </CustomWidthTooltip>
        </Box>
        <Box>
          <CustomWidthTooltip title={drug2.name}>
            <CustomChip label={drug2.name} style={getStyles(drug2.color)}/>
          </CustomWidthTooltip>
        </Box>
      </Box>
    </Box>;
  }

  function renderPercentage() {
    return <Avatar sx={{bgcolor: "#d0eed2", width: 100, height: 100}}>
      <Typography sx={{
        fontSize: 40,
        fontWeight: 300,
        color: "#1d1d1d"
      }}>{state.interactingMoleculesResult.value}%</Typography>
    </Avatar>;
  }

  return (
    <>
      <Typography variant="subtitle1" gutterBottom>Drug Interaction molecules</Typography>
      <Box sx={{display: "flex"}}>
        {renderPercentage()}
        {renderPills()}
      </Box>
      <Hr/>
      <Typography variant="subtitle1" >Result Description</Typography>
      <Typography variant="body1">
        {state.interactingMoleculesResult.label
          .replace("#Drug1", drug1.name)
          .replace("#Drug2", drug2.name)}
      </Typography>
    </>
  );
}

DrugInteractionContent.propTypes = {
  maxValue: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.any),
  data: PropTypes.any,
  prop3: PropTypes.func
};
