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

export const diseaseToColor = str => {
  switch (str) {
    case 'COVID-19':
      return '#CB0133'
    case 'Monkeypox':
      return '#FB9E1B'
    case 'Marburg Virus':
      return '#808000'
    case 'Ebola Virus':
      return '#000'
    case 'Lassa Fever':
      return '#FF5F1F'
    default:
      return stringToColor(str)
  }
}

export const getRoundSize = cases => {
  if (cases < 99999) return 13
  if (cases < 999999) return 17
  if (cases < 9999999) return 25
  return 40
}
