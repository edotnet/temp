import { memo } from 'react';

const MapMarker = ({ onClick, markerData }) => {
  const { disease } = markerData
  const stringToColor = str => {
    let hash = 0;
    str.split('').forEach((_, i) => {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    })

    let color = '#';
    new Array(3).fill().forEach((_, i) => {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    })
    return color;
  }

  // const generateShadow = () => {
  //   const max = [0, 0, 30, 10]
  //   console.log([0, 0, cases, deaths].map((num, i) => (num > max[i] ? max[i] : num) + 'px').join(' '))
  //   return [0, 0, cases, deaths].map((num, i) => (num > max[i] ? max[i] : num) + 'px').join(' ')
  // }

  const color = stringToColor(disease)

  return (
    <div style={{ 
      width: 15, 
      height: 15, 
      backgroundColor: color, 
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