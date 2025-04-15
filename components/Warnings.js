import { View, StyleSheet } from "react-native";
import { useMemo } from "react";
import Warning from "./Warning";

export default function Warnings({
  locationState,
  apiState,
  connectivityState,
}) {
  const checkWarnings = useMemo(() => {
    let warnings = [];

    !locationState.enabled &&
      warnings.push(
        <Warning key="locationEnabled" message="Location not enabled" />
      );
    !locationState.permissionGranted &&
      warnings.push(
        <Warning
          key="permissionGranted"
          message="Location permission not granted"
        />
      );
    apiState.error &&
      warnings.push(<Warning key="fetchingError" message="Fetching error" />);
    !connectivityState.network?.isConnected &&
      warnings.push(
        <Warning
          key="networkStatusIsConnected"
          message="No internet connection"
        />
      );
    !connectivityState.network?.isInternetReachable &&
      warnings.push(
        <Warning
          key="networkStatusIsInternetReachable"
          message="Internet not reachable"
        />
      );
    connectivityState.airplaneMode &&
      warnings.push(
        <Warning
          key="isAirplaneModeEnabled"
          message="Airplane mode activated"
        />
      );

    return warnings;
  }, [locationState, apiState, connectivityState]);
  return <View>{checkWarnings}</View>;
}

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    width: "auto",
    margin: "auto",
    padding: 15,
    backgroundColor: "#ff691b",
    borderRadius: 10,
    alignItems: "center",
  },
  message: { fontWeight: "bold", textAlign: "center", paddingLeft: 5 },
});
