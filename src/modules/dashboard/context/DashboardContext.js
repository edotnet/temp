import { createContext, useReducer } from "react";
import { colorful_language } from "../../../infrastructure/utils";

const initialState = {
  molecules: [],
  selectedMolecule: null,
  interactingMolecules: [],
  interactingMoleculesResult: null,
  protein: null,
  category: null,
};

const DashboardContext = createContext({state: initialState});

const adaptMolecule = (molecule) => {
  switch (molecule.name) {
    case 'Favipiravir':
      return {
        ...molecule,
        clinical_description: "Favipiravir is a selective inhibitor of viral RNA-dependent RNA polymerase (RdRP)" +
          "with potent antiviral activity against single-stranded RNA viruses including coronaviruses. Favipiravir" +
          "is able to target the protein necessary for the coronavirus to replicate, creating mutations that make" +
          "it impossible for the virus to copy itself"
      }
    default:
      return molecule;
  }
}
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
      molecule.color = colorful_language(molecule.name, 0.25);
      return {
        ...state,
        molecules: [...state.molecules, molecule]
      };
    },
    removeMolecule: (molecule) => ({
      ...state,
      molecules: state.molecules.filter(mol => mol.drugbank_id !== molecule.drugbank_id),
      interactingMolecules: state.interactingMolecules.filter(mol => mol.drugbank_id !== molecule.drugbank_id),
      selectedMolecule: state.selectedMolecule && state.selectedMolecule.drugbank_id === molecule.drugbank_id ? null : state.selectedMolecule,
    }),
    setCategory: (category) => ({
      ...state,
      category,
    }),
    selectMolecule: (molecule) => ({
      ...state,
      selectedMolecule: adaptMolecule(molecule),
    }),
    unselectMolecule: () => ({
      ...state,
      selectedMolecule: null,
    }),
    addInteractingMolecule: (molecule) => (
      state.interactingMolecules.length === 2 ||
      state.interactingMolecules.map(mol => mol.drugbank_id).includes(molecule.drugbank_id) ?
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
      interactingMoleculesResult: {
        ...interactingMoleculesResult,
        value: interactingMoleculesResult.value.toFixed(0)
      },
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
  const value = {state, dispatch};
  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export { DashboardContext, DashboardContextProvider };
