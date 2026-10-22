
function getParts(date, timeZone, options) {
  try {
    return new Intl.DateTimeFormat('en-GB', { timeZone, ...options }).formatToParts(date)
  } catch {
    return new Intl.DateTimeFormat('en-GB', options).formatToParts(date)
  }
}

const pick = (parts, type) => parts.find((p) => p.type === type)?.value


function ordinal(n) {
  const lastTwo = n % 100
  if (lastTwo >= 11 && lastTwo <= 13) return 'th'
  return { 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] ?? 'th'
}


export function formatLocalDate(date, timeZone) {
  const parts = getParts(date, timeZone, { day: 'numeric', month: 'long', year: 'numeric' })
  const day = Number(pick(parts, 'day'))
  return `${day}${ordinal(day)} ${pick(parts, 'month')}, ${pick(parts, 'year')}`
}


export function formatLocalTime(date, timeZone) {
  const parts = getParts(date, timeZone, { hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' })
  return `${pick(parts, 'hour')}:${pick(parts, 'minute')}:${pick(parts, 'second')}`
}