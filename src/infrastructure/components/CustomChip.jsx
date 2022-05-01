import { Chip, styled } from "@mui/material";
import { keyframes } from '@mui/system';

const fadeIn  = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const CustomChip = styled(Chip)({
  '&.MuiChip-root': {
    height: 40,
    maxWidth: 170,
    padding: '11px 15px 11px 15px',
    borderRadius: 20,
    boxShadow: '0 8px 13px 0 rgba(133, 153, 170, 0.5)',
    border: 'solid 1px #a4c3dd',
    background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(225,227,231,1) 88%)',
    justifyContent: 'space-between',
    fontSize: 18,
    color: '#000',
    display: 'flex',
    '.MuiChip-label': {
      paddingLeft: 0,
      paddingRight: 0,
    },
    '&.MuiChip-deletable': {
      '.MuiChip-deleteIcon': {
        display: 'none',
        marginLeft: 10,
      },
    }
  },
  '&.MuiChip-root:hover	.MuiChip-deleteIcon': {
    display: 'block',
    animation: `${fadeIn} 0.5s`
  },
})


