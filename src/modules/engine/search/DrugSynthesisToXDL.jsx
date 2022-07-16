import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CopyComponent } from "../../../infrastructure/components/Copy.component";
import * as PropTypes from "prop-types";
import beautify from "xml-beautifier";
import { Endpoints } from "../../../config/Consts";
import axios from "axios";
import { memo } from "react";

function NewlineText(value, ind) {
  return value.split('\n').map(str => <p key={ind}>{str}</p>);
}

const downloadpdf = (pdf) => () => {
  const url = Endpoints.pdf.download
  axios.get(`${url}${pdf}`).then(resp => {
    if (resp.data) {
      window.open(resp.data.url, '_blank');
    }
  });
}

const Details = memo((props) => {
  if (!props.pdfObj) {
    return <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>Select a PDF</Box>;
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={4} sx={{position: "relative",}}>
        <h4>Synthesis Process</h4>
        <Box sx={{position: "absolute", right: 10, top: 30}}>
          <CopyComponent text={props.pdfObj.text}/>
        </Box>
        <div className="process" id="style-2">
          {NewlineText(props.pdfObj.text)}
        </div>
      </Grid>
      <Grid item xs={8} sx={{position: "relative"}}>
        <h4>Synthesis XDL</h4>
        <Box sx={{position: "absolute", right: 10, top: 30}}>
          <CopyComponent text={props.pdfObj.xml}/>
        </Box>
        <div className="synthesis" id="style-2">
          <pre>
            {beautify(props.pdfObj.xml)}
          </pre>
        </div>
      </Grid>
    </Grid>);
})

Details.propTypes = {
  pdfObj: PropTypes.string,
}

export function DrugSynthesisToXDL(props) {
  return (
    <>
      {
        props.pdfObj ?
          <p>Please download the pdf <a style={{'color': '#6E54C2', 'cursor': 'pointer', fontWeight: 'bold'}}
                                        onClick={downloadpdf(props.pdfObj.filePath)}>{props.pdfObj.title}</a></p> : ''
      }
    <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel5a-content" id="panel5a-header">
      <Typography>Drug Synthesis Translated to XDL Code</Typography>
    </AccordionSummary>
    <AccordionDetails id="style-3" style={{height: "500px", overflow: "hidden", paddingBottom: "30px"}}>
      <Details {...props}/>
    </AccordionDetails>
  </Accordion>
      </>
  );
}

DrugSynthesisToXDL.propTypes = {
  pdfObj: PropTypes.any,
};
