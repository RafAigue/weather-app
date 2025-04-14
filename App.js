import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import * as Network from "expo-network";

import bg from "./assets/bg.jpg";
import loading from "./assets/svgs/loading.svg";

import { URL_BASE, URL_FIELDS } from "./constants";

import Warning from "./components/Warning";
import CitySelector from "./components/CitySelector";
import Weather from "./components/Weather";
import Searcher from "./components/Searcher";

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

  const fetchAPI = async () => {
    try {
      setFetching(true);

      const response = await fetch(
        URL_BASE +
          `latitude=${selectedLocation.coordLat}&longitude=${selectedLocation.coordLong}` +
          URL_FIELDS
      );
      const result = await response.json();

      setFetchingError(false);
      setFetching(false);
      setFDataFetch(result.current);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFetchingError(true);
      setFetching(false);
    }
  };

  useEffect(() => {
    checkNetworkStatus();
    checkAirplaneMode();
    selectedLocation && fetchAPI();
  }, [selectedLocation]);

  useEffect(() => {
    checkIfLocationEnabled();
    checkIfPermissionGranted();
    checkNetworkStatus();
    checkAirplaneMode();
  }, []);

  const getLocation = async () => {
    console.log("getLocation");
    checkIfLocationEnabled() && getCurrentLocation();
  };

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    setLocationEnabled(enabled);
    !enabled && alert("Location not enabled. Please enable your location");
    return enabled;
  };

  const checkIfPermissionGranted = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setPermissionGranted(false);
      alert("Permission denied. Please, allow the app to use the location");
      return false;
    }

    setPermissionGranted(true);
    return true;
  };

  const getCurrentLocation = async () => {
    if (checkIfPermissionGranted()) {
      setPermissionGranted(true);
      const { coords } = await Location.getCurrentPositionAsync();

      if (coords) {
        setSelectedLocation({
          name: "My current location",
          coordLat: coords.latitude,
          coordLong: coords.longitude,
        });
      } else alert("Unable to get coordenades!");
    }
  };

  const checkNetworkStatus = async () => {
    setNetworkStatus(await Network.getNetworkStateAsync());
  };

  const checkAirplaneMode = async () => {
    setIsAirplaneModeEnabled(await Network.isAirplaneModeEnabledAsync());
  };

  const checkWarnings = () => {
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
  };

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
          {checkWarnings()}
          {dataFetch ? (
            <Weather
              place={selectedLocation.name}
              weatherCode={dataFetch.weather_code}
              precipitation={dataFetch.precipitation}
              temperature={dataFetch.temperature_2m}
            />
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
