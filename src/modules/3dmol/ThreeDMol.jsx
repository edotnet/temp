import { useEffect, useRef } from 'react';
import { useDashboardContext } from "../dashboard/context/useDashboarContext";
import $3Dmol from '3dmol';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import D3 from '../../assets/svg/3d.svg'
import { ExpandMore } from "@mui/icons-material";
import Stack from "@mui/material/Stack";

export const ThreeDMol = () => {
  const ref = useRef();
  const {state} = useDashboardContext()
  useEffect(() => {
    if (state.pdbid) {
      const viewer = $3Dmol.createViewer(
        'gldiv', //id of div to create canvas in
        {
          backgroundColor: '#f5f6fc'
        }
      );
      viewer.clear();
      $3Dmol.download(`pdb:${state.pdbid}`, viewer, {format: 'pdb', colorschema: 'spectral'}, () => {
        console.log('rendering...')
        viewer.zoomTo();
        viewer.render();
      })
    }
  }, [state.pdbid])

  return (
    <Accordion sx={{mt:2, backgroundColor: '#f5f6fc'}} dissableGutters elevation={0}>
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
        <Box>
          <div ref={ref} id="gldiv" style={{height: 400, width: 400, position: 'relative'}}
               className="viewer_3Dmoljs"
               data-backgroundcolor="#f5f6fc"
               data-pdb="2nbd"
               data-style="stick"/>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
