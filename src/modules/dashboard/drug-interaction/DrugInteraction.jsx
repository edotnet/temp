import {Box} from "@mui/material";
import {useDrop} from "react-dnd";
import {memo, useEffect} from "react";
import {useApiCall} from "../../../infrastructure/hooks/useApiCall";
import {useDashboardContext} from "../context/useDashboarContext";
import {PredictiveWorld} from "../predictive-world/PredictiveWorld";
import {Endpoints} from "../../../config/Consts";
import { InteractingDrugsTable } from "../InteractingDrugsTable";

const url = Endpoints.ml.drugInteraction;

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
