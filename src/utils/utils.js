import * as Location from "expo-location";
import * as Network from "expo-network";

export const checkIfLocationEnabled = async () => {
  let enabled = await Location.hasServicesEnabledAsync();
  !enabled && console.log("Location not enabled. Please enable your location");
  return enabled;
};

export const checkIfPermissionGranted = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  status !== "granted" &&
    console.log("Permission denied. Please, allow the app to use the location");

  return status === "granted";
};

export const checkNetworkStatus = async () => {
  return await Network.getNetworkStateAsync();
};

export const checkAirplaneMode = async () => {
  return await Network.isAirplaneModeEnabledAsync();
};
