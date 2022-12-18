export const Consts = {
  BACKEND_API_URL: process.env.REACT_APP_BACKEND_API_URL,
  API_URL: process.env.REACT_APP_API_URL,
}

const isApi = !window.location.search.includes('isApi=true')
const useApi = isApi ? Consts.API_URL : Consts.BACKEND_API_URL

const isProd = window.location.hostname === 'app.prepaire.com'

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
    query: `${useApi}/natural_products/query-new/`,
  },
  ml: {
    drugProtein: `${Consts.API_URL}/drug-protein-pec50`,
    drugProteinOld: `${Consts.API_URL}/drug-protein-kd`,
    drugInteraction: `${useApi}/drug-synergy`,
    drugInteractionOld: `${useApi}/drug-interaction`,
    drugsProtein: `${useApi}/drugs-protein`,
  },
  pdf: {
    upload: `${useApi}/xdl/upload`,
    xdl: `${useApi}/pdf-xdl`,
    add: `${useApi}/xdl/add`,
    download: `${useApi}/xdl/getfile/`,
  },
  text2xdl: {
    xdl: `${useApi}/text-to-xdl`,
  },
  search: {
    pdf: `${useApi}/xdl/search`,
    drug: `${useApi}/drug-search${isProd ? '' : '-new'}`,
  },
  musyc: {
    query: `${useApi}/3d/calculate`,
  },
  docking: {
    calculate: isProd ? `${useApi}/docking/calculate` : `${useApi}/test/calculate`,
  },
  auth: {
    login: `${Consts.API_URL}/auth/login`,
    signup: `${Consts.API_URL}/auth/register`,
    refresh: `${Consts.API_URL}/auth/refreshToken`,
    verify: `${Consts.API_URL}/auth/verifyAccount`,
    resendVerify: `${Consts.API_URL}/auth/resendVerificationCode`,
  },
  notifications: {
    register: `${Consts.API_URL}/notifications/devices/add`,
    list: `${Consts.API_URL}/notifications/list`,
  },
  proteins: {
    name: `${useApi}/proteins/names`,
    organisms: `${useApi}/proteins/organisms`,
    ESMFold: `${useApi}/proteins/esmatlasFold`,
    AlphaFold: `${useApi}/alphafold/calculate`,
    checkAlphaFold: `${useApi}/alphafold/check`,
  },
  session: {
    list: `${Consts.API_URL}/session`,
    create: `${Consts.API_URL}/session`,
    delete: id => `${Consts.API_URL}/session/${id}`,
    update: id => `${Consts.API_URL}/session/${id}`,
    get: id => `${Consts.API_URL}/session/${id}`,
  },
  genephenotype: {
    search: `${useApi}/genephenotype/search`,
    genes: `${useApi}/genephenotype/genes`,
  },
  diseaseMaps: {
    list: `${useApi}/disease-maps`,
    details: id => `${useApi}/disease-maps/${id}`,
  },
  map: {
    countriesList: query => `${useApi}/map/countries?query=${query}&pageSize=10&pageNumber=0`,
    citiesList: (countryId, query) =>
      `${useApi}/map/cities?countryId=${countryId}&query=${query}&pageSize=10&pageNumber=0`,
    diseasesList: query => `${useApi}/map/diseases?query=${query}&pageSize=10&pageNumber=0`,
    info: (countryId, cityId, diseaseId) =>
      `${useApi}/map/info?countryId=${countryId}&cityId=${cityId}&diseaseId=${diseaseId}`,
    allInfo: `${useApi}/map/info`,
    event: `${useApi}/map/events`,
    deleteEvent: id => `${useApi}/map/events/${id}`,
  },
  prescriptionOrders: {
    history: `${Consts.API_URL}/personalizedPrescriptionOrders`,
    add: `${Consts.API_URL}/personalizedPrescriptionOrders`,
  }
}

export const DemographicYears = [
  '0-15 years (pediatrics)',
  '16-24 years (youths)',
  '25-64 years (adults)',
  '65+ years',
]
export const DemographicBmi = [
  'Below 18.5',
  '18.5-24.9',
  '25-29.9',
  '30-34.9',
  '35-39.9',
  'Above 40',
]

export const ESM_FOLD_PDB = 'ESMFold'
export const ALPHA_FOLD_PDB = 'AlphaFold'
