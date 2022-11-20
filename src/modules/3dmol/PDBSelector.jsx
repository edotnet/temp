import {Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDashboardContext} from '../dashboard/context/useDashboarContext';
import {dockingFetcher} from '../dashboard/DockingFetcher';
import {api} from "../../infrastructure/api/instance";
import {ALPHA_FOLD_PDB, Endpoints, ESM_FOLD_PDB} from '../../config/Consts';

export const PDBSelector = ({}) => {
  const {state, dispatch} = useDashboardContext();
  const [pdb, setPdb] = useState(null);
  const [open, setOpen] = useState(false);
  const [alphafoldLoading, setAlphafoldLoading] = useState(false);

  const setESMFold = () => {
    if (state.organism.sequence.length > 400) {
      alert('Sequence too long for ESMFold');
      return;
    }
    dispatch({type: 'selectPdb', payload: ESM_FOLD_PDB});
    if (!state.esmfold) {
      loadESMFold();
      return;
    }
    if (state.molecules.length > 0) {
      state.molecules.forEach(molecule => {
        dockingFetcher(null, molecule, dispatch, state.esmfold?.pdbPath, ESM_FOLD_PDB);
      });
    }
  }

  const loadESMFold = () => {
    if (state.organism.sequence.length > 400) {
      return;
    }
    api.post(Endpoints.proteins.ESMFold, {sequence: state.organism.sequence}).then((res) => {
      dispatch({type: 'setEsmfold', payload: res.data});
    });
  }

  const setAlphaFold = () => {
    setAlphafoldLoading(true);
    dispatch({type: 'selectPdb', payload: ALPHA_FOLD_PDB});
    api.post(Endpoints.proteins.AlphaFold, {sequence: state.organism.sequence, name: state.protein.name}).then((res) => {
      let status = 'loading';
      if (res.data.url) {
        setAlphafoldLoading(false);
        status = 'success';
      }
      dispatch({type: 'setAlphafold', payload: {...res.data, status}});
    });
  }

  const handleChange = (e) => {
    if (e.target.value === ESM_FOLD_PDB) {
      setESMFold();
      return;
    }
    if (e.target.value === ALPHA_FOLD_PDB) {
      setAlphaFold();
      return;
    }
    dispatch({type: 'selectPdb', payload: e.target.value});
    if (state.molecules.length > 0) {
      state.molecules.forEach(molecule => {
        dockingFetcher(e.target.value, molecule, dispatch, state.esmfold?.pdbPath, e.target.value);
      });
    }
  };

  /* Preselect first, disabled for now
  useEffect(() => {
    if (!state.organism.pdbs.length) return;
    setTimeout(() => {
      handleChange({target: {value: state.organism.pdbs[0].id}});
    }, 100);
  }, [state.organism.pdbs]);*/

  useEffect(() => {
    if (!!state.organism && !!state.organism.sequence && state.organism.sequence.length <= 400) {
      loadESMFold();
    }
  }, [state.organism.sequence]);

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
        {'bitscore' in pdb ?(<><Typography fontSize={12}>{`${pdb.title}`}</Typography>
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
          style={{width: 200, height: 200}} /></>):
          (<>
            {pdb.id === ESM_FOLD_PDB && <>
              <Typography fontSize={16}>ESMF</Typography>
              <Typography fontSize={14}>Fast (aprox 1 sec)</Typography>
              <Typography fontSize={14}>Poor accuracy</Typography>
              <Typography fontSize={14}>Size up to 400</Typography>
              </>}
            {pdb.id === ALPHA_FOLD_PDB && <>
              <Typography fontSize={16}>AlphaFold</Typography>
              <Typography fontSize={14}>Slow (20min to 1h)</Typography>
              <Typography fontSize={14}>High accuracy</Typography>
              <Typography fontSize={14}>Work regardless of the size</Typography>
              </>}
          </>)}
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
          {state.organism.pdbs.sort((a,b) => b.pident - a.pident).map(pdb => (
            <MenuItem value={pdb.id} onMouseOver={() => setPdb(pdb)} onMouseOut={() => setPdb(null)} key={pdb.id}>
              {pdb.id}
            </MenuItem>
          ))}
          {!!state.organism && !!state.organism.sequence && state.organism.sequence.length <= 400 && <MenuItem value={ESM_FOLD_PDB} key={ESM_FOLD_PDB} onMouseOver={() => setPdb({id: ESM_FOLD_PDB})} onMouseOut={() => setPdb(null)}>
            {!state.esmfold && '(+)'} ESMFold
          </MenuItem>}
          <MenuItem value={ALPHA_FOLD_PDB} key={ALPHA_FOLD_PDB} onMouseOver={() => setPdb({id: ALPHA_FOLD_PDB})} onMouseOut={() => setPdb(null)} >
            {alphafoldLoading ? <CircularProgress style={{height: 15, width: 15, marginRight: 10}}/> : '(+)'} AlphaFold
          </MenuItem>
        </Select>
      </FormControl>
      {renderBox()}
    </div>
  );
};
