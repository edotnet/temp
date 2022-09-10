import {Endpoints} from "../../config/Consts";

export const dockingFetcher = (pdbid, molecule, dispatch, counter = 0) => {
  return new Promise((resolve, reject) => {
    if (counter === 10) {
      reject();
      return;
    }
    fetch(Endpoints.docking.calculate, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pdbId: pdbid,
        drugbankId: molecule.drugbank_id,
      })
    }).then(res => res.json()).then(res => {
      if (!res.url) {
        return setTimeout(() => dockingFetcher(pdbid, molecule, dispatch,counter + 1), 5000)
      }
      dispatch({type: 'addCustomPdb', payload: {drug: molecule.name, pdb: res.url}})
      resolve();
    }).catch(() => {
      reject()
    });
  })
}