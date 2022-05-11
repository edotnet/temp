import { useDashboardContext } from "../context/useDashboarContext";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import { CustomWidthTooltip } from "../../../infrastructure/components/CustomWidthTooltip";
import { CustomChip } from "../../../infrastructure/components/CustomChip";

export const DrugInteractionContentFirst = () => {
  const {state, dispatch} = useDashboardContext();
  if (state.interactingMolecules.length !== 1) {
    return null;
  }
  const [drug1] = state.interactingMolecules;

  const getStyles = (color) => {
    return {
      boxShadow: `0 6px 5px 0 ${color}`,
      border: `solid 1px ${color}`,
    }
  }
  return (
    <>
      <Typography sx={{fontSize: 18, fontWeight: 500}} gutterBottom>Drug Interaction molecules</Typography>
      <Box sx={{display: "flex"}}>
        <Avatar sx={{bgcolor: "transparent", width: 100, height: 100, border: '1px dashed #806ca2'}}>
          <Typography sx={{
            fontSize: 40,
            fontWeight: 300,
            color: "#806ca2"
          }}>+</Typography>
        </Avatar>
        <Box sx={{pl: 2, pt: 1}}>
          <Box sx={{display: "flex", flexDirection: 'column'}}>
            <Box pb={1}>
              <CustomWidthTooltip title={drug1.name}>
                <CustomChip label={drug1.name} style={getStyles(drug1.color)}/>
              </CustomWidthTooltip>
            </Box>
            <Box>
              <CustomWidthTooltip title={"+ 2nd molecule"}>
                <CustomChip variant="outlined" label={"+ 2nd molecule"} style={{background: 'transparent', border: '1px dashed #806ca2'}}/>
              </CustomWidthTooltip>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
