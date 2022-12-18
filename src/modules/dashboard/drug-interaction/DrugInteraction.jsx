import {Box} from "@mui/material";
import {useDrop} from "react-dnd";
import {memo, useEffect} from "react";
import {useApiCall} from "../../../infrastructure/hooks/useApiCall";
import {useDashboardContext} from "../context/useDashboarContext";
import {PredictiveWorld} from "../predictive-world/PredictiveWorld";
import {DemographicYears, Endpoints} from "../../../config/Consts";
import {InteractingDrugsTable} from "../InteractingDrugsTable";
import {api} from "../../../infrastructure/api/instance";
import {DTITable} from "../../dti/DTITable";

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
    if (state.interactingMolecules.length >= 2) {
      try {
        fetch(url, 'POST', {
          compounds: state.interactingMolecules.map(m => ({
            name: m.name,
            smiles: m.calculated_properties.SMILES
          }))
        }).then(r => {
          dispatch({type: 'setInteractingMoleculesResult', payload: r.data});
        });
      } catch (e) {
        console.log('[DRUG-INTERACTION] Wrong smiles')
      }
    }
  }, [state.interactingMolecules])


  useEffect(() => {
    if ((state.selectedDemographics && state.demographicsResult
        && (!Object.keys(state.demographicsResult).includes(state.selectedDemographics.id) || !state.demographicsResult[state.selectedDemographics.id]))
      || (state.selectedDemographics && !state.demographicsResult)) {
      try {
        const yearLabels = DemographicYears;
        const yearValues = [7.5, 20, 39, 70];
        /*const bmiLabels = DemographicBmi;
        const bmiValues = [18.5, 22.5, 27.5, 32.5, 37.5, 40];*/
        const demographicsRequest = {
          ...state.selectedDemographics,
          age: yearValues[yearLabels.findIndex(age => age === state.selectedDemographics.age)],
          //bmi: bmiValues[bmiLabels.findIndex(bmi => bmi === state.selectedDemographics.bmi)],
          drugs: state.interactingMolecules.map(molecule => molecule.name.toLowerCase())
        }
        api.post(Endpoints.drugbank.calculateMaintenanceDosage, demographicsRequest).then((res) => {
          dispatch({
            type: 'demographicsResult',
            payload: {[state.selectedDemographics.id]: res.data}
          });
        })
      } catch (e) {
        console.warn(e);
      }
    }
  }, [state.selectedDemographics, state.interactingMolecules])


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
        position: 'relative',
        pt: 2
      }} id="blob-circle">
        <PredictiveWorld/>
        <Box pt={1}>
          {/*<InteractingDrugsTable interactingMolecules={state.interactingMolecules}/>*/}
        </Box>
      </Box>
      <Box pt={4}>
        <DTITable />

      </Box>
    </Box>
  );
})
