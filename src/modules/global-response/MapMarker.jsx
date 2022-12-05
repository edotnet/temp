import { memo } from 'react'
import { diseaseToColor, getRoundSize } from '.'
import './styles.scss'

const MapMarker = ({ onClick, markerData }) => {
  const { disease, cases } = markerData
  const color = diseaseToColor(disease)
  const size = getRoundSize(cases)

  return (
    <div
      className='prepaire-event__round'
      style={{
        backgroundColor: color,
        width: size,
        height: size,
      }}
      onClick={() => onClick(markerData)}
    />
  )
}

export default memo(MapMarker)
