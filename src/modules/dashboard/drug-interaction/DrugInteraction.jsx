import {Box} from "@mui/material";
import {useDrop} from "react-dnd";
import {memo, useEffect} from "react";
import {useApiCall} from "../../../infrastructure/hooks/useApiCall";
import {useDashboardContext} from "../context/useDashboarContext";
import {PredictiveWorld} from "../predictive-world/PredictiveWorld";
import {Endpoints} from "../../../config/Consts";
import {InteractingDrugsTable} from "../InteractingDrugsTable";
import axios from 'axios';

const url = Endpoints.ml.drugInteraction;

export const DrugInteraction = memo(({onNewItems}) => {
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  const {state, dispatch} = useDashboardContext()
  const dragHandler = (item) => {
    switch (item.type) {
      case 'DemographicItem':
        dispatch({type: 'selectDemographics', payload: item.value});
        break;
      case 'MoleculeCard':
        dispatch({type: 'addInteractingMolecule', payload: item.value});
        break;
      default:
        console.warn(`Unknown item type: ${item.type}`);
        break;
    }
  }
  const [{isOver}, drop] = useDrop({
    accept: ['MoleculeCard', 'DemographicItem'],
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
        console.log('[DRUG-INTERACTION] Wrong smiles')
      }
    }
  }, [state.interactingMolecules])

  useEffect(() => {
    if (!data || (data && 'code' in data && data.code !== 200)) {
      console.log('[DRUG-INTERACTION] Response code is wrong')
      return;
    }
    try {
      const result = 'result' in data ? data.result : data;
      const therapeuticEffect = {
        label: result[8].label,
        value: result[8].value * 100
      }
      setTimeout(() => {
        dispatch({type: 'setInteractingMoleculesResult', payload: therapeuticEffect});
      }, 2000)
    } catch (e) {
      console.warn(e)
    }
  }, [data])

  useEffect(() => {
    if ((state.selectedDemographics && state.demographicsResult
        && (!Object.keys(state.demographicsResult).includes(state.selectedDemographics.id) || !state.demographicsResult[state.selectedDemographics.id]))
    || (state.selectedDemographics && !state.demographicsResult)) {
      try {
        const yearLabels = ["0-15 years (pediatrics)", "16-24 years (youths)", "25-64 years (adults)", "65+ years"];
        const yearValues = [7.5, 20, 39, 70];
        const bmiLabels = ["Below 18.5", "18.5-24.9", "25-29.9", "30-34.9", "35-39.9", "Above 40"];
        const bmiValues = [18.5, 22.5, 27.5, 32.5, 37.5, 40];
        const demographicsRequest = {
          ...state.selectedDemographics,
          age: yearValues[yearLabels.findIndex(age => age === state.selectedDemographics.age)],
          bmi: bmiValues[bmiLabels.findIndex(bmi => bmi === state.selectedDemographics.bmi)],
          drugs: state.interactingMolecules.map(molecule => molecule.name.toLowerCase())
        }
        axios.post(Endpoints.drugbank.calculateMaintenanceDosage, demographicsRequest).then((res) => {
          dispatch({
            type: 'demographicsResult',
            payload: {[state.selectedDemographics.id]: res.data}
          });
        })
      } catch (e) {
        console.warn(e);
      }
    }
  }, [state.selectedDemographics])


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
        <PredictiveWorld/>
        <InteractingDrugsTable interactingMolecules={state.interactingMolecules}/>
      </Box>
    </Box>
  );
})
