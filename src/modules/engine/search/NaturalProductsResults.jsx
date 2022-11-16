import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid } from "@mui/x-data-grid";
import dtiimage from "../../../assets/img/table-dti-icon.svg";
import * as PropTypes from "prop-types";
import { Endpoints } from "../../../config/Consts";
import axios from "axios";
import {api} from '../../../infrastructure/api/instance';
import {Score} from '../../../infrastructure/components/Score';
import {encodeQuery} from '../../../infrastructure/hooks/useApiCall';
import { useDashboardContext } from "../../dashboard/context/useDashboarContext";

const naturalProductsColumns = [
  { field: `name`, headerName: 'Drug Name', minWidth: 150, flex: 1,
    renderCell: (params) => (<Box sx={{display: 'flex', justifyContent: 'space-between', width: '90%'}}>
        <span className='link-btn'>{params.value}</span>
        <AvatarGroup max={2} sx={{alignSelf: 'flex-end'}}>
          {params.row.source === 'cannabis' && <Avatar alt="Cannabis" sx={{bgcolor: 'green', width: 35, height: 35}}>C</Avatar>}
          {params.row.articles_item_only === 0 && <Avatar alt="Research" sx={{bgcolor: 'brown', width: 35, height: 35, color: 'white'}}>R</Avatar>}
        </AvatarGroup>
      </Box>
    ),
  },
  {
    field: `articles_search_item`,
    headerName: '(Search + Drug)Publications',
    minWidth: 250,
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
  }
];
export function NaturalProductsResults(props) {
  const {state, dispatch} = useDashboardContext();

  const handleOnCellClick = (params, e) => {
    if (params.field === 'name') {
      const url = `${Endpoints.naturalProducts.query}${encodeQuery(params.value)}?exact=1`;
      api.get(url).then(resp => {
        if (resp.data) {
          const molecule = {
            name: resp.data.items[0].cn,
            drugbank_id: resp.data.items[0].UNPD_ID,
            calculated_properties: {
              SMILES: resp.data.items[0].SMILES,
              ...resp.data.items[0],
              'Moleculer Formula': resp.data.items[0].mf,
            },
            toxicity: resp.data.items[0].toxicity,
            coordinates:{
              x: e.clientX,
              y: e.clientY,
            }
          };
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
          rows={[...props.naturalProducts].sort((a, b) => b.f_score - a.f_score)}
          columns={naturalProductsColumns}
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
