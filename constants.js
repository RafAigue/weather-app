export const CITIES = [
  {
    name: "Tokyo",
    coordLat: 35.6895,
    coordLong: 139.6917,
  },
  {
    name: "Paris",
    coordLat: 48.8534,
    coordLong: 2.3488,
  },
  {
    name: "Hong Kong",
    coordLat: 22.2783,
    coordLong: 114.1747,
  },
  {
    name: "Bangkok",
    coordLat: 13.754,
    coordLong: 100.5014,
  },
  {
    name: "St. Petersburg",
    coordLat: 59.9386,
    coordLong: 30.3141,
  },
  {
    name: "Kiev",
    coordLat: 50.4547,
    coordLong: 30.5238,
  },
  {
    name: "Berlin",
    coordLat: 52.5244,
    coordLong: 13.4105,
  },
  {
    name: "Dublin",
    coordLat: 53.3331,
    coordLong: -6.2489,
  },
  {
    name: "London",
    coordLat: 51.5085,
    coordLong: -0.1257,
  },
  {
    name: "New York",
    coordLat: 40.7143,
    coordLong: -74.006,
  },
  {
    name: "Mexico City",
    coordLat: 19.4285,
    coordLong: -99.1277,
  },
];

export const weatherCodes = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Slight thunderstorm",
  96: "Thunderstorm",
  99: "Thunderstorm with hail",
};

export const URL_BASE = "https://api.open-meteo.com/v1/forecast?";
export const URL_FIELDS = "&current=temperature_2m,weather_code,precipitation";
