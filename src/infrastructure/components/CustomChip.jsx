import { Chip, styled } from "@mui/material";

export const CustomChip = styled(Chip)({
  '&.MuiChip-root': {
    //padding: 15,
    //paddingTop: 20,
    //paddingBottom: 20,
    // backgroundColor: 'white',
    // fontWeight: 'bold',
    width: '180px',
    height: '40px',
    // margin: '20px 29px 0 4px',
    padding: '11px 21px 11px 19px',
    borderRadius: '20px',
    boxShadow:' 0 8px 13px 0 rgba(133, 153, 170, 0.5)',
    border: 'solid 1px #a4c3dd',
    background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(225,227,231,1) 88%)',
    justifyContent: 'space-between',
    fontSize: '16px',
    color: '#000000',
    display: 'flex',
    '	.MuiChip-deleteIcon': {
      opacity: 0,
    },
  },
  '&.MuiChip-root:hover	.MuiChip-deleteIcon': {
    opacity: 1,
  }
})
