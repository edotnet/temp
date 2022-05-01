import { Chip, Paper, styled, useTheme } from "@mui/material";
import { useDrag } from "react-dnd";
import { useState } from "react";
import { CustomChip } from "../../infrastructure/components/CustomChip";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export const MoleculeCard = ({molecule, onClick, onDelete, selected}) => {

  const [{isDragging, didDrop}, drag] = useDrag({
    type: 'MoleculeCard',
    item: molecule,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      didDrop: !!monitor.didDrop(),
    })
  })

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 300,
    },
  });

  const theme = useTheme();
  return (
    <div ref={drag} style={{opacity: isDragging ? '0' : '1'}}>
      <Paper
        elevation={15}
        sx={{borderRadius: 10, }}>
        <CustomWidthTooltip title={molecule.name}>
          <CustomChip
            style={{backgroundColor: selected ? theme.palette.primary.main : 'white', color: selected ? '#93999e' : theme.palette.primary.main}}
            onClick={onClick}
            onDelete={onDelete}
            label={molecule.name}
            size="medium"/>
          </CustomWidthTooltip>
      </Paper>
    </div>
  )
}
