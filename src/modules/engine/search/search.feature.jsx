import { useApiCall } from "../../../infrastructure/hooks/useApiCall";
import { useEffect, useMemo, useState } from 'react';
import { useDashboardContext } from "../../../modules/dashboard/context/useDashboarContext";
import { useNavigate } from "react-router-dom";
import { Endpoints } from "../../../config/Consts";
import axios from 'axios';
import { CircularProgressComponent } from "../../../infrastructure/components/CircularProgress.component";
import { Grid, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import "./search.scss";
import { DrugProperties } from "../../dashboard/DrugProperties";
import { DrugLiterature } from "./DrugLiterature";
import { DrugResults } from "./DrugResults";
import { SearchInput } from "./SearchInput";
import { ProteinResults } from "./ProteinResults";
import { DrugSynthesisToXDL } from "./DrugSynthesisToXDL";
import { SectionTitle } from "./SectionTitle";
import { TargetLiterature } from "./TargetLiterature";

export const SearchFeature = () => {
  const {loading, data, error, fetch} = useApiCall(Endpoints.search.drug, 'POST', null, false);
  const {state, dispatch} = useDashboardContext();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');

  const [rowTargets, setRowTargets] = useState([]);
  const [rowDrugs, setRowDrugs] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');
  const [clickedRow, setClickedRow] = useState('');

  const [selectionDrugModel, setSelectionDrugModel] = useState([]);
  const [selectionTargetModel, setSelectionTargetModel] = useState([]);
  const [pdfList, setPdfList] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedPdfObj, setSelectedPdfObj] = useState("");
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


  const onRun = () => {
    fetch(Endpoints.search.drug, 'POST', {drug: searchText, filter1: true, pmids: true});
  }

  useEffect(() => {
    if (data && data.result) {
      if (drugs.length > 0) {
        const defaultDrug = searchText.toLowerCase();
        setSelectionDrugModel(prev => [...prev, `${defaultDrug}`]);
        const defaultDrugRow = drugs.filter((row) => row.title.toLowerCase() === defaultDrug);
        viewDrugLiterature(defaultDrugRow);
        getpdfs(searchText);
        const defaultTarget = targets[0].title.toLowerCase();
        setSelectionTargetModel([`${defaultTarget}`]);
        const defaultTargetRow = targets.filter((row) => row.title.toLowerCase() === defaultTarget);
        viewTargetLiterature(defaultTargetRow)
      }
    }
  }, [data]);


  function drughandleClick(data) {
    setSelectedDrug(data.title);
    setRowDrugs(data.pmids);
  }

  function viewDrugLiterature(data) {
    if (data.length > 0) {
      setTimeout(() => {
        setSelectedDrug(data[0].title);
        setRowDrugs(data[0].pmids);
      }, 0);
    }
  }

  function viewTargetLiterature(data) {
    if (data.length > 0) {
      setTimeout(() => {
        setSelectedTarget(data[0].title);
        setRowTargets(data[0].pmids);
      }, 0);
    }
  }

  const uploadSelectedDrugs = async () => {
    const promises = [];
    selectionDrugModel.forEach(drug => {
      const url = `${Endpoints.drugbank.drugs}${drug}?page=${0}`;
      promises.push(axios.get(url));
    });
    setSecondaryLoader(true);
    Promise.all(promises).then((responses) => {
      responses.forEach((resp, drugIndex) => {
        if (resp.data) {
          for (let i = 0; i < resp.data.items.length; i++) {
            if (resp.data.items[i].name.toLowerCase() === selectionDrugModel[drugIndex].toLowerCase()) {
              dispatch({type: 'addMolecule', payload: resp.data.items[i]})
            }
          }
        }
      });
      dispatch({type: 'resetInteractingMolecules', payload: null});
      navigate("/dashboard");
      setSecondaryLoader(false);
    });
  }

  const uploadSelectedProteinDrugs = async () => {
    const url = `${Endpoints.drugbank.targets}${selectionTargetModel[0]}`;
    axios.get(url).then(resp => {
      if (resp.data) {
        dispatch({type: 'addProtein', payload: resp.data[0]});
        uploadSelectedDrugs();
      }
    });
  }

  const getpdfs = (list) => {
    if (list !== undefined) {
      const url = Endpoints.search.pdf;
      // reset pdflists and selected pdf object on click drug name
      setPdfList([]);
      setSelectedPdfObj("");
      axios.get(`${url}?query=${list}&page=0&pageSize=10`).then((resp) => {
        if (resp.data.items) {
          setPdfList(resp.data.items);
        }
      });
    }
  }

  const handlePdfChange = (e) => {
    const selectedpdf = e.target.value;
    setSelectedPdf(selectedpdf);
    const selectedObj = pdfList.find(text => text.title === selectedpdf);
    setSelectedPdfObj(selectedObj);
  }

  const getOnSelectionModelChange = (selection) => {
    if (selection.length > 1) {
      const selectionSet = new Set(selectionTargetModel);
      const result = selection.filter((s) => !selectionSet.has(s));
      setSelectionTargetModel(result);
      const selectedRowData = targets.filter((row) => row.title.toLowerCase() === selection[selection.length - 1]);
      setSelectedTarget(selectedRowData[0].title);
      setRowTargets(selectedRowData[0].pmids);
    }
  }

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
        data && data.result ? <div>
          <SectionTitle text="Related Drugs"/>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DrugResults drugs={drugs}
                           onRowClick={(param) => {
                             drughandleClick(param.row);
                             setClickedRow(param.row.title.toLowerCase());
                             getpdfs(param.row.title.toLowerCase())
                           }}
                           selectionModel={selectionDrugModel}
                           onSelectionModelChange={(ids) => setSelectionDrugModel(ids)}
                           rowClassName={(params) => params.id === clickedRow ? 'selected-bg' : ''}
                           onClick={uploadSelectedDrugs}/>
            </Grid>
            <Grid item xs={6}>
              <DrugLiterature selectedDrug={selectedDrug} rowdrugs={rowDrugs}/>
            </Grid>
          </Grid>
          <SectionTitle text="Related Target Proteins"/>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ProteinResults targets={targets}
                              selectionModel={selectionTargetModel}
                              onSelectionModelChange={getOnSelectionModelChange}
                              onUpdateProteinAndDrug={uploadSelectedProteinDrugs}/>
            </Grid>
            <Grid item xs={6}>
              <TargetLiterature selectedtarget={selectedTarget} rowtargets={rowTargets}/>
            </Grid>
          </Grid>
          <section id='title-wrapper'>
            <div className='title'>Drug Synthesis</div>
            <div className='line'></div>
            <div className='title'>
              <TextField sx={{"width": "200px", "background": "#fff", "maxWidth": "200px"}}
                         id="outlined-select-currency" select label="Select Pdf" value={selectedPdf}
                         onChange={handlePdfChange}>
                {
                  pdfList.map(text => <MenuItem key={text.id} value={text.title}>{text.title}</MenuItem>)
                }
              </TextField>
            </div>
          </section>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DrugSynthesisToXDL pdfObj={selectedPdfObj}
              />
            </Grid>
          </Grid>
        </div> : loading && <CircularProgressComponent/>
      }
      {secondaryLoader && <CircularProgressComponent/>}
      <DrugProperties/>
    </div>
  )
}
