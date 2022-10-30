import {encodeQuery, useApiCall} from '../../../infrastructure/hooks/useApiCall';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDashboardContext } from '../../dashboard/context/useDashboarContext';
import { useNavigate } from "react-router-dom";
import { Endpoints } from "../../../config/Consts";
import axios from 'axios';
import { CircularProgressComponent } from "../../../infrastructure/components/CircularProgress.component";
import { Grid } from "@mui/material";
import "./search.scss";
import {dockingFetcher} from '../../dashboard/DockingFetcher';
import { DrugProperties } from "../../dashboard/DrugProperties";
import { DrugLiterature } from "./DrugLiterature";
import { DrugResults } from "./DrugResults";
import {NaturalProductsResults} from './NaturalProductsResults';
import { SearchInput } from "./SearchInput";
import { ProteinResults } from "./ProteinResults";
import { SectionTitle } from "./SectionTitle";
import { TargetLiterature } from "./TargetLiterature";
import { DrugSynthesis } from "./DrugSynthesis";
import { useEngineContext } from "../useEngineContext";
import {api} from "../../../infrastructure/api/instance";

export const SearchFeature = () => {
  const {loading, data, fetch} = useApiCall(Endpoints.search.drug, 'POST', null, false);
  const {state: dashboardState, dispatch: dashboardDispatch} = useDashboardContext();
  const {state, dispatch} = useEngineContext();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');
  const [clickedRow, setClickedRow] = useState('');
  const [secondaryLoader, setSecondaryLoader] = useState(false);

  const {drugs, naturalProducts, targets} = useMemo(() => {
    const keys = {
      drug: 'drugs',
      natural_product: 'naturalProducts',
      protein: 'targets',
    }
    const res = {
      drugs: [],
      naturalProducts: [],
      targets: [],
    };
    if (data) {
      data.forEach(item => {
        res[keys[item.type]].push(item);
      });
    }
    return res;
  }, [data]);


  const onRun = useCallback(() => {
    fetch(Endpoints.search.drug, 'POST', {query: searchText});
  }, [searchText]);

  const drugHandleClick = useCallback((data) => {
    dispatch({type: 'setSelectedDrug', payload: data});
  }, [dispatch]);

  const dispatchDocking = useCallback(() => {
    if (dashboardState.pdbid) {
      state.molecules.forEach(molecule => {
        dockingFetcher(dashboardState.pdbid, molecule, dashboardDispatch);
      });
    }
  }, [dashboardState.pdbid, dashboardDispatch, state.molecules]);

  const uploadSelectedDrugs = useCallback(async () => {
    const promises = [];
    state.drugSelection.forEach(drug => {
      const url = `${Endpoints.drugbank.drugs}${encodeQuery(drug)}?exact=1`;
      promises.push(axios.get(url));
    });
    setSecondaryLoader(true);
    Promise.all(promises).then((responses) => {
      const molecules = [];
      responses.forEach((resp, drugIndex) => {
        if (resp.data) {
          resp.data.items.forEach((item) => {
            if ('name' in item && state.drugSelection.map(el => el.toLowerCase()).includes(item.name.toLowerCase())) {
              molecules.push(item);
            }
          });
        }
      });
      dashboardDispatch({type: 'addMolecules', payload: molecules})
      dashboardDispatch({type: 'resetInteractingMolecules', payload: null});
      dispatchDocking();
      navigate("/dashboard");
      setSecondaryLoader(false);
    });
  }, [state.drugSelection, state.molecules, dashboardDispatch, dashboardState.pdbid, navigate]);

  const uploadSelectedNaturalProducts = useCallback(async () => {
    const promises = [];
    state.naturalProductSelection.forEach(naturalProduct => {
      const url = `${Endpoints.naturalProducts.query}${encodeQuery(naturalProduct)}?exact=1`;
      promises.push(axios.get(url));
      setSecondaryLoader(true);
      Promise.all(promises).then((responses) => {
        const molecules = [];
        responses.forEach((resp, drugIndex) => {
          if (resp.data) {
            resp.data.items.forEach((item) => {
              if ('cn' in item && state.naturalProductSelection.map(el => el.toLowerCase()).includes(item.cn.toLowerCase())) {
                const molecule = {
                  name: item.cn,
                  drugbank_id: item.UNPD_ID,
                  calculated_properties: {
                    SMILES: item.SMILES,
                  }
                }
                molecules.push(molecule);
              }
            });
          }
        });
        dashboardDispatch({type: 'addMolecules', payload: molecules})
        dashboardDispatch({type: 'resetInteractingMolecules', payload: null});
        dispatchDocking();
        navigate("/dashboard");
        setSecondaryLoader(false);
      });
    })
  }, [state.naturalProductSelection, state.molecules, dashboardDispatch, dashboardState.pdbid, navigate]);

  const uploadSelectedProteinDrugs = useCallback(async () => {
    const url = `${Endpoints.proteins.name}?criteria=${encodeQuery(state.targetSelection[0])}&exact=1`;
    setSecondaryLoader(true);
    api.get(url).then(resp => {
      if (resp.data) {
        dashboardDispatch({type: 'addProtein', payload: resp.data.items[0]});
        uploadSelectedDrugs();
        uploadSelectedNaturalProducts();
      }
    });
  }, [state.targetSelection, dashboardDispatch, uploadSelectedDrugs]);

  const onTargetSelectionChange = useCallback((selection) => {
    if (selection.length > 1) {
      const selectionSet = new Set(state.targetSelection);
      const result = selection.filter((s) => !selectionSet.has(s));
      const selectedRowData = targets.find((row) => row.name.toLowerCase() === selection[selection.length - 1].toLowerCase());
      dispatch({type: 'setTargetSelection', payload: result});
      dispatch({type: 'setSelectedTarget', payload: selectedRowData});
    }
  }, [state.targetSelection, dispatch, targets]);

  useEffect(() => {
    if (data && data.length) {
      const defaultDrug = searchText.toLowerCase();
      const defaultDrugRow = drugs.find((row) => row.name.toLowerCase() === defaultDrug);
      if (defaultDrugRow) {
        setTimeout(() => {
          dispatch({type: 'setSelectedDrug', payload: defaultDrugRow});
          dispatch({type: 'setDrugSelection', payload: [defaultDrugRow.name.toLowerCase()]});
        }, 100);
      } else {
        dispatch({type: 'setDrugSelection', payload: [defaultDrug]});
      }
      dispatch({type: 'setDrugs', payload: drugs});
      dispatch({type: 'setNaturalProducts', payload: naturalProducts})
      if (!targets || targets.length === 0) {
        return;
      }
      const defaultTarget = targets[0].name.toLowerCase();
      const defaultTargetRow = targets.find((row) => row.name.toLowerCase() === defaultTarget);
      if (defaultTargetRow) {
        dispatch({type: 'setSelectedTarget', payload: defaultTargetRow});
      }
      dispatch({type: 'setTargetSelection', payload: [defaultTarget]});
      dispatch({type: 'setTargets', payload: targets});
    }
  }, [data, dispatch, drugs, searchText, targets]);


  return (
    <div className="searchDefault">
      <Grid container spacing={2} style={{marginTop: '40px', marginBottom: '40px'}}>
        <SearchInput value={searchText} onChange={e => setSearchText(e.target.value)} onKeyPress={(e) => {
          if (e.key === 'Enter') {
            setSearchText(e.target.value);
            onRun()
          }
        }} onClick={onRun}/>
        <Grid item>
          {/* this section is removed for demo purpose, later will add with new design.
          */}
          {/*{*/}
          {/*  data && data.result ? <div>*/}
          {/*    <Box className="selecteddata_dti" boxShadow={3}>*/}
          {/*      <h4 className="heading">Selected data to drug interaction</h4>*/}
          {/*      <h4 className="drugs">Drugs</h4>*/}
          {/*      {*/}
          {/*        selectionDrugModel.length > 0  ? selectionDrugModel.map(item => {*/}
          {/*          return <Chip key={item} style={{marginLeft: '10px'}} label={item} variant="outlined" />*/}
          {/*        }) : ''*/}
          {/*      }*/}
          {/*      <h4 className="proteins">Proteins</h4>*/}
          {/*      {*/}
          {/*        selectionTargetModel.length > 0  ? selectionTargetModel.map(item => {*/}
          {/*          return <Chip key={item} style={{marginLeft: '10px'}} label={item} variant="outlined" />*/}
          {/*        }) : ''*/}
          {/*      }*/}
          {/*      <Button className="uploadbtn" variant="outlined" onClick={uploadTargetDrugs}>*/}
          {/*        <img src={dtiimage} alt="image"/>*/}
          {/*        <span className="text">Upload</span>*/}
          {/*      </Button>*/}
          {/*    </Box>*/}
          {/*  </div> : ''*/}
          {/*}*/}
        </Grid>
      </Grid>

      {
        state.drugs.length > 0 && <>
          <SectionTitle text="Related Remedies"/>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DrugResults drugs={state.drugs}
                           onRowClick={(param) => {
                             drugHandleClick(param.row);
                             setClickedRow(param.row.name.toLowerCase());
                           }}
                           selectionModel={state.drugSelection}
                           onSelectionModelChange={(ids) => {
                             dispatch({type: 'setDrugSelection', payload: ids})
                           }}
                           rowClassName={(params) => params.id === clickedRow ? 'selected-bg' : ''}
                           onClick={uploadSelectedDrugs}/>
              <NaturalProductsResults naturalProducts={state.naturalProducts}
                           onRowClick={(param) => {
                             drugHandleClick(param.row);
                             setClickedRow(param.row.name.toLowerCase());
                           }}
                           selectionModel={state.naturalProductSelection}
                           onSelectionModelChange={(ids) => {
                             dispatch({type: 'setNaturalProductSelection', payload: ids})
                           }}
                           rowClassName={(params) => params.id === clickedRow ? 'selected-bg' : ''}
                           onClick={uploadSelectedNaturalProducts}/>
            </Grid>
            <Grid item xs={6}>
              <DrugLiterature drug={state.selectedDrug} />
            </Grid>
          </Grid>
        </>
      }
      {state.targets.length > 0 && <>
          <SectionTitle text="Related Target Proteins"/>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ProteinResults targets={state.targets}
                              selectionModel={state.targetSelection}
                              onSelectionModelChange={onTargetSelectionChange}
                              onUpdateProteinAndDrug={uploadSelectedProteinDrugs}/>
            </Grid>
            <Grid item xs={6}>
              <TargetLiterature target={state.selectedTarget}/>
            </Grid>
          </Grid>
          <DrugSynthesis searchText={state.selectedDrug ? state.selectedDrug.title : searchText}/>
        </>
      }
      {loading && <CircularProgressComponent/>}
      {secondaryLoader && <CircularProgressComponent/>}
      <DrugProperties/>
    </div>
  )
}
