import { Chip, styled } from "@mui/material";
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
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
    },
    '&.MuiChip-filled': {
      border: 'solid 1px #a4c3dd',
      backgroundImage: 'linear-gradient(to bottom, #fff 16%, #e1e3e7 84%)',
    },
    '&.MuiChip-outlined': {
      //background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(225,227,231,1) 88%)',
      border: 'solid 1px #93999e',
      color: '#000',
      opacity: 0.54
    },
    '&.MuiChip-root:hover	.MuiChip-deleteIcon': {
      display: 'block',
      animation: `${fadeIn} 0.5s`
    }
  }
})


