export const Consts = {
  BACKEND_API_URL: process.env.REACT_APP_BACKEND_API_URL,
  API_URL: process.env.REACT_APP_API_URL,
}

const isApi = !window.location.search.includes("isApi=true");
const useApi = isApi ?
    Consts.API_URL : Consts.BACKEND_API_URL;

export const Endpoints = {
  drugbank: {
    drugbank: `${useApi}/drugbank/`,
    drugsquery: `${useApi}/drugbank/query/`,
    drugs: `${useApi}/drugbank/molecule/`,
    targets: `${useApi}/drugbank/target/query/`,
    categories: `${useApi}/drugbank/category/query/`,
    drugsByCategory: `${useApi}/drugbank/drugs/category/`,
    targetDisease: '', // TODO
    calculateMaintenanceDosage: `${useApi}/drugbank/calculateMaintenanceDosage`,
  },
  naturalProducts: {
    query: `${useApi}/natural_products/query/`,
  },
  ml: {
    drugProtein: `${Consts.API_URL}/drug-protein`,
    drugProteinOld: `${Consts.API_URL}/drug-protein-old`,
    drugInteraction: `${useApi}/drug-synergy`,
  },
  pdf: {
    upload: `${useApi}/xdl/upload`,
    xdl: `${useApi}/pdf-xdl`,
    add: `${useApi}/xdl/add`,
    download: `${useApi}/xdl/getfile/`
  },
  text2xdl: {
    xdl: `${useApi}/text-to-xdl`
  },
  search: {
    pdf : `${useApi}/xdl/search`,
    drug: `${useApi}/drug-search`,
  },
  musyc: {
    query: `${useApi}/3d/calculate`,
  },
  docking: {
    calculate: `${useApi}/docking/calculate`,
  }
};

export const DemographicYears = ["0-15 years (pediatrics)", "16-24 years (youths)", "25-64 years (adults)", "65+ years"];
export const DemographicBmi = ["Below 18.5", "18.5-24.9", "25-29.9", "30-34.9", "35-39.9", "Above 40"];