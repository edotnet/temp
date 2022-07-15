import { DrugSynthesis } from "../search/DrugSynthesis";
import { useState } from "react";
import { useDashboardContext } from "../../dashboard/context/useDashboarContext";
import { MenuItem, TextField } from "@mui/material";

export const Drug2XDLFeature = () => {
  const [molecule, setMolecule] = useState('');
  const {state} = useDashboardContext();
  return (
    <>
      <DrugSynthesis searchText={molecule} filter={<TextField
        select
        sx={{"width": "200px", "background": "#fff", "maxWidth": "200px"}}
        value={molecule}
        onChange={e => setMolecule(e.target.value)}
        label="Select a drug" >
        {state.molecules.map(interactingMolecule => (
          <MenuItem key={interactingMolecule.name} value={interactingMolecule.name}>
            {interactingMolecule.name}
          </MenuItem>
        ))}
      </TextField>}/>
    </>
  )
}
