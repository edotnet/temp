export const stringToColor = str => {
  let hash = 0
  str.split('').forEach((_, i) => {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  })

  let color = '#'
  new Array(3).fill().forEach((_, i) => {
    const value = (hash >> (i * 8)) & 0xff
    color += ('00' + value.toString(16)).substr(-2)
  })
  return color
}

export const allDiseases = [
  'COVID-19',
  'Monkeypox',
  'HIV',
  'Marburg Virus',
  'Ebola Virus',
  'Lassa Fever',
]

export const diseaseToColor = str => {
  switch (str) {
    case 'COVID-19':
      return '#f00201'
    case 'Monkeypox':
      return '#808080'
    case 'HIV':
      return '#FF68B4'
    case 'Marburg Virus':
      return '#A01FF0'
    case 'Ebola Virus':
      return '#000'
    // case 'Lassa Fever':
    //   return '#808080'
    default:
      return stringToColor(str)
  }
}

export const getRoundSize = cases => {
  if (cases < 99999) return 13
  if (cases < 999999) return 17
  if (cases < 9999999) return 23
  return 30
}

export const numberWithCommas = num => {
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
} 
