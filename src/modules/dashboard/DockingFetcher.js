import {Endpoints} from "../../config/Consts";
import {api} from "../../infrastructure/api/instance";

export const dockingFetcher = (pdbid, molecule, dispatch, counter = 0) => {
  return new Promise((resolve, reject) => {
    if (counter === 10) {
      reject();
      return;
    }
    api.post(Endpoints.docking.calculate, {
        pdbId: pdbid,
        drugbankId: molecule.drugbank_id.startsWith("DB") ? molecule.drugbank_id : undefined,
        smiles: molecule.calculated_properties.SMILES,
    }).then(res => {
      if (!res.data.url) {
        return setTimeout(() => resolve(dockingFetcher(pdbid, molecule, dispatch,counter + 1)), 10000)
      }
      dispatch({type: 'addCustomPdb', payload: {drug: molecule.name, pdb: res.data.url}})
      resolve();
    }).catch(() => {
      reject()
    });
  })
}