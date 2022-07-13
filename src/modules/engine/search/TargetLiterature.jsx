import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as PropTypes from "prop-types";

export function TargetLiterature(props) {
  return <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel6a-content" id="panel6a-header">
      <Typography>Target Literature</Typography>
    </AccordionSummary>
    <AccordionDetails id="style-3" style={{height: "400px", overflowY: "auto"}}>
      {
        props.selectedtarget !== "" ? <p><b>Publications that contain contain the search query and <span
          style={{color: "#5645ba"}}>{props.selectedtarget}</span></b></p> : ""
      }
      <div className="literature-list">
        {
          props.rowtargets.length > 0 ? <ul>
            {
              props.rowtargets.map((row) => (
                <li key={row.pmid}>
                  <a href={row.url} target="_blank">{row.title}</a>
                </li>
              ))
            }
          </ul> : ""
        }
      </div>
    </AccordionDetails>
  </Accordion>;
}

TargetLiterature.propTypes = {
  selectedtarget: PropTypes.string,
  rowtargets: PropTypes.arrayOf(PropTypes.any),
  callbackfn: PropTypes.func
};
