import Accordion from '@mui/material/Accordion';
import Grid from '@mui/material/Grid';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useApiCall} from "../../infrastructure/hooks/useApiCall";
import { useEffect, useState } from 'react';


export const SearchFeature = (text) => {
  const [rowtargets, setrowTargets] = useState([]);
  const [rowdrugs, setrowDrugs] = useState([]);
  const [selecteddrug, setselecteddrug] = useState('');
  const [selectedtarget, setselectedtarget] = useState('');
  const url = `https://api.prepaire.com/drug-search`;
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  const drugs = data && data.result && 'drugs' in data.result ?  Object.entries(data.result.drugs).map(([_key, _value]) => ({'title': _key, 'counter':_value.counter, 'pmids': _value.item_pmids, 'metrics': _value.metrics })) : []
  const targets = data && data.result && 'targets' in data.result ? Object.entries(data.result.targets).map(([_key, _value]) => ({ 'title': _key, 'counter':_value.counter, 'pmids': _value.item_pmids, 'metrics': _value.metrics  })) : [];

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

  return(
    <div className="searchDefault">
      <h2>Results</h2>
      {/*<section id='title-wrapper'>*/}
      {/*  <div className='title'>Drug Synthesis</div>*/}
      {/*  <div className='line'></div>*/}
      {/*  <div className='line'></div>*/}
      {/*</section>*/}
      {/*  <Grid container spacing={2}>*/}
      {/*    <Grid item xs={4}>*/}
      {/*      <Accordion>*/}
      {/*        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">*/}
      {/*          <Typography>Text2XDl finded!</Typography>*/}
      {/*        </AccordionSummary>*/}
      {/*        <AccordionDetails>*/}

      {/*        </AccordionDetails>*/}
      {/*      </Accordion>*/}
      {/*    </Grid>*/}
      {/*    <Grid item xs={8}>*/}
      {/*      <Accordion>*/}
      {/*        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">*/}
      {/*          <Typography>Drug Synthesis Translated to XDL Code</Typography>*/}
      {/*        </AccordionSummary>*/}
      {/*        <AccordionDetails>*/}

      {/*        </AccordionDetails>*/}
      {/*      </Accordion>*/}
      {/*    </Grid>*/}
      {/*  </Grid>*/}

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
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {/*<TableCell></TableCell>*/}
                      <TableCell align="right">Drug Name</TableCell>
                      <TableCell align="right">(Search + Drug)Publications</TableCell>
                      <TableCell align="right">Drug Publications</TableCell>
                    </TableRow>
                  </TableHead>
                  {
                    drugs.length > 0 ? <TableBody>
                      {
                        drugs.map((row) => (
                        <TableRow onClick={() => {drughandleClick(row)}} key={row.title} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          {/*<TableCell component="th" scope="row">{row.id}</TableCell>*/}
                          <TableCell align="right">{row.title}</TableCell>
                          <TableCell align="right">{row.metrics['(Search + {}) Publications']}</TableCell>
                          <TableCell align="right">{row.metrics['{} Publications']}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody> : ''
                  }
                </Table>
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
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/*<TableCell></TableCell>*/}
                    <TableCell align="right">Target Name</TableCell>
                    <TableCell align="right">(Search + Target)Publications</TableCell>
                    <TableCell align="right">Target Publications</TableCell>
                  </TableRow>
                </TableHead>
                {
                  targets.length > 0 ? <TableBody>
                    {
                      targets.map((row) => (
                        <TableRow onClick={() => {targetshandleClick(row)}} key={row.title} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          {/*<TableCell component="th" scope="row">{row.id}</TableCell>*/}
                          <TableCell align="right">{row.title}</TableCell>
                          <TableCell align="right">{row.metrics['(Search + {}) Publications']}</TableCell>
                          <TableCell align="right">{row.metrics['{} Publications']}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody> : ''
                }
              </Table>
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
                selectedtarget !== '' ?
                  <p><b>Publications that contain contain the search query and  <span style={{color: '#5645ba'}}>{selectedtarget}</span></b></p> : ''
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
                    </ul>
                    : ''
                }
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  )
}