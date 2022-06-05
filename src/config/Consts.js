export const Consts = {
  BACKEND_API_URL: process.env.REACT_APP_BACKEND_API_URL,
  API_URL: process.env.REACT_APP_API_URL,
}

const useApi = window.location.search.includes("isApi=true") ?
    Consts.API_URL : Consts.BACKEND_API_URL;

export const Endpoints = {
  drugbank: {
    query: `${useApi}/drugbank/query/`,
    targets: `${useApi}/drugbank/target/query/`,
    categories: `${useApi}/drugbank/category/query/`,
  },
};