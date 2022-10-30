import {Endpoints} from "../../config/Consts";
import {api} from "../../infrastructure/api/instance";

export const dockingFetcher = (pdbid, molecule, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({type: 'addCustomPdb', payload: {drug: molecule.name}});
    api.post(Endpoints.docking.calculate, {
        pdbId: pdbid,
        drugbankId: molecule.drugbank_id && molecule.drugbank_id.startsWith("DB") ? molecule.drugbank_id : undefined,
        smiles: molecule.calculated_properties.SMILES,
        name: molecule.name,
    }).then(res => {
      if (!res.data.url) {
        resolve(false);
        return;
      }
      dispatch({type: 'addCustomPdbResponse', payload: {drug: molecule.name, data: res.data, status: 'success'}});
      resolve(true);
    }).catch(() => {
      dispatch({type: 'addCustomPdbResponse', payload: {drug: molecule.name, data: null, status: 'error'}});
      reject()
    });
  })
}
