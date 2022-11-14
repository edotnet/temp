import {Box, FormControl, InputLabel, MenuItem, Select, Stack, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDashboardContext} from '../dashboard/context/useDashboarContext';
import {dockingFetcher} from '../dashboard/DockingFetcher';
import {api} from "../../infrastructure/api/instance";
import {Endpoints, ESM_FOLD_PDB} from "../../config/Consts";

export const PDBSelector = ({organism}) => {
  const {state, dispatch} = useDashboardContext();
  const [pdb, setPdb] = useState(null);
  const [open, setOpen] = useState(false);

  const setESMFold = () => {
    if (organism.sequence.length > 400) {
      alert('Sequence too long for ESMFold');
      return;
    }
    dispatch({type: 'selectPdb', payload: ESM_FOLD_PDB});
    dispatch({type: 'addCustomPdb', payload: {drug: ESM_FOLD_PDB}});
    api.post(Endpoints.proteins.ESMFold, {sequence: organism.sequence}).then((res) => {
      dispatch({type: 'addCustomPdbResponse', payload: {drug: ESM_FOLD_PDB, data: res.data, status: 'success'}});
    });
  }

  const handleChange = (e) => {
    if (e.target.value === ESM_FOLD_PDB) {
      setESMFold();
      return;
    }
    dispatch({type: 'selectPdb', payload: e.target.value});
    if (state.molecules.length > 0) {
      state.molecules.forEach(molecule => {
        dockingFetcher(e.target.value, molecule, dispatch);
      });
    }
  };

  useEffect(() => {
    if (!organism.pdbs.length) return;
    setTimeout(() => {
      handleChange({target: {value: organism.pdbs[0].id}});
    }, 100);
  }, [organism.pdbs]);

  function renderBox() {
    if (pdb === null || !open) {
      return;
    }
    const score = parseFloat(pdb.bitscore).toFixed(0);
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
          <Typography fontSize={10} fontWeight="bold">Identity: </Typography>
          <Typography fontSize={14} color={color}>{pdb.pident}%</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography fontSize={10} fontWeight="bold">Bit score: </Typography>
          <Typography fontSize={14} color={color}>{score}</Typography>
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
          {organism.pdbs.sort((a,b) => b.pident - a.pident).map(pdb => (
            <MenuItem value={pdb.id} onMouseOver={() => setPdb(pdb)} onMouseOut={() => setPdb(null)} key={pdb.id}>
              {pdb.id}
            </MenuItem>
          ))}
          {!!organism && !!organism.sequence && organism.sequence.length <= 400 && <MenuItem value={ESM_FOLD_PDB} key={ESM_FOLD_PDB} onMouseOver={() => setPdb(null)}>
            (+) ESMFold
          </MenuItem>}
        </Select>
      </FormControl>
      {renderBox()}
    </div>
  );
};
