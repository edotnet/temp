import { useDrag } from "react-dnd";
import { CustomChip } from "../../infrastructure/components/CustomChip";
import { CustomWidthTooltip } from "../../infrastructure/components/CustomWidthTooltip";

export const MoleculeCard = ({molecule, onClick, onDelete, selected}) => {

  const [{isDragging, didDrop}, drag] = useDrag({
    type: 'MoleculeCard',
    item: molecule,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      didDrop: !!monitor.didDrop(),
    })
  })

  return (
    <div ref={drag} style={{opacity: isDragging ? '0' : '1'}}>
      <CustomWidthTooltip title={molecule.name}>
        <CustomChip
          variant={selected ? 'outlined' : 'filled'}
          onClick={onClick}
          onDelete={onDelete}
          label={molecule.name}
          size="medium"/>
      </CustomWidthTooltip>
    </div>
  )
}
