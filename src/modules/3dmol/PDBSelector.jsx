import {Box, FormControl, InputLabel, MenuItem, Select, Stack, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDashboardContext} from '../dashboard/context/useDashboarContext';
import {dockingFetcher} from '../dashboard/DockingFetcher';

export const PDBSelector = ({pdbs}) => {
  const {state, dispatch} = useDashboardContext();
  const [pdb, setPdb] = useState(null);
  const [open, setOpen] = useState(false);
  const handleChange = (e) => {
    dispatch({type: 'selectPdb', payload: e.target.value});
    if (state.molecules.length > 0) {
      dispatch({type: 'incrementDocking', payload: state.molecules.length});
      state.molecules.forEach(molecule => {
        dockingFetcher(e.target.value, molecule, dispatch);
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleChange({target: {value: pdbs[0].id}});
    }, 100);
  }, [pdbs]);

  function renderBox() {
    if (pdb === null || !open) {
      return;
    }
    const score = parseFloat(pdb.score * 100).toFixed(0);
    const color = score < 50 ? 'red' : score < 75 ? 'yellow' : 'green';
    return (
      <Box sx={{
        position: 'absolute',
        zIndex: 1000000,
        width: 230,
        right: 0,
        backgroundColor: 'white',
        p: 2,
        borderRadius: 5,
      }} onMouseEnter={event => setPdb(pdb)}>
        <Typography fontSize={12}>{`${pdb.title}`}</Typography>
        {!!pdb.description ? <Typography fontSize={10}>{`${pdb.description}`}</Typography> : null}
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography fontSize={10} fontWeight="bold">Score: </Typography>
          <Typography fontSize={14} color={color}>{`${score}%`}</Typography>
        </Stack>
        <img src={`https://cdn.rcsb.org/images/structures/${pdb.id.toLowerCase()}_assembly-1.jpeg `}
             alt={pdb.id}
             style={{width: 200, height: 200}} />
      </Box>
    );
  }

  return (
    <div style={{position: 'relative'}}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="pdb-label">SELECT PDB ID</InputLabel>
        <Select
          labelId="pdb-labelId"
          value={state.pdbid}
          onChange={handleChange}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          <MenuItem value={''}>
            <em>None</em>
          </MenuItem>
          {pdbs.map(pdb => (
            <MenuItem value={pdb.id} onMouseOver={() => setPdb(pdb)} onMouseOut={() => setPdb(null)}>
              {pdb.id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {renderBox()}
    </div>
  );
};
