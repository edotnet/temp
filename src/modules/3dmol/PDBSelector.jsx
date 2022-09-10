import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useDashboardContext} from "../dashboard/context/useDashboarContext";
import {dockingFetcher} from "../dashboard/DockingFetcher";

export const PDBSelector = ({options}) => {
  const {state, dispatch} = useDashboardContext()
  const handleChange = (e) => {
    dispatch({type: 'selectPdb', payload: e.target.value});
    if (state.molecules.length > 0) {
      dispatch({type: 'setDocking', payload: true})
      const promises = [];
      state.molecules.forEach(molecule => {
        promises.push(dockingFetcher(e.target.value, molecule, dispatch));
      });
      Promise.all(promises).then((values) => {
        dispatch({type: 'setDocking', payload: false})
      });
    }
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
