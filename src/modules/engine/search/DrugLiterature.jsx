import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as PropTypes from "prop-types";

export function DrugLiterature(props) {
  const renderItem = (row) => (
    <li key={row.pmid}>
      <a href={row.url} target="_blank">{row.title}</a>
    </li>
  );
  return (
    <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel4a-content" id="panel4a-header">
      <Typography>Drug Literature</Typography>
    </AccordionSummary>
    <AccordionDetails id="style-3" style={{height: "400px", overflowY: "auto"}}>

      {
        props.selecteddrug !== "" &&
          <p><b>Publications that contain contain the search query and <span
            style={{color: "#5645ba"}}>{props.selecteddrug}</span></b></p>
      }
      <div className="literature-list">
        {props.rowdrugs.length > 0 && <ul>{props.rowdrugs.map(renderItem)}</ul>}
      </div>
    </AccordionDetails>
  </Accordion>
  );
}

DrugLiterature.propTypes = {
  selecteddrug: PropTypes.string,
  rowdrugs: PropTypes.arrayOf(PropTypes.any),
  callbackfn: PropTypes.func
};
