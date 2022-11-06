import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid } from "@mui/x-data-grid";
import dtiimage from "../../../assets/img/table-dti-icon.svg";
import * as PropTypes from "prop-types";
import { Endpoints } from "../../../config/Consts";
import axios from "axios";
import {Score} from '../../../infrastructure/components/Score';
import { useDashboardContext } from "../../dashboard/context/useDashboarContext";

const drugsColumns = [
  { field: `name`, headerName: 'Drug Name', minWidth: 150, flex: 1,
    renderCell: (params) => (
      <span className='link-btn'>{params.value}</span>
    ),
  },
  {
    field: `articles_search_item`,
    headerName: '(Search + Drug)Publications',
    minWidth: 200,
  },
  {
    field: `articles_item_only`,
    headerName: 'Drug Publications',
    minWidth: 120, flex: 1,
  },
  {
    field: 'f_score',
    headerName: 'F-Score',
    minWidth: 120, flex: 1,
    renderCell: (params) => (<Score score={params.value}/>)
  }
];
export function DrugResults(props) {
  const {state, dispatch} = useDashboardContext();

  const handleOnCellClick = (params, e) => {
    if (params.field === 'title') {
      const url = `${Endpoints.drugbank.drugs}${params.value}?page=${0}`;
      axios.get(url).then(resp => {
        if (resp.data) {
          const molecule = resp.data.items[0];
          molecule.coordinates = {
            x: e.clientX,
            y: e.clientY,
          }
          dispatch({type: 'selectMolecule', payload: molecule});
        }
      });
    }
  };
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
          getRowId={(row) => row.name.toLowerCase()}
          getRowHeight={() => 'auto'}
          onRowClick={props.onRowClick}
          disableSelectionOnClick
          pagination
          selectionModel={props.selectionModel}
          onCellClick={handleOnCellClick}
          onSelectionModelChange={props.onSelectionModelChange}
          getRowClassName={props.rowClassName}
          initialState={{
            sorting: {
              sortModel: [{ field: 'f_score', sort: 'desc' }],
            },
          }}
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
