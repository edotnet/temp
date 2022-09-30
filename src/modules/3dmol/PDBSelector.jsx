import React from 'react';
import { styled } from '@mui/material/styles';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useDashboardContext} from "../dashboard/context/useDashboarContext";
import {dockingFetcher} from "../dashboard/DockingFetcher";

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

export const PDBSelector = ({pdbs}) => {
  const {state, dispatch} = useDashboardContext()
  const handleChange = (e) => {
    dispatch({type: 'selectPdb', payload: e.target.value});
    if (state.molecules.length > 0) {
      dispatch({type: 'incrementDocking', payload: state.molecules.length})
      state.molecules.forEach(molecule => {
        dockingFetcher(e.target.value, molecule, dispatch);
      })
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
        {pdbs.map(pdb => (
          <StyledTooltip key={pdb.id} placement="right" title={
            <React.Fragment>
              {pdb.title && <><b>{`${pdb.title}`}</b><br/></>}
              {!!pdb.description ? <u>{`${pdb.description}`}</u> : null}
              {pdb.score && <><br/><b>Score:</b> {`${parseFloat(pdb.score).toFixed(3)}`}</>}
            </React.Fragment>
          }>
            <MenuItem value={pdb.id}>{pdb.id}</MenuItem>
          </StyledTooltip>
        ))}
      </Select>
    </FormControl>
  )
}
