import {Endpoints} from "../../config/Consts";
import {api} from "../../infrastructure/api/instance";

export const dockingFetcher = (pdbid, molecule, dispatch, pdbPath, type) => {
  return new Promise((resolve, reject) => {
    dispatch({type: 'addMoleculeDocking', payload: {drug: molecule.name}});
    api.post(Endpoints.docking.calculate, {
        ...pdbid && {pdbId: pdbid},
        drugbankId: molecule.drugbank_id && molecule.drugbank_id.startsWith("DB") ? molecule.drugbank_id : undefined,
        smiles: molecule.calculated_properties.SMILES,
        name: molecule.name,
        ...pdbPath && {pdbPath: pdbPath},
        ...type && {type: type},
    }).then(res => {
      if (!res.data.url) {
        resolve(false);
        return;
      }
      dispatch({type: 'addMoleculeDockingResponse', payload: {drug: molecule.name, data: res.data, status: 'success'}});
      resolve(true);
    }).catch(() => {
      dispatch({type: 'addMoleculeDockingResponse', payload: {drug: molecule.name, data: null, status: 'error'}});
      reject()
    });
  })
}
