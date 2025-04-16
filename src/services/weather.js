import { URL_BASE, URL_FIELDS } from "../constants";

export const getWeather = async (latitude, longitude) => {
  try {
    const response = await fetch(
      URL_BASE + `latitude=${latitude}&longitude=${longitude}` + URL_FIELDS
    );
    const result = await response.json();

    return result.current;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
