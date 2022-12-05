import { MenuItem, TextField } from "@mui/material";
import {useEffect, useState} from 'react';
import { useDashboardContext } from "../../dashboard/context/useDashboarContext";
import { DrugSynthesis } from "../search/DrugSynthesis";
import {PrintTabletFeature} from "../drug-synthesis/PrintTablet.feature";

export const Drug2XDLFeature = () => {
  const [molecule, setMolecule] = useState('');
  const {state} = useDashboardContext();
  const combonames = state.interactingMolecules.map((molecule) => molecule.name).join(" + ");
  useEffect(() => {
   setMolecule(combonames)
  }, [combonames]);

  return (
    <>
      <DrugSynthesis searchText={molecule} filter={<TextField
        select
        sx={{"width": "200px", "background": "#fff", "maxWidth": "200px"}}
        value={molecule}
        onChange={e => setMolecule(e.target.value)}
        label="Select a drug" >
        {state.interactingMolecules.map(interactingMolecule => (
          <MenuItem key={interactingMolecule.name} value={interactingMolecule.name}>
            {interactingMolecule.name}
          </MenuItem>
        ))}
          <MenuItem value={combonames}>
            {combonames}
          </MenuItem>
      </TextField>}>
        <PrintTabletFeature drugName={molecule}/>
      </DrugSynthesis>
    </>
  )
}
