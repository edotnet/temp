import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

export const ModalPaper = styled(Paper)({
  '&.MuiPaper-root': {
    borderRadius: 25,
    backdropFilter: 'blur(28px)',
    boxShadow: '-21px 9px 46px 0 rgba(87, 76, 153, 0.29)',
    backgroundColor: 'rgba(255, 255, 255, 0.79)'
  }
})
