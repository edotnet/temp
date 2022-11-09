import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Typography} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import axios from 'axios';
import * as PropTypes from 'prop-types';
import {useState} from 'react';
import dtiimage from '../../../assets/img/table-dti-icon.svg';
import {Endpoints} from '../../../config/Consts';
import {Score} from '../../../infrastructure/components/Score';
import {encodeQuery} from '../../../infrastructure/hooks/useApiCall';
import {ProteinModal} from './ProteinModal';

const proteinColumns = [
  {
    field: `name`, headerName: 'Target Name', minWidth: 150, flex: 1,
    renderCell: (params) => (
      <span className="link-btn">{params.value}</span>
    ),
  },
  {
    field: 'organism',
    headerName: 'Organisms',
    minWidth: 250, flex: 1,
  },
  {
    field: `articles_search_item`,
    headerName: '(Search + Target)Publications',
    flex: 1,
    minWidth: 120,
    hide: true,
  },
  {
    field: `articles_item_only`,
    headerName: 'Target Publications',
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

export function ProteinResults(props) {
  const [openprotein, setOpenprotein] = useState(false);
  const [proteinmodalData, setproteinModalData] = useState([]);
  const handleproteinOpen = () => setOpenprotein(true);
  const handleproteinClose = () => setOpenprotein(false);

  const ProteinOnCellClick = (params) => {
    if (params.field === 'title') {
      const url = `${Endpoints.proteins.name}?criteria=${encodeQuery(params.value)}?exact=1`;
      axios.get(url).then(resp => {
        if (resp.data) {
          setproteinModalData(resp.data.items[0]);
          handleproteinOpen();
        }
      });
    }
  };
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5a-content" id="panel5a-header">
          <Typography>Target Protein Results</Typography>
        </AccordionSummary>
        <AccordionDetails id="style-3" style={{height: '400px', overflowY: 'auto'}}>
          {
            props.targets.length > 0 &&
            <DataGrid
              rows={[...props.targets].sort((a, b) => b.f_score - a.f_score)}
              columns={proteinColumns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              getRowId={(row) => row.name.toLowerCase()}
              getRowHeight={props.rowHeight}
              hideFooterSelectedRowCount
              selectionModel={props.selectionModel}
              onCellClick={ProteinOnCellClick}
              onSelectionModelChange={props.onSelectionModelChange}
            />
          }
          <ButtonGroup variant="outlined" className="table-footer" aria-label="outlined primary button group">
            <Button onClick={props.onClick} className="uploadbtn">
              <img style={{paddingRight: '10px'}} src={dtiimage} alt="image" />
              Upload selected protein
            </Button>
            <Button variant="contained" onClick={props.onUpdateProteinAndDrug}>
              Upload protein & Drug
            </Button>
          </ButtonGroup>
        </AccordionDetails>
      </Accordion>
      <ProteinModal open={openprotein} onClose={handleproteinClose} proteinmodalData={proteinmodalData} />
    </>
  );
}

ProteinResults.propTypes = {
  targets: PropTypes.any,
  selectionModel: PropTypes.arrayOf(PropTypes.any),
  onCellClick: PropTypes.func,
  onSelectionModelChange: PropTypes.func,
  onUploadSelectedProtein: PropTypes.func,
  onUpdateProteinAndDrug: PropTypes.func,
  onClick: PropTypes.func,
};
