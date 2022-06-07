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

function createData(id, DrugName, Publications, DrugPublications) {
  return { id, DrugName, Publications,  DrugPublications};
}

const rows = [
  createData(1, 'Umifenovir', 67, 302 ),
  createData(2, 'Sarilumab', 18, 287 ),
  createData(3, 'Remdesivir', 338, 2731,),
  createData(4, 'Peramivir', 26, 501 ),
  createData(5, 'Nitazoxanide', 32, 855 ),
];
export const SearchFeature = (text) => {
  const [targets, setTargets] = useState('');

  const url = `https://api.prepaire.com/drug-search`;
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  if(data) {
    if(data.result.targets) {
      let target_array = Object.entries(data.result.targets).map((e) => ( { [e[0]]: e[1] } ));
      console.log('targets', target_array);
    }
    if(data.result['drugs']) {
      let drugs_array = Object.entries(data.result.drugs).map((e) => ( { [e[0]]: e[1] } ));
      console.log('drugs', drugs_array);
    }
  } else {
    console.log('null');
  }
  useEffect(
    ()=>{
      fetch(url, 'POST', {drug: text.name, filter1: true, pmids: true})
    },[]
  );


  return(
    <div className="searchDefault">
      <h2>Results</h2>
      <section id='title-wrapper'>
        <div className='title'>Drug Synthesis</div>
        <div className='line'></div>
        <div className='line'></div>
      </section>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Text2XDl finded!</Typography>
              </AccordionSummary>
              <AccordionDetails>

              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={8}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                <Typography>Drug Synthesis Translated to XDL Code</Typography>
              </AccordionSummary>
              <AccordionDetails>

              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
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
              <AccordionDetails>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {/*<TableCell></TableCell>*/}
                      {/*<TableCell align="right">Drug Name</TableCell>*/}
                      {/*<TableCell align="right">(Search + Drug)Publications</TableCell>*/}
                      {/*<TableCell align="right">Drug Publications</TableCell>*/}
                      <TableCell></TableCell>
                      <TableCell align="right">Drug Name</TableCell>
                      <TableCell align="right">(Search + Drug)Publications</TableCell>
                      <TableCell align="right">Drug Publications</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      rows.map((row) => (
                      <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell align="right">{row.DrugName}</TableCell>
                        <TableCell align="right">{row.Publications}</TableCell>
                        <TableCell align="right">{row.DrugPublications}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={6}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content" id="panel4a-header">
                <Typography>Drug Literature</Typography>
              </AccordionSummary>
              <AccordionDetails>

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
            <AccordionDetails>

            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={6}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel6a-content" id="panel6a-header">
              <Typography>Target Literature</Typography>
            </AccordionSummary>
            <AccordionDetails>

            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  )
}