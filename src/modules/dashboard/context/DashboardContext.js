import { createContext, useReducer } from "react";

const initialState = {
  molecules: [],
  selectedMolecule: null,
  interactingMolecules: [],
  interactingMoleculesResult: null,
  protein: null,
  category: null,
};

const DashboardContext = createContext({state: initialState});

const reducer = (state, action) => {
  const actions = {
    addMolecule: (molecule) => {
      if (state.molecules.map(mol => mol.drugbank_id).includes(molecule.drugbank_id)) {
        return state;
      }
      //TODO limit backend!
      if (state.molecules.length === 4) {
        return state;
      }
      return {
        ...state,
        molecules: [...state.molecules, molecule]
      };
    },
    removeMolecule: (molecule) => ({
      ...state,
      molecules: state.molecules.filter(mol => mol.drugbank_id !== molecule.drugbank_id)
    }),
    setCategory: (category) => ({
      ...state,
      category,
    }),
    selectMolecule: (molecule) => {
      return {
        ...state,
        selectMolecule: molecule,
      }
    },
    addInteractingMolecule: (molecule) => (
      state.interactingMolecules.length === 2 ||
        state.interactingMolecules.map(mol => mol.drugbank_id === molecule.drugbank_id) ?
        {...state} :
        {
          ...state,
          interactingMolecules: [...state.interactingMolecules, molecule],
        }
    ),
    resetInteractingMolecules: () => ({
      ...state,
      interactingMolecules: [],
      interactingMoleculesResult: null,
    }),
    setInteractingMoleculesResult: (interactingMoleculesResult) => ({
      ...state,
      interactingMoleculesResult,
    }),
    addProtein: (protein) => ({
      ...state,
      protein,
    }),
    removeProtein: () => ({
      ...state,
      protein: null
    })
  }
  return actions[action.type](action.payload);
}

const DashboardContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export {DashboardContext, DashboardContextProvider};
