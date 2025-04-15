import * as Location from "expo-location";
import * as Network from "expo-network";

// This functions could be implemented with hooks
export const checkIfPermissionGranted = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    alert("Permission denied. Please, allow the app to use the location");
    return false;
  }

  return true;
};

export const checkIfLocationEnabled = async () => {
  let enabled = await Location.hasServicesEnabledAsync();
  !enabled && alert("Location not enabled. Please enable your location");
  return enabled;
};

export const getCurrentLocation = async (
  setPermissionGranted,
  setSelectedLocation
) => {
  if (checkIfPermissionGranted()) {
    setPermissionGranted(true);
    const { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      setSelectedLocation({
        name: "My current location",
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    } else alert("Unable to get coordenades!");
  } else setPermissionGranted(false);
};

export const checkNetworkStatus = async () => {
  return await Network.getNetworkStateAsync();
};

export const checkAirplaneMode = async () => {
  return await Network.isAirplaneModeEnabledAsync();
};
