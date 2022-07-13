import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CopyComponent } from "../../../infrastructure/components/Copy.component";
import * as PropTypes from "prop-types";
import beautify from "xml-beautifier";

function NewlineText(value, ind) {
  const text = value;
  const newText = text.split('\n').map(str => <p key={ind}>{str}</p>);
  return newText;
}

const Details = (props) => {
  if (!props.pdfList.length) {
    return "No pdf";
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={4} sx={{position: "relative",}}>
        <h4>Synthesis Process</h4>
        <Box sx={{position: "absolute", right: 10, top: 30}}>
          <CopyComponent text={props.selectedPdfObj.text}/>
        </Box>
        <div className="process" id="style-2">
          {!!props.selectedPdfObj && NewlineText(props.selectedPdfObj.text)}
        </div>
      </Grid>
      <Grid item xs={8} sx={{position: "relative"}}>
        <h4>Synthesis XDL</h4>
        <Box sx={{position: "absolute", right: 10, top: 30}}>
          <CopyComponent text={props.selectedPdfObj.xml}/>
        </Box>
        <div className="synthesis" id="style-2">
          <pre>
            {!!props.selectedPdfObj && beautify(props.selectedPdfObj.xml)}
          </pre>
        </div>
      </Grid>
    </Grid>);
}

Details.propTypes = {
  selectedPdfObj: PropTypes.string,
}

export function DrugSynthesisToXDL(props) {
  return <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel5a-content" id="panel5a-header">
      <Typography>Drug Synthesis Translated to XDL Code</Typography>
    </AccordionSummary>
    <AccordionDetails id="style-3" style={{height: "500px", overflow: "hidden", paddingBottom: "30px"}}>
      <Details {...props}/>
    </AccordionDetails>
  </Accordion>;
}

DrugSynthesisToXDL.propTypes = {
  pdfList: PropTypes.arrayOf(PropTypes.any),
  selectedPdfObj: PropTypes.string,
};
