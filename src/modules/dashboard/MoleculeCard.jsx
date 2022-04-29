import { Chip, Paper, styled, useTheme } from "@mui/material";
import { useDrag } from "react-dnd";
import { useState } from "react";
import { CustomChip } from "../../infrastructure/components/CustomChip";

export const MoleculeCard = ({molecule, onClick, onDelete, selected}) => {

  const [{isDragging, didDrop}, drag] = useDrag({
    type: 'MoleculeCard',
    item: molecule,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      didDrop: !!monitor.didDrop(),
    })
  })
  const theme = useTheme();

  return (
    <div ref={drag} style={{display: isDragging ? 'none' : 'block'}}>
      <Paper
        elevation={15}
        sx={{borderRadius: 10, }}>
        <CustomChip
          style={{backgroundColor: selected ? theme.palette.primary.main : 'white', color: selected ? 'white' : theme.palette.primary.main}}
          onClick={onClick}
          onDelete={onDelete}
          label={molecule.name}
          size="medium"/>
      </Paper>
    </div>
  )
}
