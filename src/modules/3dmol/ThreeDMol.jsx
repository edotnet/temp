import {useEffect, useRef, useState} from 'react';
import { useDashboardContext } from "../dashboard/context/useDashboarContext";
import $3Dmol from '3dmol';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  CircularProgress,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import D3 from '../../assets/svg/3d.svg'
import {ExpandMore, RefreshOutlined} from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import {Loading} from "../../infrastructure/components/Loading";

export const ThreeDMol = () => {
  const ref = useRef();
  const {state} = useDashboardContext()
  const [selectedCustomPdb, setSelectedCustomPdb] = useState("");
  const renderPdb = () => {
    const element = document.getElementById('gldiv').getElementsByTagName('canvas');
    if(element.length > 0) {
      document.getElementById('gldiv').firstElementChild.remove();
    }
    const viewer = $3Dmol.createViewer(
      'gldiv', //id of div to create canvas in
      {
        backgroundColor: '#f5f6fc'
      }
    );
    viewer.clear();
    $3Dmol.download(`pdb:${state.pdbid}`, viewer, {format: 'pdb', colorschema: 'spectral'}, () => {
      viewer.setStyle({cartoon:{color:'spectrum'}});
      viewer.zoomTo();
      viewer.render();
    })
  }
  const renderCustomPdb = () => {
    const element = document.getElementById('gldiv').getElementsByTagName('canvas');
    if(element.length > 0) {
      document.getElementById('gldiv').firstElementChild.remove();
    }
    const viewer = $3Dmol.createViewer(
      'gldiv', //id of div to create canvas in
      {
        backgroundColor: '#f5f6fc'
      }
    );
    viewer.clear();
    fetch(selectedCustomPdb)
      .then(res => {
        return res.text();
      }).then(pdb => {
        console.log('should load')
      viewer.addModel(pdb, 'pdb');
      viewer.setStyle({cartoon:{color:'spectrum'}});
      viewer.setStyle({resn: 'UNK'},{sphere:{radius:0.5}, stick:{}});
      viewer.zoomTo({resn: 'UNK'});
      viewer.render();
    }).catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
    if (state.pdbid) {
      renderPdb();
    }
  }, [state.pdbid])

  useEffect(() => {
    if (selectedCustomPdb) {
      if (selectedCustomPdb === state.pdbid) {
        renderPdb();
        return;
      }
      renderCustomPdb();
    }
  }, [selectedCustomPdb])

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
                {state.isDocking &&
                  <>
                    <CircularProgress style={{width: 30, height: 30}}/>&nbsp;
                    <Typography variant="body2" fontWeight="bold">Docking...</Typography>
                  </>
                }
              </Box>
              <TextField select value={selectedCustomPdb} label="Select drug" onChange={(e) => setSelectedCustomPdb(e.target.value)} sx={{minWidth: 150}}>
                <MenuItem value="">None</MenuItem>
                {Object.entries(state.customPdbs).map(([key, value]) => <MenuItem key={key} value={value}>{key}</MenuItem>)}
              </TextField>
            </Box>
            <div ref={ref} id="gldiv" style={{height: 300, width: 400, position: 'relative'}}
                className="viewer_3Dmoljs"
                data-backgroundcolor="#f5f6fc"
                data-pdb="2nbd"
                data-style="cartoon"/>
          </Box>
        </AccordionDetails>
      </Accordion>}
    </>
  )
}
