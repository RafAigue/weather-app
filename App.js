import { useState, useEffect, useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View } from "react-native";

import bg from "./assets/bg.jpg";
import loading from "./assets/svgs/loading.svg";

import Warning from "./components/Warning";
import CitySelector from "./components/CitySelector";
import Weather from "./components/Weather";
import Searcher from "./components/Searcher";

import { getWeather } from "./services/weather";

import {
  checkIfLocationEnabled,
  getCurrentLocation,
  checkNetworkStatus,
  checkAirplaneMode,
} from "./utils/utils";

export default function App() {
  const [showCities, setShowCities] = useState(false);
  const [locationState, setLocationState] = useState({
    selected: null,
    enabled: false,
    permissionGranted: false,
  });
  const [apiState, setApiState] = useState({
    loading: false,
    error: false,
    data: null,
  });
  const [connectivityState, setConnectivityState] = useState({
    network: null,
    airplaneMode: false,
  });

  const updateLocationState = (updates) => {
    setLocationState((prev) => ({ ...prev, ...updates }));
  };

  const updateApiState = (updates) => {
    setApiState((prev) => ({ ...prev, ...updates }));
  };

  const updateConnectivityState = (updates) => {
    setConnectivityState((prev) => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    checkNetworkStatus().then((status) =>
      updateConnectivityState({ network: status })
    );
    checkAirplaneMode().then((enabled) =>
      updateConnectivityState({ airplaneMode: enabled })
    );
    if (locationState.selected) {
      updateApiState({ loading: true });
      getWeather(
        locationState.selected.latitude,
        locationState.selected.longitude
      )
        .then((weather) => {
          setApiState({
            error: false,
            loading: false,
            data: weather,
          });
        })
        .catch(() => {
          updateApiState({
            error: true,
            loading: false,
          });
        });
    }
  }, [locationState.selected]);

  useEffect(() => {
    getLocation(); // By default
    checkNetworkStatus().then((status) =>
      updateConnectivityState({ network: status })
    );
    checkAirplaneMode().then((enabled) =>
      updateConnectivityState({ airplaneMode: enabled })
    );
  }, []);

  const getLocation = async () => {
    const enabled = await checkIfLocationEnabled();
    updateLocationState({ enabled });
    enabled && getCurrentLocation(updateLocationState);
  };

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

  const weatherComponent = useMemo(() => {
    return (
      <Weather
        place={locationState.selected?.name}
        weatherCode={apiState.data?.weather_code}
        precipitation={apiState.data?.precipitation}
        temperature={apiState.data?.temperature_2m}
      />
    );
  }, [locationState.selected, apiState.data]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={bg} blurRadius={10} style={styles.bg} />
      <Searcher
        selectedLocation={locationState.selected}
        setShowCities={setShowCities}
        showCities={showCities}
      />
      {showCities ? (
        <CitySelector
          updateLocationState={updateLocationState}
          setShowCities={setShowCities}
          getLocation={getLocation}
        />
      ) : null}
      {apiState.loading ? (
        <View style={styles.loading}>
          <Image source={loading} style={{ width: 100, height: 100 }} />
        </View>
      ) : (
        <View style={{ marginTop: 10 }}>
          {checkWarnings}
          {apiState.data ? (
            weatherComponent
          ) : (
            <Warning message="No data available" />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  bg: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
});
