import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid } from "@mui/x-data-grid";
import dtiimage from "../../../assets/img/table-dti-icon.svg";
import * as PropTypes from "prop-types";

const drugsColumns = [
  { field: `title`, headerName: 'Drug Name', minWidth: 150, flex: 1,
    renderCell: (params) => (
      <span className='link-btn'>{params.value}</span>
    ),
  },
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
  }
];
export function DrugResults(props) {
  return (
    <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel3a-content" id="panel3a-header">
      <Typography>Drug Results</Typography>
    </AccordionSummary>
    <AccordionDetails id="style-3" style={{height: "400px", overflowY: "auto"}}>
      {props.drugs.length > 0 &&
        <DataGrid
          rows={props.drugs}
          columns={drugsColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row) => row.title.toLowerCase()}
          getRowHeight={() => 'auto'}
          onRowClick={props.onRowClick}
          disableSelectionOnClick
          pagination
          selectionModel={props.selectionModel}
          onCellClick={props.onCellClick}
          onSelectionModelChange={props.onSelectionModelChange}
          getRowClassName={props.rowClassName}
        />
      }
      {/*onClick={uploadSelectedDrugs} for button */}
      <Button variant="outlined" onClick={props.onClick} className="table-footer uploadbtn">
        <img style={{paddingRight: "10px"}} src={dtiimage} alt="image"/>
        Upload selected drug
      </Button>
    </AccordionDetails>
  </Accordion>
  );
}

DrugResults.propTypes = {
  drugs: PropTypes.any,
  onRowClick: PropTypes.func,
  selectionModel: PropTypes.arrayOf(PropTypes.any),
  onCellClick: PropTypes.func,
  onSelectionModelChange: PropTypes.func,
  rowClassName: PropTypes.func,
  onClick: PropTypes.func
};
