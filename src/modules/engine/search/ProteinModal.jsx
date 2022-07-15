import { Box, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as PropTypes from "prop-types";

export function ProteinModal(props) {
  return <Modal open={props.open} onClose={props.onClose} aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
    <Box className="search-column-popup">
      <IconButton aria-label="close" onClick={props.onClose} sx={{position: "absolute", top: 5, right: 5}} size="large"><CloseIcon/></IconButton>
      <Box>
        {
          props.proteinmodalData ? <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props.proteinmodalData.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{mt: 2}}>
              {props.proteinmodalData.id ? <span>Id: {props.proteinmodalData.id} </span> : ""}
            </Typography>
            <Typography id="modal-modal-description" sx={{mt: 2}}>
              {props.proteinmodalData.organism ? <span>Organism: {props.proteinmodalData.organism} </span> : ""}
            </Typography>
          </div> : "Loading"
        }
      </Box>
    </Box>
  </Modal>;
}
ProteinModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  proteinmodalData: PropTypes.arrayOf(PropTypes.any)
};
