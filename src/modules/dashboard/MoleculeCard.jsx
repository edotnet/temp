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

  const {hue, saturation, luminosity} = molecule.color;
  const moleculeColor = `hsla(${hue},${saturation}%, ${luminosity}%, 0.4)`;

  const style = {
    boxShadow: `0 4px 13px 0 ${moleculeColor}`,
    border: `solid 1px ${moleculeColor}`,
    borderBottomWidth: `1.5px`,
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
