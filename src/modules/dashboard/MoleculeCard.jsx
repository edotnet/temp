import { Chip, Paper, styled } from "@mui/material";
import { useDrag } from "react-dnd";

export const MoleculeCard = ({molecule, onClick, onDelete}) => {
  const [{isDragging}, drag] = useDrag({
    type: 'MoleculeCard',
    item: molecule,
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })
  const CustomChip = styled(Chip)({
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
  return (
    <div ref={drag}>
      <Paper
        elevation={15}
        color="secondary"
        sx={{borderRadius: 10}}>
        <CustomChip
          onClick={onClick}
          onDelete={onDelete}
          label={molecule.name}
          size="medium"/>
      </Paper>
    </div>
  )
}
