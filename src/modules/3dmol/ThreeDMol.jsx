import { memo, useEffect, useRef, useState } from 'react';
import { useDashboardContext } from "../dashboard/context/useDashboarContext";
import $ from 'jquery';
import $3Dmol from '3dmol';
import { useProtein } from "./useProtein";
import { ModalPaper } from "../../infrastructure/components/ModalPaper";
import { Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export const ThreeDMol = () => {
  const ref = useRef();
  const {state} = useDashboardContext()
  const [isOpen, open] = useState(true);
  useEffect(() => {
    if (state.protein) {
      const pdb = state.protein.pdb_ids[0]
      const viewer = $3Dmol.viewers[0];
      viewer.clear();
      $3Dmol.download(`pdb:${pdb}`, viewer,{format: 'pdb', colorschema: 'spectral'}, () => {
        viewer.zoomTo();
        viewer.render();
        open(true)
      })
    }
  }, [state.protein])

  const close = () => {
    open(false);
  }

  return (
    <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: isOpen ? 'block' : 'none'}}>
      <ModalPaper>
        <IconButton sx={{position: "absolute", top: 0, right: 0, zIndex: 10}} size="large" onClick={close}>
          <Close/>
        </IconButton>
        <div style={{height: '400px', width: '400px', position: 'relative'}}
             className="viewer_3Dmoljs"
             data-backgroundcolor="#f5f6fb"
             data-pdb="2nbd"
             data-style="stick"/>
      </ModalPaper>
    </Box>
  )
}
