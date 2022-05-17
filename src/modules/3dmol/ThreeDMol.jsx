import { useEffect, useRef } from 'react';
import { useDashboardContext } from "../dashboard/context/useDashboarContext";
import $ from 'jquery';
import $3Dmol from '3dmol';
import { useProtein } from "./useProtein";

export const ThreeDMol = () => {
  const ref = useRef();
  const {state} = useDashboardContext()
  console.log('protein', state.protein)
  useEffect(() => {
    console.log($3Dmol.viewers)
    if (state.protein) {
      const pdb = state.protein.pdb_ids[0]
      const viewer = $3Dmol.viewers[0];
      viewer.clear();
      $3Dmol.download(`pdb:${pdb}`, viewer,{format: 'pdb', colorschema: 'spectral'}, () => {
        viewer.zoomTo();
        viewer.render();
      })
    }
  }, [state.protein])

  return (
    <div style={{height: '400px', width: '400px', position: 'relative'}}
         className="viewer_3Dmoljs"
         data-backgroundcolor="#f5f6fb"
         data-style="stick"/>
  )
}
