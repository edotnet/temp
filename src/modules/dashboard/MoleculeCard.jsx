import { useDrag } from "react-dnd";
import { CustomChip } from "../../infrastructure/components/CustomChip";
import { CustomWidthTooltip } from "../../infrastructure/components/CustomWidthTooltip";
import { colorful_language } from "../../infrastructure/utils";

export const MoleculeCard = ({molecule, onClick, onDelete, selected}) => {

  const [{isDragging, didDrop}, drag] = useDrag({
    type: 'MoleculeCard',
    item: molecule,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      didDrop: !!monitor.didDrop(),
    })
  })

  const style = {
    boxShadow: `0 6px 5px 0 ${molecule.color}`,
    border: `solid 1px ${molecule.color}`,
  }

  const selectedStyle = {
    boxShadow: `none`,
    border: `solid 1px black`,
  }
  return (
    <div ref={drag} style={{opacity: isDragging ? '0' : '1'}}>
      <CustomWidthTooltip title={molecule.name}>
        <CustomChip
          variant={selected ? 'outlined' : 'filled'}
          style={selected ? selectedStyle : style}
          onClick={onClick}
          onDelete={onDelete}
          label={molecule.name}
          size="medium"/>
      </CustomWidthTooltip>
    </div>
  )
}
