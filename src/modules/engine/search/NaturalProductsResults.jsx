import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid } from "@mui/x-data-grid";
import dtiimage from "../../../assets/img/table-dti-icon.svg";
import * as PropTypes from "prop-types";
import { Endpoints } from "../../../config/Consts";
import axios from "axios";
import {api} from '../../../infrastructure/api/instance';
import { useDashboardContext } from "../../dashboard/context/useDashboarContext";

const naturalProductsColumns = [
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
export function NaturalProductsResults(props) {
  const {state, dispatch} = useDashboardContext();

  const handleOnCellClick = (params, e) => {
    if (params.field === 'title') {
      const url = `${Endpoints.drugbank.naturalProducts}${params.value}?page=${0}`;
      api.get(url).then(resp => {
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
      <Typography>Natural Products</Typography>
    </AccordionSummary>
    <AccordionDetails id="style-3" style={{height: "400px", overflowY: "auto"}}>
      {props.naturalProducts.length > 0 &&
        <DataGrid
          rows={[...props.naturalProducts].sort((a, b) => b.metrics.ranking_score - a.metrics.ranking_score)}
          columns={naturalProductsColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row) => row.title.toLowerCase()}
          getRowHeight={() => 'auto'}
          onRowClick={props.onRowClick}
          disableSelectionOnClick
          pagination
          selectionModel={props.selectionModel}
          onCellClick={handleOnCellClick}
          onSelectionModelChange={props.onSelectionModelChange}
          getRowClassName={props.rowClassName}
        />
      }
      {/*onClick={uploadSelectedDrugs} for button */}
      <Button variant="outlined" onClick={props.onClick} className="table-footer uploadbtn">
        <img style={{paddingRight: "10px"}} src={dtiimage} alt="image"/>
        Upload selected naturalProduct
      </Button>
    </AccordionDetails>
  </Accordion>
  );
}

NaturalProductsResults.propTypes = {
  naturalProducts: PropTypes.any,
  onRowClick: PropTypes.func,
  selectionModel: PropTypes.arrayOf(PropTypes.any),
  onCellClick: PropTypes.func,
  onSelectionModelChange: PropTypes.func,
  rowClassName: PropTypes.func,
  onClick: PropTypes.func
};
