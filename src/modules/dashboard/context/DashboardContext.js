import {createContext, useReducer} from 'react';
import {colorful_language} from '../../../infrastructure/utils';

const initialState = {
  molecules: [],
  selectedMolecule: null,
  interactingMolecules: [],
  interactingMoleculesLoading: false,
  interactingMoleculesResult: null,
  protein: null,
  organism: null,
  category: null,
  pdbid: '',
  demographics: [],
  selectedDemographics: null,
  demographicsResult: null,
  moleculeDocking: {},
  docking: 0,
  esmfold: null,
  alphafold: null,
  drugsProtein: {
    bestResult: null,
    result: []
  }
};

const DashboardContext = createContext({state: initialState});

const adaptMolecule = (molecule) => {
  switch (molecule.name) {
    case 'Favipiravir':
      return {
        ...molecule,
        clinical_description: 'Favipiravir is a selective inhibitor of viral RNA-dependent RNA polymerase (RdRP)' +
          'with potent antiviral activity against single-stranded RNA viruses including coronaviruses. Favipiravir' +
          'is able to target the protein necessary for the coronavirus to replicate, creating mutations that make' +
          'it impossible for the virus to copy itself',
      };
    default:
      return molecule;
  }
};
const reducer = (state, action) => {
  const actions = {
    addMolecule: (molecule) => {
      if (state.molecules.map(mol => mol.drugbank_id).includes(molecule.drugbank_id)) {
        return state;
      }
      molecule.color = colorful_language(molecule.name, 0.25);
      return {
        ...state,
        molecules: [...state.molecules, molecule],
      };
    },
    addMolecules: (molecules) => {
      const newMolecules = molecules.map(molecule => {
        molecule.color = colorful_language(molecule.name, 0.25);
        return molecule;
      }).filter(molecule => !state.molecules.map(mol => mol.drugbank_id).includes(molecule.drugbank_id));

        return {
          ...state,
          molecules: [...state.molecules, ...newMolecules],
        };
      },
      removeMolecule: (molecule) => {
        const customPdbs = {...state.customPdbs};
        delete customPdbs[molecule.name];
        return ({
          ...state,
          molecules: state.molecules.filter(mol => mol.drugbank_id !== molecule.drugbank_id),
          interactingMolecules: state.interactingMolecules.filter(mol => mol.drugbank_id !== molecule.drugbank_id),
          interactingMoleculesLoading: true,
          selectedMolecule: state.selectedMolecule && state.selectedMolecule.drugbank_id === molecule.drugbank_id ? null : state.selectedMolecule,
          customPdbs,

        });
      },
      cleanMolecules: () => ({
        ...state,
        molecules: [],
        interactingMolecules: [],
        selectedMolecule: null,
        customPdbs: {},
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
        state.interactingMolecules.map(mol => mol.drugbank_id).includes(molecule.drugbank_id) ?
          {...state} :
          {
            ...state,
            interactingMolecules: [...state.interactingMolecules, molecule],
            interactingMoleculesLoading: true,
          }
      ),
      resetInteractingMolecules: () => ({
        ...state,
        interactingMolecules: [],
        interactingMoleculesResult: null,
      }),
      removeInteractingMolecule: (molecule) => ({
        ...state,
        interactingMolecules: state.interactingMolecules.filter(mol => mol.drugbank_id !== molecule.drugbank_id),
        interactingMoleculesResult: state.interactingMolecules.length < 2 ? null : state.interactingMoleculesResult,
        interactingMoleculesLoading: state.interactingMolecules.length < 2 ? false : state.interactingMoleculesLoading,
      }),
      setInteractingMoleculesResult: (interactingMoleculesResult) => ({
        ...state,
        interactingMoleculesResult,
        interactingMoleculesLoading: false,
      }),
      addProtein: (protein) => ({
        ...state,
        protein,
      }),
      removeProtein: () => ({
        ...state,
        protein: null,
      }),
      addOrganism: (organism) => ({
        ...state,
        organism,
      }),
      removeOrganism: () => ({
        ...state,
        organism: null,
      }),
      selectPdb: (pdbid) => ({
        ...state,
        pdbid,
      }),
      removePdb: () => ({
        ...state,
        pdbid: '',
      }),
      addDemographics: (demographics) => {
        const newDemographics = [...state.demographics];
        const found = newDemographics.findIndex(d => d.id === demographics.id);
        if (found !== -1) {
          newDemographics[found] = demographics;
        } else {
          newDemographics.push(demographics);
        }
        return {
          ...state,
          demographics: newDemographics,
        };
      },
      removeDemographics: (demographics) => ({
        ...state,
        demographics: state.demographics.filter(demo => demo.id !== demographics.id),
      }),
      selectDemographics: (demographics) => ({
        ...state,
        selectedDemographics: demographics,
      }),
      demographicsResult: (demographicsResult) => ({
        ...state,
        demographicsResult: {
          ...state.demographicsResult,
          ...demographicsResult,
        },
      }),
    addMoleculeDocking: ({drug}) => {
      const moleculeDocking = {...state.moleculeDocking};
      moleculeDocking[drug] = {
        status: 'loading',
      };
      return {
        ...state,
        moleculeDocking,
        docking: Object.entries(moleculeDocking).map(([id, pdb]) => pdb.status === 'loading' ? 1 : 0).reduce((a, b) => a + b, 0),
      };
    },
    addMoleculeDockingResponse: ({drug, data, status}) => {
      const moleculeDocking = {
        ...state.moleculeDocking,
        [drug]: {
          ...state.moleculeDocking[drug],
          response: data,
          status,
        },
      };
      return {
        ...state,
        moleculeDocking,
        docking: Object.entries(moleculeDocking).map(([id, pdb]) => pdb.status === 'loading' ? 1 : 0).reduce((a, b) => a + b, 0),
      };
    },
    setEsmfold: (esmfold) => ({
      ...state,
      esmfold,
    }),
    setAlphafold: (alphafold) => ({
      ...state,
      alphafold,
    }),
    clean: () => initialState,
    restore: (state) => state,
    setDrugsProtein: (drugsProtein) => ({
      ...state,
      drugsProtein,
    }),
    };
return actions[action.type](action.payload);
}


const DashboardContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {state, dispatch};
  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export {DashboardContext, DashboardContextProvider};
