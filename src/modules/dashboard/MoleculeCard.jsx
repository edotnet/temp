import { Chip, Paper, styled } from "@mui/material";
import { useDrag } from "react-dnd";
import { useState } from "react";
import { CustomChip } from "../../infrastructure/components/CustomChip";

export const MoleculeCard = ({molecule, onClick, onDelete}) => {
  const [coordinates, setCoordinates] = useState({x: 0, y:0})
  const [{isDragging, didDrop}, drag] = useDrag({
    type: 'MoleculeCard',
    item: molecule,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      didDrop: !!monitor.didDrop(),
    })
  })
  const onMouseMove = (e) => {
    setCoordinates({x: e.screenX, y: e.screenY})
  }

  return (
    <div ref={drag} onMouseMove={onMouseMove} style={{transform: isDragging ? `translateX(${coordinates.x}px) translateY(${coordinates.y}px)` : 'initial'}}>
      <Paper
        elevation={15}
        color="primary"
        sx={{borderRadius: 10, backgroundColor: didDrop? 'green' : 'white'}}>
        <CustomChip
          onClick={onClick}
          onDelete={onDelete}
          label={molecule.name}
          size="medium"/>
      </Paper>
    </div>
  )
}
