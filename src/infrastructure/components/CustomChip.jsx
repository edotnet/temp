import { Chip, styled } from "@mui/material";

export const CustomChip = styled(Chip)({
  '&.MuiChip-root': {
    padding: 15,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    fontWeight: 'bold',
    justifyContent: 'space-between',
    display: 'flex',
    '	.MuiChip-deleteIcon': {
      display: 'none',
    },
  },
  '&.MuiChip-root:hover	.MuiChip-deleteIcon': {
    display: 'block',
  }
})
