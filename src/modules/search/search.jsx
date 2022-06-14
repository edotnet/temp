import Accordion from '@mui/material/Accordion';
import Grid from '@mui/material/Grid';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { useEffect, useState } from 'react';
import { DataGrid, GridValueGetterParams } from '@mui/x-data-grid';
import Link from '@mui/material/Link';
import { useDashboardContext } from "../../modules/dashboard/context/useDashboarContext";
import { useNavigate } from "react-router-dom";
import { Endpoints } from "../../config/Consts";
import axios from 'axios';
import Button from '@mui/material/Button';
import { CircularProgressComponent } from "../../infrastructure/components/CircularProgress.component";
import dtiimage from '../../assets/img/table-dti-icon.svg';

export const SearchFeature = (text) => {
  const [rowtargets, setrowTargets] = useState([]);
  const [rowdrugs, setrowDrugs] = useState([]);
  const [selecteddrug, setselecteddrug] = useState('');
  const [selectedtarget, setselectedtarget] = useState('');
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [rowClick, setRowClick] = useState(false);
  const url = `https://api.prepaire.com/drug-search`;
  const { loading, data, error, fetch } = useApiCall(url, 'POST', null, false);
  const drugs = data && data.result && 'drugs' in data.result ? Object.entries(data.result.drugs).map(([_key, _value]) => ({ 'title': _key, 'counter': _value.counter, 'pmids': _value.item_pmids, 'metrics': _value.metrics })) : []
  const targets = data && data.result && 'targets' in data.result ? Object.entries(data.result.targets).map(([_key, _value]) => ({ 'title': _key, 'counter': _value.counter, 'pmids': _value.item_pmids, 'metrics': _value.metrics })) : [];
  const defaultSelectRow = text.name.toLowerCase();
  const [selectionDrugModel, setSelectionDrugModel] = useState([`${defaultSelectRow}`]);
  const [selectionTargetModel, setSelectionTargetModel] = useState([]);

  const { state, dispatch } = useDashboardContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(url, 'POST', { drug: text.name, filter1: true, pmids: true });

    if (drugs.length > 0) {
      const defaultRow = drugs.filter((row) => row.title.toLowerCase() === defaultSelectRow);
      viewLiterature(defaultRow)
    }
  }, []);

  function drughandleClick(data) {
    setselecteddrug(data.title);
    setrowDrugs(data.pmids);
  }

  function viewLiterature(data) {
    if (data) {
      setTimeout(() => {
        setselecteddrug(data[0].title);
        setrowDrugs(data[0].pmids);
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
    const url = `${Endpoints.drugbank.targets}${selectedtarget}`;
    axios.get(url).then(resp => {
      if(resp.data) {
        dispatch({type: 'addProtein', payload: resp.data[0]});
        uploadSelectedDrugs();
        navigate("/dashboard");
      }
    });
  }

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
    { field: `title`, headerName: 'Drug Name', minWidth: 150, flex: 1 },
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
      {
        drugs.length > 0 ? <div>
          <h2>Results</h2>
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
                        // setRowClick(!rowClick)
                      }
                      }
                      disableSelectionOnClick
                      pagination
                      selectionModel={selectionDrugModel}
                      onSelectionModelChange={(ids) => {
                        setSelectionDrugModel(ids);
                        const selectedIDs = new Set(ids);
                        const selectedRows = drugs.filter((row) => selectedIDs.has(row.title.toLowerCase()));
                        setSelectedDrugs(selectedRows);

                        const lastRowID = [...selectedIDs].pop()
                        const selectedRowData = drugs.filter((row) => row.title.toLowerCase() === lastRowID);
                        viewLiterature(selectedRowData)
                      }}

                    // getRowClassName={(params) => rowClick ? 'selected-bg' : ''}
                    />
                  }
                  <Button variant="outlined" onClick={uploadSelectedDrugs} className="table-footer">
                    <img style={{ paddingRight: '10px' }} src={dtiimage} alt="image" />
                    Upload selected Data to Drug Interactions
                  </Button>
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
            <div className='title'>Related Target Protiens</div>
            <div className='line'></div>
            <div className='line'></div>
          </section>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5a-content" id="panel5a-header">
                  <Typography>Target Protien Results</Typography>
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
                      getRowId={(row) => row.counter}
                      getRowHeight={() => 'auto'}
                      hideFooterSelectedRowCount
                      selectionModel={selectionTargetModel}
                      onSelectionModelChange={(selection) => {
                        if (selection.length > 1) {
                          const selectionSet = new Set(selectionTargetModel);
                          const result = selection.filter((s) => !selectionSet.has(s));
                          setSelectionTargetModel(result);
                        } else {
                          setSelectionTargetModel(selection);
                        }
                      }}
                      onRowClick={(param) => targetshandleClick(param.row)}
                    />
                  }
                <Button variant="outlined" onClick={uploadTargetDrugs} className="table-footer">
                  <img style={{paddingRight: '10px'}} src={dtiimage} alt="image"/>
                  Upload selected Data to Drug Interactions
                </Button>
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
        </div> : <CircularProgressComponent />
      }
    </div>
  )
}