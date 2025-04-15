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
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [fetchingError, setFetchingError] = useState(false);
  const [dataFetch, setFDataFetch] = useState(null);
  const [networkStatus, setNetworkStatus] = useState(null);
  const [isAirplaneModeEnabled, setIsAirplaneModeEnabled] = useState(false);

  useEffect(() => {
    checkNetworkStatus();
    checkAirplaneMode();
    if (selectedLocation) {
      setFetching(true);
      getWeather(selectedLocation.latitude, selectedLocation.longitude)
        .then((weather) => {
          setFetchingError(false);
          setFetching(false);
          setFDataFetch(weather);
        })
        .catch(() => {
          setFetchingError(true);
          setFetching(false);
        });
    }
  }, [selectedLocation]);

  useEffect(() => {
    getLocation(); // By default
    checkNetworkStatus().then((status) => setNetworkStatus(status));
    checkAirplaneMode().then((enabled) => setIsAirplaneModeEnabled(enabled));
  }, []);

  const getLocation = async () => {
    const enabled = await checkIfLocationEnabled();
    setLocationEnabled(enabled);
    enabled && getCurrentLocation(setPermissionGranted, setSelectedLocation);
  };

  const checkWarnings = useMemo(() => {
    let warnings = [];

    !locationEnabled && // Don't know why is not working properly
      warnings.push(
        <Warning key="locationEnabled" message="Location not enabled" />
      );
    !permissionGranted &&
      warnings.push(
        <Warning
          key="permissionGranted"
          message="Location permission not granted"
        />
      );
    fetchingError &&
      warnings.push(<Warning key="fetchingError" message="Fetching error" />);
    !networkStatus?.isConnected &&
      warnings.push(
        <Warning
          key="networkStatusIsConnected"
          message="No internet connection"
        />
      );
    !networkStatus?.isInternetReachable &&
      warnings.push(
        <Warning
          key="networkStatusIsInternetReachable"
          message="Internet not reachable"
        />
      );
    isAirplaneModeEnabled && // Don't know why is not working properly
      warnings.push(
        <Warning
          key="isAirplaneModeEnabled"
          message="Airplane mode activated"
        />
      );

    return warnings;
  }, [
    locationEnabled,
    permissionGranted,
    fetchingError,
    networkStatus,
    isAirplaneModeEnabled,
  ]);

  const weatherComponent = useMemo(() => {
    return (
      <Weather
        place={selectedLocation?.name}
        weatherCode={dataFetch?.weather_code}
        precipitation={dataFetch?.precipitation}
        temperature={dataFetch?.temperature_2m}
      />
    );
  }, [selectedLocation, dataFetch]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={bg} blurRadius={10} style={styles.bg} />
      <Searcher
        selectedLocation={selectedLocation}
        setShowCities={setShowCities}
        showCities={showCities}
      />
      {showCities ? (
        <CitySelector
          setSelectedLocation={setSelectedLocation}
          setShowCities={setShowCities}
          getLocation={getLocation}
        />
      ) : null}
      {fetching ? (
        <View style={styles.loading}>
          <Image source={loading} style={{ width: 100, height: 100 }} />
        </View>
      ) : (
        <View style={{ marginTop: 10 }}>
          {checkWarnings}
          {dataFetch ? (
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
