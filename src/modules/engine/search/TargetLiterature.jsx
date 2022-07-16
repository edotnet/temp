import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as PropTypes from "prop-types";
import { useCallback } from "react";

export function TargetLiterature(props) {

  const renderItem = useCallback((row) => (
    <li key={row.pmid}>
      <a href={row.url} target="_blank" rel="noreferrer">{row.title}</a>
    </li>
  ), []);
  if (!props.target) {
    return null;
  }
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel6a-content" id="panel6a-header">
        <Typography>Target Literature</Typography>
      </AccordionSummary>
      <AccordionDetails id="style-3" style={{height: "400px", overflowY: "auto"}}>
        {
          props.target.title !== "" && <p><b>Publications that contain contain the search query and <span
            style={{color: "#5645ba"}}>{props.target.title}</span></b></p>
        }
        <div className="literature-list">
          {props.target.pmids.length > 0 && <ul>{props.target.pmids.map(renderItem)}</ul>}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

TargetLiterature.propTypes = {
  target: PropTypes.shape({
    title: PropTypes.string,
    counter: PropTypes.number,
    pmids: PropTypes.arrayOf(PropTypes.shape({
      db_name: PropTypes.string,
      has_pdf: PropTypes.bool,
      pdf_url: PropTypes.string,
      pmid: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
    })),
    metrics: PropTypes.any,
  })
};
