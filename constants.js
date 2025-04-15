export const CITIES = [
  {
    name: "Tokyo",
    latitude: 35.6895,
    longitude: 139.6917,
  },
  {
    name: "Paris",
    latitude: 48.8534,
    longitude: 2.3488,
  },
  {
    name: "Hong Kong",
    latitude: 22.2783,
    longitude: 114.1747,
  },
  {
    name: "Bangkok",
    latitude: 13.754,
    longitude: 100.5014,
  },
  {
    name: "St. Petersburg",
    latitude: 59.9386,
    longitude: 30.3141,
  },
  {
    name: "Kiev",
    latitude: 50.4547,
    longitude: 30.5238,
  },
  {
    name: "Berlin",
    latitude: 52.5244,
    longitude: 13.4105,
  },
  {
    name: "Dublin",
    latitude: 53.3331,
    longitude: -6.2489,
  },
  {
    name: "London",
    latitude: 51.5085,
    longitude: -0.1257,
  },
  {
    name: "New York",
    latitude: 40.7143,
    longitude: -74.006,
  },
  {
    name: "Mexico City",
    latitude: 19.4285,
    longitude: -99.1277,
  },
];

export const WEATHER_CODES = {
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

export const SUN_CODES = [0];
export const CLOUDY_CODES = [1, 2];
export const OVERCAST_CODES = [3];
export const FOG_CODES = [45, 48];
export const DRIZZLE_CODES = [51, 53, 56, 57];
export const RAIN_CODES = [61, 63, 65, 66, 67, 80, 81, 82, 85, 86];
export const SNOW_CODES = [71, 73, 75, 77];
export const THUNDERSTORM_CODES = [95, 96];
export const THUNDERSTORM_HAIL_CODES = [99];

export const URL_BASE = "https://api.open-meteo.com/v1/forecast?";
export const URL_FIELDS = "&current=temperature_2m,weather_code,precipitation";
