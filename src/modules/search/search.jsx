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
import {useApiCall} from "../../infrastructure/hooks/useApiCall";
import { useEffect, useState } from 'react';
import { DataGrid, GridValueGetterParams  } from '@mui/x-data-grid';
import Link from '@mui/material/Link';
import { useDashboardContext } from "../../modules/dashboard/context/useDashboarContext";
import {useNavigate} from "react-router-dom";
import {Endpoints} from "../../config/Consts";
import axios from 'axios';
import Button from '@mui/material/Button';
import {CircularProgressComponent} from "../../infrastructure/components/CircularProgress.component";
import dtiimage from '../../assets/img/table-dti-icon.svg';

export const SearchFeature = (text) => {
  const [rowtargets, setrowTargets] = useState([]);
  const [rowdrugs, setrowDrugs] = useState([]);
  const [selecteddrug, setselecteddrug] = useState('');
  const [selectedtarget, setselectedtarget] = useState('');
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const url = `https://api.prepaire.com/drug-search`;
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  const drugs = data && data.result && 'drugs' in data.result ?  Object.entries(data.result.drugs).map(([_key, _value]) => ({'title': _key, 'counter':_value.counter, 'pmids': _value.item_pmids, 'metrics': _value.metrics })) : []
  const targets = data && data.result && 'targets' in data.result ? Object.entries(data.result.targets).map(([_key, _value]) => ({ 'title': _key, 'counter':_value.counter, 'pmids': _value.item_pmids, 'metrics': _value.metrics  })) : [];

  const {state, dispatch} = useDashboardContext();
  const navigate = useNavigate();

  useEffect(
    ()=>{
      fetch(url, 'POST', {drug: text.name, filter1: true, pmids: true})
    },[]
  );

  function drughandleClick(data){
    setselecteddrug(data.title);
    setrowDrugs(data.pmids);
  }

  function targetshandleClick(data) {
    setselectedtarget((data.title))
    setrowTargets(data.pmids);
  }


  const uploadSelectedDrugs = async () => {
    selectedDrugs.forEach(drug => {
      const url = `${Endpoints.drugbank.drugs}${drug.title}?page=${0}`;
      axios.get(url).then(resp => {
        if(resp.data) {
          for(let i = 0; i<resp.data.items.length; i++) {
            if(resp.data.items[i].name === drug.title) {
              dispatch({type: 'addMolecule', payload: resp.data.items[i]})
              return;
            }
          }
        }
      })
    });
    navigate("/dashboard");
  }

  const TableFooter = ({tableName}) => {
    return (
      <Button variant="outlined" onClick={uploadSelectedDrugs} className="table-footer">
        <img style={{paddingRight: '10px'}} src={dtiimage} alt="image"/>
        Upload selected Data to {tableName}
      </Button>
    )
  }

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
    { field: '' , headerName: '', width: 70 },
    { field: `title`, headerName: 'Drug Name', width: 150 },
    {
      field: `metrics['(Search + {}) Publications']`,
      headerName: '(Search + Drug)Publications',
      width: 250,
      valueGetter: (params) => params.row.metrics['(Search + {}) Publications'],
    },
    {
      field: `metrics['{} Publications']`,
      headerName: 'Drug Publications',
      width: 120,
      valueGetter: (params) => params.row.metrics['{} Publications'],
    },
  ];

  const protienColumns = [
    { field: '' , headerName: '', width: 70 },
    { field: `title`, headerName: 'Target Name', width: 150 },
    {
      field: `metrics['(Search + {}) Publications']`,
      headerName: '(Search + Target)Publications',
      width: 250,
      valueGetter: (params) => params.row.metrics['(Search + {}) Publications'],
    },
    {
      field: `metrics['{} Publications']`,
      headerName: 'Target Publications',
      width: 120,
      valueGetter: (params) => params.row.metrics['{} Publications'],
    },
  ];

  return(
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
                  <AccordionDetails id="style-3" style={{height: '400px', overflowY: 'auto'}}>
                    {drugs.length > 0 &&
                      <DataGrid
                        rows={drugs}
                        columns={drugsColumns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        getRowId={(row) => row.counter}
                        getRowHeight={() => 'auto'}
                        onRowClick={(param) => drughandleClick(param.row)}
                        pagination
                        // components={{
                        //   Footer: TableFooter,
                        // }}
                        // componentsProps={{
                        //   footer: { tableName : "<<Drug interaction>>" },
                        // }}
                        onSelectionModelChange={(ids) => {
                          const selectedIDs = new Set(ids);
                          const selectedRows = drugs.filter((row) =>
                            selectedIDs.has(row.counter)
                          );
                          setSelectedDrugs(selectedRows);
                        }}
                      />
                    }
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={6}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content" id="panel4a-header">
                    <Typography>Drug Literature</Typography>
                  </AccordionSummary>
                  <AccordionDetails id="style-3" style={{height: '400px', overflowY: 'auto'}}>
                    {
                      selecteddrug !== '' ?
                        <p><b>Publications that contain contain the search query and  <span style={{color: '#5645ba'}}>{selecteddrug}</span></b></p> : ''
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
              <AccordionDetails id="style-3" style={{height: '400px', overflowY: 'auto'}}>
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
                      onRowClick={(param) => targetshandleClick(param.row)}
                    />
                  }
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={6}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel6a-content" id="panel6a-header">
                  <Typography>Target Literature</Typography>
                </AccordionSummary>
                <AccordionDetails id="style-3" style={{height: '400px', overflowY: 'auto'}}>
                  {
                    selectedtarget !== '' ? <p><b>Publications that contain contain the search query and  <span style={{color: '#5645ba'}}>{selectedtarget}</span></b></p> : ''
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
        </div> : <CircularProgressComponent/>
      }
    </div>
  )
}