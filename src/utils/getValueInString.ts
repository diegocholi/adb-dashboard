export const getMemIntInString = (rawValue: string, key: string): string => {
  const regex = new RegExp(`${key}\\s*(\\d+)`)
  const match = rawValue.match(regex)
  return match && match[1] ? match[1] : '0'
}

export const getMenFloatInString = (rawValue: string, key: string): string => {
  const regex = new RegExp(`${key}\\s*([\\d.]+,\\d+)`)
  const match = rawValue.match(regex)
  return match && match[1] ? match[1].replace(',', '') : '0'
}

export const getCpuAppUsedInString = (rawValue: string, key: string | null) => {
  if (!key) return 0
  const regex = new RegExp(`(.*?)(?=\/${key}:)`)
  const match = rawValue.match(regex)
  return match ? String(match[1]).split('%')[0] : 0
}
