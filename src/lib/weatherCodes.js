
export function describeWeather(code, isDay = true) {
  if (code === 0) return { icon: isDay ? '☀️' : '🌙', text: 'Clear sky' }
  if (code === 1) return { icon: isDay ? '🌤️' : '🌙', text: 'Mainly clear' }
  if (code === 2) return { icon: isDay ? '⛅' : '☁️', text: 'Partly cloudy' }
  if (code === 3) return { icon: '☁️', text: 'Overcast' }
  if (code <= 48) return { icon: '🌫️', text: 'Fog' }
  if (code <= 57) return { icon: isDay ? '🌦️' : '🌧️', text: 'Drizzle' }
  if (code <= 67) return { icon: '🌧️', text: 'Rain' }
  if (code <= 77) return { icon: '❄️', text: 'Snow' }
  if (code <= 82) return { icon: '🌧️', text: 'Rain showers' }
  if (code <= 86) return { icon: '🌨️', text: 'Snow showers' }
  return { icon: '⛈️', text: 'Thunderstorm' }
}