import {Accordion, AccordionDetails, AccordionSummary, Typography, useTheme} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as PropTypes from "prop-types";
import { useCallback } from "react";

export function DrugLiterature(props) {
  const theme = useTheme();
  const renderItem = useCallback((row) => (
    <li key={row.title}>
      <a href={row.url} target="_blank" rel="noreferrer">{row.title}</a>
    </li>
  ), []);
  if (!props.drug) {
    return null;
  }
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel4a-content" id="panel4a-header">
        <Typography>Literature</Typography>
      </AccordionSummary>
      <AccordionDetails id="style-3" style={{height: "400px", overflowY: "auto"}}>

        {
          props.drug.name !== "" &&
          <p><b>Publications that contain contain the search query and <span
            style={{color: theme.palette.primary.main}}>{props.drug.name}</span></b></p>
        }
        <div className="literature-list">
          {props.drug.publications.length > 0 && <ul>{props.drug.publications.map(renderItem)}</ul>}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

DrugLiterature.propTypes = {
  drug: PropTypes.shape({
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
