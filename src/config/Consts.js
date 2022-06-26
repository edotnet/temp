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
  },
  naturalProducts: {
    query: `${useApi}/natural_products/query`,
  },
  ml: {
    drugProtein: `${Consts.API_URL}/drug-protein`,
    drugInteraction: `${useApi}/drug-interaction`,
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
    pdf : `${useApi}/xdl/search`
  }
};
