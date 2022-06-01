import { useDashboardContext } from "../context/useDashboarContext";
import { Avatar, Box, Chip, Select, Typography } from "@mui/material";
import { CustomWidthTooltip } from "../../../infrastructure/components/CustomWidthTooltip";
import { CustomChip } from "../../../infrastructure/components/CustomChip";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import './DrugInteraction.scss';

const PillSelect = styled(Select)({
  'fieldset': {
    border: '1px dashed #ccc',
    borderRadius: 50,
  },
})

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
  const handleChange = (e) => {
    const molecule =  state.molecules.find(molecule => molecule.drugbank_id === e.target.value);
    dispatch({type: 'addInteractingMolecule', payload: molecule});
  };

  return (
    <>
      <Typography variant="subtitle1" sx={{fontSize: 18, fontWeight: 500}} gutterBottom>Drug Interaction molecules</Typography>
      <Box sx={{display: "flex"}}>
        {/* <Avatar sx={{bgcolor: "transparent", width: 100, height: 100, border: '1px dashed #806ca2'}}>
          <Typography sx={{
            fontSize: 40,
            fontWeight: 300,
            color: "#806ca2"
          }}>+</Typography>
        </Avatar> */}
        <Box pt={1}>
          <Box sx={{display: "flex"}}>
            <Box pb={1}>
              <CustomWidthTooltip title={drug1.name}>
                <CustomChip label={drug1.name} style={getStyles(drug1.color)}/>
              </CustomWidthTooltip>
            </Box>
            <Box ml={2}>
              {/*<CustomWidthTooltip title={"+ 2nd molecule"} onClick={() => setOpen(true)}>
                <CustomChip variant="outlined" label={"+ 2nd molecule"} style={{background: 'transparent', border: '1px dashed #806ca2'}}/>
              </CustomWidthTooltip>*/}
              <PillSelect className='moleculeDropdown' onChange={handleChange} value={0}>
                <MenuItem value={0}>+ 2nd molecule</MenuItem>
                {state.molecules.filter(molecule => molecule.drugbank_id !== drug1.drugbank_id).map(molecule => (
                  <MenuItem key={molecule.drugbank_id} value={molecule.drugbank_id}>{molecule.name}</MenuItem>
                ))}
              </PillSelect>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
