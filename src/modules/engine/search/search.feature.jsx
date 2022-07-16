import { useApiCall } from "../../../infrastructure/hooks/useApiCall";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDashboardContext } from "../../../modules/dashboard/context/useDashboarContext";
import { useNavigate } from "react-router-dom";
import { Endpoints } from "../../../config/Consts";
import axios from 'axios';
import { CircularProgressComponent } from "../../../infrastructure/components/CircularProgress.component";
import { Grid } from "@mui/material";
import "./search.scss";
import { DrugProperties } from "../../dashboard/DrugProperties";
import { DrugLiterature } from "./DrugLiterature";
import { DrugResults } from "./DrugResults";
import { SearchInput } from "./SearchInput";
import { ProteinResults } from "./ProteinResults";
import { SectionTitle } from "./SectionTitle";
import { TargetLiterature } from "./TargetLiterature";
import { DrugSynthesis } from "./DrugSynthesis";
import { useEngineContext } from "../useEngineContext";

export const SearchFeature = () => {
  const {loading, data, fetch} = useApiCall(Endpoints.search.drug, 'POST', null, false);
  const {dispatch: dashboardDispatch} = useDashboardContext();
  const {state, dispatch} = useEngineContext();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');
  const [clickedRow, setClickedRow] = useState('');
  const [secondaryLoader, setSecondaryLoader] = useState(false);

  const drugs = useMemo(() => data && data.result && 'drugs' in data.result ? Object.entries(data.result.drugs).map(([_key, _value]) => ({
    'title': _key,
    'counter': _value.counter,
    'pmids': _value.item_pmids,
    'metrics': _value.metrics
  })) : [], [data]);
  const targets = useMemo(() => data && data.result && 'targets' in data.result ? Object.entries(data.result.targets).map(([_key, _value]) => ({
    'title': _key,
    'counter': _value.counter,
    'pmids': _value.item_pmids,
    'metrics': _value.metrics
  })) : [], [data]);


  const onRun = useCallback(() => {
    fetch(Endpoints.search.drug, 'POST', {drug: searchText, filter1: true, pmids: true});
  }, [searchText]);

  const drugHandleClick = useCallback((data) => {
    dispatch({type: 'setSelectedDrug', payload: data});
  }, [dispatch]);

  const uploadSelectedDrugs = useCallback(async () => {
    const promises = [];
    state.drugSelection.forEach(drug => {
      const url = `${Endpoints.drugbank.drugs}${drug}?page=${0}`;
      promises.push(axios.get(url));
    });
    setSecondaryLoader(true);
    const molecules = [];
    Promise.all(promises).then((responses) => {
      responses.forEach((resp, drugIndex) => {
        if (resp.data) {
          for (let i = 0; i < resp.data.items.length; i++) {
            if (resp.data.items[i].name.toLowerCase() === state.drugSelection[drugIndex].toLowerCase()) {
              molecules.push(resp.data.items[i]);
            }
          }
        }
      });
      dashboardDispatch({type: 'addMolecules', payload: molecules})
      dashboardDispatch({type: 'resetInteractingMolecules', payload: null});
      navigate("/dashboard");
      setSecondaryLoader(false);
    });
  }, [state.drugSelection, dashboardDispatch, navigate]);

  const uploadSelectedProteinDrugs = useCallback(async () => {
    const url = `${Endpoints.drugbank.targets}${state.targetSelection[0]}`;
    setSecondaryLoader(true);
    axios.get(url).then(resp => {
      if (resp.data) {
        dashboardDispatch({type: 'addProtein', payload: resp.data[0]});
        uploadSelectedDrugs();
      }
    });
  }, [state.targetSelection, dashboardDispatch, uploadSelectedDrugs]);

  const onTargetSelectionChange = useCallback((selection) => {
    if (selection.length > 1) {
      const selectionSet = new Set(state.targetSelection);
      const result = selection.filter((s) => !selectionSet.has(s));
      const selectedRowData = targets.find((row) => row.title.toLowerCase() === selection[selection.length - 1].toLowerCase());
      dispatch({type: 'setTargetSelection', payload: result});
      dispatch({type: 'setSelectedTarget', payload: selectedRowData});
    }
  }, [state.targetSelection, dispatch, targets]);

  useEffect(() => {
    if (data && data.result) {
      if (drugs.length > 0) {
        const defaultDrug = searchText.toLowerCase();
        const defaultDrugRow = drugs.find((row) => row.title.toLowerCase() === defaultDrug);
        if (defaultDrugRow) {
          setTimeout(() => {
            dispatch({type: 'setSelectedDrug', payload: defaultDrugRow});
            dispatch({type: 'setDrugSelection', payload: [defaultDrugRow.title.toLowerCase()]});
          }, 100);
        } else {
          dispatch({type: 'setDrugSelection', payload: [defaultDrug]});
        }
        dispatch({type: 'setDrugs', payload: drugs});
        if (!targets || targets.length === 0) {
          return;
        }
        const defaultTarget = targets[0].title.toLowerCase();
        const defaultTargetRow = targets.find((row) => row.title.toLowerCase() === defaultTarget);
        if (defaultTargetRow) {
          dispatch({type: 'setSelectedTarget', payload: defaultTargetRow});
        }
        dispatch({type: 'setTargetSelection', payload: [defaultTarget]});
        dispatch({type: 'setTargets', payload: targets});
      }
    }
  }, [data, dispatch, drugs, targets]);


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
          <SectionTitle text="Related Drugs"/>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DrugResults drugs={state.drugs}
                           onRowClick={(param) => {
                             drugHandleClick(param.row);
                             setClickedRow(param.row.title.toLowerCase());
                           }}
                           selectionModel={state.drugSelection}
                           onSelectionModelChange={(ids) => {
                             dispatch({type: 'setDrugSelection', payload: ids})
                           }}
                           rowClassName={(params) => params.id === clickedRow ? 'selected-bg' : ''}
                           onClick={uploadSelectedDrugs}/>
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
