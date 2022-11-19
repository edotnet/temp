import { createContext, useReducer } from "react";

const initialState = {
  targets: [],
  drugs: [],
  naturalProducts: [],
  selectedTarget: null,
  selectedDrug: null,
  targetSelection: [],
  drugSelection: [],
  naturalProductSelection: [],
}

const EngineContext = createContext({state: initialState});

const reducer = (state, action) => {
  const actions = {
    setTargets: (targets) => ({...state, targets}),
    setDrugs: (drugs) => ({...state, drugs}),
    setNaturalProducts: (naturalProducts) => ({...state, naturalProducts}),
    setSelectedTarget: (selectedTarget) => ({...state, selectedTarget}),
    setSelectedDrug: (selectedDrug) => ({...state, selectedDrug}),
    setTargetSelection: (targetSelection) => ({...state, targetSelection}),
    setDrugSelection: (drugSelection) => ({...state, drugSelection}),
    setNaturalProductSelection: (naturalProductSelection) => ({...state, naturalProductSelection}),
    clean: () => initialState,
    restore: (state) => state,
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
