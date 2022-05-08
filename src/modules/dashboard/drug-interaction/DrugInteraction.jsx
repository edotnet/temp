import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import { memo, useEffect } from "react";
import { useApiCall } from "../../../infrastructure/hooks/useApiCall";
import { MoleculeCanvas } from "../molecule/Canvas";
import BlobCircle from "../../../assets/svg/blob-circle.svg";
import { DrugInteractionContent } from "./DrugInteractionContent";
import { useDashboardContext } from "../context/useDashboarContext";
import { Canvas } from "@react-three/fiber";
import { PredictiveWorld } from "../predictive-world/PredictiveWorld";

const url = `drug-interaction`;

export const DrugInteraction = memo(({onNewItems}) => {
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  const {state, dispatch} = useDashboardContext()
  const dragHandler = (item) => {
    dispatch({type: 'addInteractingMolecule', payload: item})
  }
  const [{isOver}, drop] = useDrop({
    accept: 'MoleculeCard',
    drop: dragHandler,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    })
  })

  useEffect(() => {
    if (state.interactingMolecules.length === 2 && !state.interactingMoleculesResult) {
      try {
        const smile1 = state.interactingMolecules[0].calculated_properties.SMILES;
        const smile2 = state.interactingMolecules[1].calculated_properties.SMILES;
        fetch(url, 'POST', {smile1, smile2})
      } catch (e) {
        console.log('Wrong smiles')
      }
    }
  }, [state.interactingMolecules])

  useEffect(() => {
    if (!data) {
      return;
    }
    const maxValue = Math.max.apply(Math, data.map(el => el.value));
    setTimeout(() => {
      dispatch({type: 'setInteractingMoleculesResult', payload: data.find(res => res.value === maxValue)});
    }, 2000)
  }, [data])


  const calculateSpeed = () => {
    if (!state.interactingMolecules.length) {
      return 0.04;
    }
    if (state.interactingMolecules.length === 1) {
      return 0.1;
    }
    if (state.interactingMolecules.length === 2) {
      if (!state.interactingMoleculesResult) {
        return 0.4;
      }
    }
  }

  return (
    <Box pt={3} ref={drop} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Box sx={{
        width: 500,
        height: 500,
        flexGrow: 1,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative'
      }} id="blob-circle">
        <PredictiveWorld />
      </Box>
      <DrugInteractionContent/>
    </Box>
  );
})
