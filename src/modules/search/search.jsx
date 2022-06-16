import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { useEffect, useState } from 'react';
import { DataGrid, GridValueGetterParams } from '@mui/x-data-grid';
import { useDashboardContext } from "../../modules/dashboard/context/useDashboarContext";
import { useNavigate } from "react-router-dom";
import { Endpoints } from "../../config/Consts";
import axios from 'axios';
import { CircularProgressComponent } from "../../infrastructure/components/CircularProgress.component";
import dtiimage from '../../assets/img/table-dti-icon.svg';
import { Grid, Box, Chip, Modal, AccordionSummary, AccordionDetails, Typography, Accordion, TextField, IconButton, Button } from "@mui/material";
import "./search.scss";
import CloseIcon from "@mui/icons-material/Close";


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

  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 0,
    borderRadius: '25px',
    boxShadow: 24,
    p: 4,
  };

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
        navigate("/dashboard");
      });
    })
  }

  const uploadTargetDrugs = async () => {
    const url = `${Endpoints.drugbank.targets}${selectionTargetModel[0]}`;
    axios.get(url).then(resp => {
      if(resp.data) {
        dispatch({type: 'addProtein', payload: resp.data[0]});
        uploadSelectedDrugs();
      }
    });
  }

  const handleOnCellClick = (params) => {
    if(params.field === 'title') { 
      const url = `${Endpoints.drugbank.drugs}${params.value}?page=${0}`;
      axios.get(url).then(resp => {
        if (resp.data) {
          setModalData(resp.data.items[0]);
        }
      });
      handleOpen();
    }
  };

  // const TableFooter = ({tableName}) => {
  //   return (
  //     <Button variant="outlined" onClick={uploadSelectedDrugs} className="table-footer">
  //       <img style={{paddingRight: '10px'}} src={dtiimage} alt="image"/>
  //       Upload selected Data to {tableName}
  //     </Button>
  //   )
  // }

  //   const CustomPagination = () => {
  //     const { state, apiRef, options } = useGridSelector(apiRef, gridPageSizeSelector);
  //     return (
  //         <TablePagination
  //             count={state.pagination.rowCount}
  //             page={state.pagination.page}
  //             onPageChange={(event, value) => apiRef.current.setPage(value)}
  //             rowsPerPage={options.pageSize}
  //             rowsPerPageOptions={[]}
  //         />
  //     );
  // }

  const drugsColumns = [
    { field: `title`, headerName: 'Drug Name', minWidth: 150, flex: 1,
      renderCell: (params) => (
        <span className='link-btn'>{params.value}</span>
      ),
    },
    {
      field: `metrics['(Search + {}) Publications']`,
      headerName: '(Search + Drug)Publications',
      minWidth: 250,
      valueGetter: (params) => params.row.metrics['(Search + {}) Publications'],
    },
    {
      field: `metrics['{} Publications']`,
      headerName: 'Drug Publications',
      minWidth: 120, flex: 1,
      valueGetter: (params) => params.row.metrics['{} Publications'],
    },
    // {
    //   headerName: 'Options',
    //   minWidth: 50,
    //   flex: 1,
    //   renderCell: () => (
    //     <Button variant="outline" color="primary" size="small" onClick={detailcard}> Detail </Button>
    //   ),
    // }
  ];

  const protienColumns = [
    { field: `title`, headerName: 'Target Name', minWidth: 150, flex: 1 },
    {
      field: `metrics['(Search + {}) Publications']`,
      headerName: '(Search + Target)Publications',
      minWidth: 250,
      valueGetter: (params) => params.row.metrics['(Search + {}) Publications'],
    },
    {
      field: `metrics['{} Publications']`,
      headerName: 'Target Publications',
      minWidth: 120, flex: 1,
      valueGetter: (params) => params.row.metrics['{} Publications'],
    },
  ];

  return (
    <div className="searchDefault">
      <Grid container spacing={2} style={{marginTop: '20px', marginBottom: '20px'}}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="standard-basic"
            value={text}
            onChange={e => setText(e.target.value)}
            variant="standard"
            placeholder="Search for..."
            className="searchEngine-input"
            inputProps={{
              style: {
                height: "41px",
                paddingLeft: '10px'
              },
            }}
          />
        </Grid>
        <Grid item style={{paddingLeft: '0px'}}>
          <Button className='searchEngin-headerbtn btn-white' variant="outlined" onClick={onRun}>Search</Button>
        </Grid>
        <Grid item>
          {
            data && data.result ? <div>
              <Box className="selecteddata_dti" boxShadow={3}>
                <h4 className="heading">Selected data to drug interaction</h4>
                <h4 className="drugs">Drugs</h4>
                {
                  selectionDrugModel.length > 0  ? selectionDrugModel.map(item => {
                    return <Chip key={item} style={{marginLeft: '10px'}} label={item} variant="outlined" />
                  }) : ''
                }
                <h4 className="proteins">Proteins</h4>
                {
                  selectionTargetModel.length > 0  ? selectionTargetModel.map(item => {
                    return <Chip key={item} style={{marginLeft: '10px'}} label={item} variant="outlined" />
                  }) : ''
                }
                <Button className="uploadbtn" variant="outlined" onClick={uploadTargetDrugs}>
                  <img src={dtiimage} alt="image"/>
                  <span className="text">Upload</span>
                </Button>
              </Box>
            </div> : ''
          }
        </Grid>
      </Grid>
      {
        data && data.result ? <div>
          <section id='title-wrapper'>
            <div className='title'>Related Drugs</div>
            <div className='line'></div>
            <div className='line'></div>
          </section>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                  <Typography>Drug Results</Typography>
                </AccordionSummary>
                <AccordionDetails id="style-3" style={{ height: '400px', overflowY: 'auto' }}>
                  {drugs.length > 0 &&
                    <DataGrid
                      rows={drugs}
                      columns={drugsColumns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                      getRowId={(row) => row.title.toLowerCase()}
                      getRowHeight={() => 'auto'}
                      onRowClick={(param) => {
                          drughandleClick(param.row)
                          setClickedRow(param.row.title.toLowerCase())
                        }
                      }
                      disableSelectionOnClick
                      pagination
                      selectionModel={selectionDrugModel}
                      onCellClick={handleOnCellClick}
                      onSelectionModelChange={(ids) => {
                        setSelectionDrugModel(ids);
                      }}
                      getRowClassName={(params) => params.id === clickedRow ? 'selected-bg' : ''}
                    />
                  }
                  {/*<Button variant="outlined" onClick={uploadSelectedDrugs} className="table-footer">*/}
                  {/*  <img style={{ paddingRight: '10px' }} src={dtiimage} alt="image" />*/}
                  {/*  Upload selected Data to Drug Interactions*/}
                  {/*</Button>*/}
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={6}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content" id="panel4a-header">
                  <Typography>Drug Literature</Typography>
                </AccordionSummary>
                <AccordionDetails id="style-3" style={{ height: '400px', overflowY: 'auto' }}>

                  {
                    selecteddrug !== '' ?
                      <p><b>Publications that contain contain the search query and  <span style={{ color: '#5645ba' }}>{selecteddrug}</span></b></p> : ''
                  }
                  <div className="literature-list">
                    {
                      rowdrugs.length > 0 ? <ul>
                        {
                          rowdrugs.map((row) => (
                            <li key={row.pmid}>
                              <a href={row.url} target="_blank">{row.title}</a>
                            </li>
                          ))
                        }
                      </ul>
                        : ''
                    }
                  </div>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
          <section id='title-wrapper'>
            <div className='title'>Related Target Proteins</div>
            <div className='line'></div>
            <div className='line'></div>
          </section>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5a-content" id="panel5a-header">
                  <Typography>Target Protein Results</Typography>
                </AccordionSummary>
                <AccordionDetails id="style-3" style={{ height: '400px', overflowY: 'auto' }}>
                  {
                    targets.length > 0 &&
                    <DataGrid
                      rows={targets}
                      columns={protienColumns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                      getRowId={(row) => row.title.toLowerCase()}
                      getRowHeight={() => 'auto'}
                      hideFooterSelectedRowCount
                      selectionModel={selectionTargetModel}
                      onSelectionModelChange={(selection) => {
                        if (selection.length > 1) {
                          const selectionSet = new Set(selectionTargetModel);
                          const result = selection.filter((s) => !selectionSet.has(s));
                          setSelectionTargetModel(result);
                        }
                      }}
                      onRowClick={(param) => targetshandleClick(param.row)}
                    />
                  }
                {/*<Button variant="outlined" onClick={uploadTargetDrugs} className="table-footer">*/}
                {/*  <img style={{paddingRight: '10px'}} src={dtiimage} alt="image"/>*/}
                {/*  Upload selected Data to Drug Interactions*/}
                {/*</Button>*/}
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={6}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel6a-content" id="panel6a-header">
                  <Typography>Target Literature</Typography>
                </AccordionSummary>
                <AccordionDetails id="style-3" style={{ height: '400px', overflowY: 'auto' }}>
                  {
                    selectedtarget !== '' ? <p><b>Publications that contain contain the search query and  <span style={{ color: '#5645ba' }}>{selectedtarget}</span></b></p> : ''
                  }
                  <div className="literature-list">
                    {
                      rowtargets.length > 0 ? <ul>
                        {
                          rowtargets.map((row) => (
                            <li key={row.pmid}>
                              <a href={row.url} target="_blank">{row.title}</a>
                            </li>
                          ))
                        }
                      </ul> : ''
                    }
                  </div>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </div> : Loadingresult === true ? <div style={{height: '500px', position: 'relative', }}> <CircularProgressComponent /> </div>: ''
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
        <IconButton aria-label="close" onClick={handleClose} sx={{position: "absolute", top: 5, right: 5}} size="large">
          <CloseIcon />
        </IconButton>
          <Box>
          { modalData  ? <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            {/* {modalDetails && modalDetails.name} */}
            {modalData.name}{modalData.calculated_properties ? <span> {modalData.calculated_properties['Molecular Formula']} </span>: ''}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalData.clinical_description}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {
              modalData.calculated_properties ? <span>LogP: {modalData.calculated_properties.logP} </span>: ''
            }
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {
              modalData.calculated_properties ? <span>Molecular Weight: {modalData.calculated_properties['Molecular Weight']} </span>: ''
            }
          </Typography>

          </div> : 'Loading'
          }
          </Box>
        </Box>
      </Modal>
    </div>
  )
}