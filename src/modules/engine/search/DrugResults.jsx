import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  AvatarGroup, Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid } from "@mui/x-data-grid";
import dtiimage from "../../../assets/img/table-dti-icon.svg";
import * as PropTypes from "prop-types";
import { Endpoints } from "../../../config/Consts";
import axios from "axios";
import {Score} from '../../../infrastructure/components/Score';
import { useDashboardContext } from "../../dashboard/context/useDashboarContext";
import {encodeQuery} from "../../../infrastructure/hooks/useApiCall";

const drugsColumns = [
  { field: `name`, headerName: 'Name', minWidth: 150, flex: 1,
    renderCell: (params) => (<Box sx={{display: 'flex', justifyContent: 'space-between', width: '90%'}}>
      <span className='link-btn'>{params.value}</span>
        <AvatarGroup max={2} sx={{alignSelf: 'flex-end'}}>
          {params.row.articles_item_only === 0 && <Avatar alt="Research" sx={{bgcolor: 'brown', width: 35, height: 35, color: 'white'}}>R</Avatar>}
        </AvatarGroup>
      </Box>
    ),
  },
  {
    field: `articles_search_item`,
    headerName: '(Search + Drug)Publications',
    minWidth: 200,
    hide: true,
  },
  {
    field: `articles_item_only`,
    headerName: 'Drug Publications',
    minWidth: 120, flex: 1,
    hide: true,
  },
  {
    field: 'f_score',
    headerName: 'Score',
    minWidth: 120, flex: 1,
    renderCell: (params) => (<Score score={params.value}/>)
  },

];
export function DrugResults(props) {
  const {state, dispatch} = useDashboardContext();

  const handleOnCellClick = (params, e) => {
    if (params.field === 'name') {
      const url = `${Endpoints.drugbank.drugs}${encodeQuery(params.value)}?exact=1`;
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
      {props.title}
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
  onClick: PropTypes.func,
  title: PropTypes.node,
};
