import { useState } from "react";
import * as Location from "expo-location";
import { checkIfPermissionGranted } from "../utils/utils";

export const useWeather = () => {
  const [locationState, setLocationState] = useState({
    selected: null,
    enabled: false,
    permissionGranted: false,
  });

  const updateLocationState = (updates) => {
    setLocationState((prev) => ({ ...prev, ...updates }));
  };

  const getCurrentLocation = async () => {
    const permission = await checkIfPermissionGranted();
    if (permission) {
      const { coords } = await Location.getCurrentPositionAsync();

      if (coords) {
        updateLocationState({
          selected: {
            name: "My location",
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
        });
      } else alert("Unable to get coordenades!");
    }
    updateLocationState({ permissionGranted: permission });
  };

  return {
    locationState,
    updateLocationState,
    getCurrentLocation,
  };
};
