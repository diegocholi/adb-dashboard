export const getValueIntInString = (rawValue: string, key: string): string => {
  const regex = new RegExp(`${key}\\s*(\\d+)`)
  const match = rawValue.match(regex)
  return match && match[1] ? match[1] : '0'
}

export const getValueFloatInString = (
  rawValue: string,
  key: string
): string => {
  const regex = new RegExp(`${key}\\s*([\\d.]+,\\d+)`)
  const match = rawValue.match(regex)
  return match && match[1] ? match[1].replace(',', '') : '0'
}
