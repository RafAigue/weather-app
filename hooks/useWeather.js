import { useState } from "react";

export const useWeather = () => {
  const [locationState, setLocationState] = useState({
    selected: null,
    enabled: false,
    permissionGranted: false,
  });

  const updateLocationState = (updates) => {
    setLocationState((prev) => ({ ...prev, ...updates }));
  };

  return { locationState, updateLocationState };
};
