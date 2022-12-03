import { memo } from 'react';
import { diseaseToColor } from '.';

const MapMarker = ({ onClick, markerData }) => {
  const { disease } = markerData

  return (
    <div style={{ 
      width: 15, 
      height: 15, 
      backgroundColor: diseaseToColor(disease), 
      border: '1px solid #000', 
      borderRadius: '50%', 
      // boxShadow: `${generateShadow()} ${color}`,
      cursor: 'pointer' 
      }} 
      onClick={() => onClick(markerData)} 
    />
  )
}

export default memo(MapMarker)