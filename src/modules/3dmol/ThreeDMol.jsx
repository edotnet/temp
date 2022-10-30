import $3Dmol from '3dmol';
import {ExpandMore} from '@mui/icons-material';
import {Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, MenuItem, TextField} from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {useCallback, useEffect, useRef, useState} from 'react';
import D3 from '../../assets/svg/3d.svg';
import {useDashboardContext} from '../dashboard/context/useDashboarContext';

export const ThreeDMol = () => {
  const ref = useRef();
  const viewerRef = useRef();
  const {state} = useDashboardContext()
  const [selectedCustomPdb, setSelectedCustomPdb] = useState("");

  const removeCanvas = () => {
    const element = document.getElementById('gldiv').getElementsByTagName('canvas');
    if(element.length > 0) {
      document.getElementById('gldiv').firstElementChild.remove();
    }
  }

  const createViewer = () => {
    viewerRef.current = $3Dmol.createViewer(
      'gldiv', //id of div to create canvas in
      {
        backgroundColor: '#f5f6fc'
      }
    );
  }

  const renderPdb = useCallback(() => {
    if (selectedCustomPdb !== "") {
      return;
    }
    removeCanvas()
    createViewer()
    viewerRef.current.clear();
    $3Dmol.download(`pdb:${state.pdbid}`, viewerRef.current, {format: 'pdb', colorschema: 'spectral'}, () => {
      viewerRef.current.setStyle({cartoon:{color:'spectrum'}});
      viewerRef.current.zoomTo();
      viewerRef.current.render();
    })
  }, [state.pdbid, selectedCustomPdb])

  const renderCustomPdb = useCallback(() => {
    removeCanvas()
    createViewer()
    viewerRef.current.clear();
    fetch(state.customPdbs[selectedCustomPdb].url)
      .then(res => {
        return res.text();
      }).then(pdb => {
      viewerRef.current.addModel(pdb, 'pdb');
      viewerRef.current.setStyle({cartoon:{color:'spectrum'}});
      viewerRef.current.setStyle({resn: 'UNK'},{sphere:{radius:0.5}, stick:{}});
      viewerRef.current.zoomTo({resn: 'UNK'});
      viewerRef.current.render();
    }).catch(err => {
      console.log(err)
    })
  }, [selectedCustomPdb])

  useEffect(() => {
    if (state.pdbid) {
      renderPdb();
    }
  }, [renderPdb, state.pdbid])

  useEffect(() => {
    if (selectedCustomPdb) {
      if (selectedCustomPdb === state.pdbid) {
        renderPdb();
        return;
      }
      renderCustomPdb();
    }
  }, [renderCustomPdb, renderPdb, selectedCustomPdb, state.pdbid])


  return (
    <>
      { state.pdbid && <Accordion sx={{mt:2, backgroundColor: '#f5f6fc'}} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Stack direction="row">
            <img src={D3} style={{width: 50, height: 50}} alt="3D"/>
            <Stack justifyContent="center" pl={2}>
              <Typography fontWeight="bold">3D View</Typography>
            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{mt: -4}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', pb: 1}}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                {state.docking > 0 &&
                  <>
                    <CircularProgress style={{width: 30, height: 30}}/>&nbsp;
                    <Typography variant="body2" fontWeight="bold">Docking...</Typography>
                  </>
                }
              </Box>
              <TextField select value={selectedCustomPdb} label="Select drug" onChange={(e) => setSelectedCustomPdb(e.target.value)} sx={{minWidth: 150}}>
                <MenuItem value="">None</MenuItem>
                {Object.entries(state.customPdbs).map(([key, value]) => (
                  <MenuItem key={key} value={key} disabled={value.status !== 'success'} sx={{color: value.status === 'error' ? 'red' : 'inherit'}}>
                    {key} {value.status==='loading'? <CircularProgress  size={15} sx={{ml: 1}}/> :''}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <div ref={ref} id="gldiv" style={{height: 300, width: 400, position: 'relative'}}
                className="viewer_3Dmoljs"
                data-backgroundcolor="#f5f6fc"
                data-pdb="2nbd"
                data-style="cartoon"/>
            {!!selectedCustomPdb && <Typography align="right" mt={2}>Affinity: {parseFloat(state.customPdbs[selectedCustomPdb].affinity).toFixed(3)} kcal/mol</Typography>}
          </Box>
        </AccordionDetails>
      </Accordion>}
    </>
  )
}
