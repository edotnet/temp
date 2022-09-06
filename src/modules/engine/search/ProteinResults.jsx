import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid } from "@mui/x-data-grid";
import dtiimage from "../../../assets/img/table-dti-icon.svg";
import * as PropTypes from "prop-types";
import { Endpoints } from "../../../config/Consts";
import axios from "axios";
import { ProteinModal } from "./ProteinModal";
import { useState } from "react";
import { useDashboardContext } from "../../dashboard/context/useDashboarContext";
import { useNavigate } from "react-router-dom";

const proteinColumns = [
  {
    field: `title`, headerName: 'Target Name', minWidth: 150, flex: 1,
    renderCell: (params) => (
      <span className='link-btn'>{params.value}</span>
    ),
  },
  {
    field: `metrics['(Search + {}) Publications']`,
    headerName: '(Search + Target)Publications',
    minWidth: 250,
    valueGetter: (params) => params.row.metrics['(Search + {}) Publications'],
  },
  {
    field: `metrics['{} Publications']`,
    headerName: 'Target Publications',
    minWidth: 120, flex: 1,
    valueGetter: (params) => params.row.metrics['{} Publications'],
  },
];


export function ProteinResults(props) {
  const {state, dispatch} = useDashboardContext();
  const navigate = useNavigate();
  const [openprotein, setOpenprotein] = useState(false);
  const [proteinmodalData, setproteinModalData] = useState([]);
  const handleproteinOpen = () => setOpenprotein(true);
  const handleproteinClose = () => setOpenprotein(false);

  const uploadSelectedProtein = async () => {
    const url = `${Endpoints.drugbank.targets}${props.selectionModel[0]}`;
    axios.get(url).then(resp => {
      if (resp.data) {
        dispatch({type: 'addProtein', payload: resp.data[0]});
        dispatch({type: 'resetInteractingMolecules', payload: null});
        dispatch({type: 'removePdb', payload: null});
        navigate("/dashboard");
      }
    });
  }

  const ProteinOnCellClick = (params) => {
    if (params.field === 'title') {
      const url = `${Endpoints.drugbank.targets}${params.value}`;
      axios.get(url).then(resp => {
        if (resp.data) {
          for (let i = 0; i < resp.data.length; i++) {
            if (resp.data[i].name === params.value) {
              setproteinModalData(resp.data[i]);
              handleproteinOpen();
            }
          }
        }
      })
    }
  }
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel5a-content" id="panel5a-header">
          <Typography>Target Protein Results</Typography>
        </AccordionSummary>
        <AccordionDetails id="style-3" style={{height: "400px", overflowY: "auto"}}>
          {
            props.targets.length > 0 &&
            <DataGrid
              rows={[...props.targets].sort((a, b) => b.metrics.ranking_score - a.metrics.ranking_score)}
              columns={proteinColumns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              getRowId={(row) => row.title.toLowerCase()}
              getRowHeight={props.rowHeight}
              hideFooterSelectedRowCount
              selectionModel={props.selectionModel}
              onCellClick={ProteinOnCellClick}
              onSelectionModelChange={props.onSelectionModelChange}
            />
          }
          <ButtonGroup variant="outlined" className="table-footer" aria-label="outlined primary button group">
            <Button onClick={uploadSelectedProtein} className="uploadbtn">
              <img style={{paddingRight: "10px"}} src={dtiimage} alt="image"/>
              Upload selected protein
            </Button>
            <Button variant="contained" onClick={props.onUpdateProteinAndDrug}>
              Upload protein & Drug
            </Button>
          </ButtonGroup>
        </AccordionDetails>
      </Accordion>
      <ProteinModal open={openprotein} onClose={handleproteinClose} proteinmodalData={proteinmodalData}/>
    </>
  );
}

ProteinResults.propTypes = {
  targets: PropTypes.any,
  selectionModel: PropTypes.arrayOf(PropTypes.any),
  onCellClick: PropTypes.func,
  onSelectionModelChange: PropTypes.func,
  onUploadSelectedProtein: PropTypes.func,
  onUpdateProteinAndDrug: PropTypes.func
};
