import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { useDashboardContext } from "../dashboard/context/useDashboarContext";

export const PDBSelector = ({options}) => {
  const {state, dispatch} = useDashboardContext()
  const handleChange = (e) => {
    dispatch({type: 'selectPdb', payload: e.target.value});
  }
  return (
    <FormControl fullWidth variant="standard">
      <InputLabel id="pdb-label">SELECT PDB ID</InputLabel>
      <Select
        labelId="pdb-labelId"
        value={state.pdbid}
        onChange={handleChange}
      >
        <MenuItem value={""}>
          <em>None</em>
        </MenuItem>
        {options.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
      </Select>
    </FormControl>
  )
}
