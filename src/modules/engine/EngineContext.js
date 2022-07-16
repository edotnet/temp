import { createContext, useReducer } from "react";

const initialState = {
  targets: [],
  drugs: [],
  selectedTarget: null,
  selectedDrug: null,
  targetSelection: [],
  drugSelection: [],
}

const EngineContext = createContext({state: initialState});

const reducer = (state, action) => {
  const actions = {
    setTargets: (targets) => ({...state, targets}),
    setDrugs: (drugs) => ({...state, drugs}),
    setSelectedTarget: (selectedTarget) => ({...state, selectedTarget}),
    setSelectedDrug: (selectedDrug) => ({...state, selectedDrug}),
    setTargetSelection: (targetSelection) => ({...state, targetSelection}),
    setDrugSelection: (drugSelection) => ({...state, drugSelection}),
  };
  if (!(action.type in actions)) {
    return state;
  }
  return actions[action.type](action.payload);
}

const EngineContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {state, dispatch};
  return <EngineContext.Provider value={value}>{children}</EngineContext.Provider>;
}

export { EngineContext, EngineContextProvider };
