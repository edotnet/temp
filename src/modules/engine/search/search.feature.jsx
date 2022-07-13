import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useApiCall } from "../../../infrastructure/hooks/useApiCall";
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDashboardContext } from "../../../modules/dashboard/context/useDashboarContext";
import { useNavigate } from "react-router-dom";
import { Endpoints } from "../../../config/Consts";
import axios from 'axios';
import { CircularProgressComponent } from "../../../infrastructure/components/CircularProgress.component";
import dtiimage from '../../../assets/img/table-dti-icon.svg';
import { Grid, Box, Chip, Modal, AccordionSummary, AccordionDetails, Typography, Accordion, TextField, IconButton, Button, ButtonGroup} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from '@mui/material/MenuItem';
import "./search.scss";
import ContentCopy from "@mui/icons-material/ContentCopy";
import beautify from "xml-beautifier";
import {CopyComponent} from "../../../infrastructure/components/Copy.component";
import * as PropTypes from "prop-types";
import { ProteinModal } from "./ProteinModal";
import { DrugProperties } from "../../dashboard/DrugProperties";
import { DrugLiterature } from "./DrugLiterature";
import { DrugResults } from "./DrugResults";
import { SearchInput } from "./SearchInput";
import { ProteinResults } from "./ProteinResults";
import { DrugSynthesisToXDL } from "./DrugSynthesisToXDL";
import { SectionTitle } from "./SectionTitle";
import { TargetLiterature } from "./TargetLiterature";

export const SearchFeature = () => {
  const [rowtargets, setrowTargets] = useState([]);
  const [rowdrugs, setrowDrugs] = useState([]);
  const [selecteddrug, setselecteddrug] = useState('');
  const [selectedtarget, setselectedtarget] = useState('');
  const [clickedRow, setClickedRow] = useState('');
  const url = `https://api.prepaire.com/drug-search`;
  const { loading, data, error, fetch } = useApiCall(url, 'POST', null, false);
  const drugs = data && data.result && 'drugs' in data.result ? Object.entries(data.result.drugs).map(([_key, _value]) => ({ 'title': _key, 'counter': _value.counter, 'pmids': _value.item_pmids, 'metrics': _value.metrics })) : []
  const targets = data && data.result && 'targets' in data.result ? Object.entries(data.result.targets).map(([_key, _value]) => ({ 'title': _key, 'counter': _value.counter, 'pmids': _value.item_pmids, 'metrics': _value.metrics })) : [];

  const { state, dispatch } = useDashboardContext();
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const [selectionDrugModel, setSelectionDrugModel] = useState([]);

  const [selectionTargetModel, setSelectionTargetModel] = useState([]);
  const [Loadingresult, setLoadingresult] = useState(false);


  const [pdfList, setpdfList] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [selectedPdfObj, setSelectedPdfObj] = useState("");

  const onRun = () => {
    fetch(url, 'POST', { drug: text, filter1: true, pmids: true });
    setLoadingresult(true);
  }

  useEffect(() => {
    if(data && data.result) {
      if (drugs.length > 0) {
        const defaultDrug = text.toLowerCase();
        setSelectionDrugModel(selectionDrugModel => [...selectionDrugModel, `${defaultDrug}`]);
        const defaultDrugRow = drugs.filter((row) => row.title.toLowerCase() === defaultDrug);
        viewDrugLiterature(defaultDrugRow);
        getpdfs(text);
        const defaultTarget = targets[0].title.toLowerCase();
        setSelectionTargetModel([`${defaultTarget}`]);
        const defaultTargetRow = targets.filter((row) => row.title.toLowerCase() === defaultTarget);
        viewTargetLiterature(defaultTargetRow)
      }
    }
  }, [data]);


  function drughandleClick(data) {
    setselecteddrug(data.title);
    setrowDrugs(data.pmids);
  }

  function viewDrugLiterature(data) {
    if (data.length > 0) {
      setTimeout(() => {
        setselecteddrug(data[0].title);
        setrowDrugs(data[0].pmids);
      }, 0);
    }
  }

  function viewTargetLiterature(data) {
    if (data.length > 0) {
      setTimeout(() => {
        setselectedtarget(data[0].title);
        setrowTargets(data[0].pmids);
      }, 0);
    }
  }

  function targetshandleClick(data) {
    setselectedtarget((data.title))
    setrowTargets(data.pmids);
  }

  const uploadSelectedDrugs = async () => {
    selectionDrugModel.forEach(drug => {
      const url = `${Endpoints.drugbank.drugs}${drug}?page=${0}`;
      axios.get(url).then(resp => {
        if (resp.data) {
          for (let i = 0; i < resp.data.items.length; i++) {
            if (resp.data.items[i].name.toLowerCase() === drug) {
              dispatch({type: 'addMolecule', payload: resp.data.items[i]})
            }
          }
        }
        dispatch({type: 'resetInteractingMolecules', payload: null});
        navigate("/dashboard");
      });
    })
  }

  const uploadSelectedProtein = async () => {
      const url = `${Endpoints.drugbank.targets}${selectionTargetModel[0]}`;
      axios.get(url).then(resp => {
        if(resp.data) {
          dispatch({type: 'addProtein', payload: resp.data[0]});
          dispatch({type: 'resetInteractingMolecules', payload: null});
          dispatch({type: 'removePdb', payload: null});
          navigate("/dashboard");
          // uploadSelectedDrugs();
        }
      });
  }

  const uploadSelectedProteinDrugs = async () => {
    const url = `${Endpoints.drugbank.targets}${selectionTargetModel[0]}`;
    axios.get(url).then(resp => {
      if(resp.data) {
        dispatch({type: 'addProtein', payload: resp.data[0]});
         uploadSelectedDrugs();
      }
    });
  }


  const handleOnCellClick = (params, e) => {
    if(params.field === 'title') {
      const url = `${Endpoints.drugbank.drugs}${params.value}?page=${0}`;
      axios.get(url).then(resp => {
        if (resp.data) {
          const molecule = resp.data.items[0];
          molecule.coordinates = {
            x: e.clientX,
            y: e.clientY,
          }
          dispatch({type: 'selectMolecule', payload: molecule});
        }
      });
    }
  };

  const getpdfs = (list) => {
    if(list !== undefined) {
      const url = Endpoints.search.pdf;
      // reset pdflists and selected pdf object on click drug name
      setpdfList([]);
      setSelectedPdfObj("");
      axios.get(`${url}?query=${list}&page=0&pageSize=10`).then((resp) => {
        if(resp.data.items) {
            setpdfList(resp.data.items);
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

  const downloadpdf = () => {
    const url = Endpoints.pdf.download
    axios.get(`${url}${selectedPdfObj.filePath}`).then(resp => {
      if(resp.data) {
        window.open(resp.data.url , '_blank');
      }
    });
  }

  const getOnSelectionModelChange = (selection) => {
    if (selection.length > 1) {
      const selectionSet = new Set(selectionTargetModel);
      const result = selection.filter((s) => !selectionSet.has(s));
      setSelectionTargetModel(result);
      const selectedRowData = targets.filter((row) => row.title.toLowerCase() === selection[selection.length - 1]);
      setselectedtarget(selectedRowData[0].title);
      setrowTargets(selectedRowData[0].pmids);
    }
  }

  return (
    <div className="searchDefault">
      <Grid container spacing={2} style={{marginTop: '40px', marginBottom: '40px'}}>
        <SearchInput value={text} onChange={e => setText(e.target.value)} onKeyPress={(e) => {
          if (e.key === 'Enter') {
            setText(e.target.value);
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
                           onCellClick={handleOnCellClick}
                           onSelectionModelChange={(ids) => setSelectionDrugModel(ids)}
                           rowClassName={(params) => params.id === clickedRow ? 'selected-bg' : ''}
                           onClick={uploadSelectedDrugs}/>
            </Grid>
            <Grid item xs={6}>
              <DrugLiterature selecteddrug={selecteddrug} rowdrugs={rowdrugs}/>
            </Grid>
          </Grid>
          <SectionTitle text="Related Target Proteins"/>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ProteinResults targets={targets}
                              selectionModel={selectionTargetModel}
                              onSelectionModelChange={getOnSelectionModelChange}
                              onUploadSelectedProtein={uploadSelectedProtein}
                              onUpdateProteinAndDrug={uploadSelectedProteinDrugs}/>
            </Grid>
            <Grid item xs={6}>
              <TargetLiterature selectedtarget={selectedtarget} rowtargets={rowtargets} />
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
              {
                selectedPdfObj ?
                  <p>Please download the pdf <a style={{'color': '#6E54C2', 'cursor': 'pointer', fontWeight: 'bold'}}
                                                onClick={downloadpdf}>{selectedPdfObj.title}</a></p> : ''
              }
              <DrugSynthesisToXDL pdfList={pdfList}
                                  selectedPdfObj={selectedPdfObj}
              />
            </Grid>
          </Grid>
        </div> : Loadingresult && <CircularProgressComponent/>
      }
      <DrugProperties/>
    </div>
  )
}
