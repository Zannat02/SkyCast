
export function uvLevel(uv) {
  if (uv == null) return '–'
  if (uv < 3) return 'Low'
  if (uv < 6) return 'Moderate'
  if (uv < 8) return 'High'
  if (uv < 11) return 'Very high'
  return 'Extreme'
}

export function rainLevel(percent) {
  if (percent == null) return '–'
  if (percent < 30) return 'Low'
  if (percent < 60) return 'Moderate'
  return 'High'
}

export function cloudLevel(percent) {
  if (percent == null) return '–'
  if (percent < 30) return 'Low'
  if (percent < 70) return 'Moderate'
  return 'High'
}