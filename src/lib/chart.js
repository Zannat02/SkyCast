
export function toPoints(values, { width, height, padTop = 10, padBottom = 10 }) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min
  const usable = height - padTop - padBottom

  return values.map((value, i) => ({
    x: values.length === 1 ? width / 2 : (i / (values.length - 1)) * width,
   
    y: span === 0 ? padTop + usable / 2 : padTop + (1 - (value - min) / span) * usable,
    value,
  }))
}

const round = (n) => Math.round(n * 100) / 100

export function smoothPath(points) {
  const n = points.length
  if (n === 0) return ''
  if (n === 1) return `M${round(points[0].x)},${round(points[0].y)}`

  const dx = []
  const slope = []
  for (let i = 0; i < n - 1; i++) {
    dx[i] = points[i + 1].x - points[i].x
    slope[i] = (points[i + 1].y - points[i].y) / dx[i]
  }

 
  const tangent = [slope[0]]
  for (let i = 1; i < n - 1; i++) {
  
    tangent[i] = slope[i - 1] * slope[i] <= 0 ? 0 : (slope[i - 1] + slope[i]) / 2
  }
  tangent[n - 1] = slope[n - 2]

 
  for (let i = 0; i < n - 1; i++) {
    if (slope[i] === 0) {
      tangent[i] = 0
      tangent[i + 1] = 0
    } else {
      const a = tangent[i] / slope[i]
      const b = tangent[i + 1] / slope[i]
      const s = a * a + b * b
      if (s > 9) {
        const tau = 3 / Math.sqrt(s)
        tangent[i] = tau * a * slope[i]
        tangent[i + 1] = tau * b * slope[i]
      }
    }
  }

  let d = `M${round(points[0].x)},${round(points[0].y)}`
  for (let i = 0; i < n - 1; i++) {
    const c1x = points[i].x + dx[i] / 3
    const c1y = points[i].y + (tangent[i] * dx[i]) / 3
    const c2x = points[i + 1].x - dx[i] / 3
    const c2y = points[i + 1].y - (tangent[i + 1] * dx[i]) / 3
    d += ` C${round(c1x)},${round(c1y)} ${round(c2x)},${round(c2y)} ${round(points[i + 1].x)},${round(points[i + 1].y)}`
  }
  return d
}


export function areaPath(points, baseY) {
  if (points.length === 0) return ''
  const first = points[0]
  const last = points[points.length - 1]
  return `${smoothPath(points)} L${round(last.x)},${round(baseY)} L${round(first.x)},${round(baseY)} Z`
}