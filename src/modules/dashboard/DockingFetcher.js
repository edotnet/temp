import {Endpoints} from "../../config/Consts";
import {api} from "../../infrastructure/api/instance";

export const dockingFetcher = (pdbid, molecule, dispatch) => {
  return new Promise((resolve, reject) => {
    api.post(Endpoints.docking.calculate, {
        pdbId: pdbid,
        drugbankId: molecule.drugbank_id.startsWith("DB") ? molecule.drugbank_id : undefined,
        smiles: molecule.calculated_properties.SMILES,
    }).then(res => {
      if (!res.data.url) {
        resolve(false);
        return;
      }
      dispatch({type: 'addCustomPdb', payload: {drug: molecule.name, data: res.data}})      
      dispatch({type: 'decrementDocking'});
      resolve(true);
    }).catch(() => {
      dispatch({type: 'decrementDocking'});
      reject()      
    });
  })
}
