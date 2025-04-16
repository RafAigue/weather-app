import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import * as Device from "expo-device";

import bg from "./assets/bg.jpg";
import loading from "./assets/svgs/loading.svg";

import Warnings from "./components/Warnings";
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

import { DEVICE_CODE_DESKTOP } from "./constants";

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
    if (locationState.selected && connectivityState.network) {
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

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={bg} blurRadius={10} style={styles.bg} />
      <ScrollView style={styles.scrollFullContent}>
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
            <Image source={loading} style={styles.imageLoading} />
          </View>
        ) : (
          <View style={styles.content}>
            <Warnings
              locationState={locationState}
              apiState={apiState}
              connectivityState={connectivityState}
            />
            {apiState.data ? (
              <Weather
                place={locationState.selected?.name}
                weatherCode={apiState.data?.weather_code}
                precipitation={apiState.data?.precipitation}
                temperature={apiState.data?.temperature_2m}
              />
            ) : (
              <Warning message="No data available" />
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  scrollFullContent: {
    width: DEVICE_CODE_DESKTOP === Device.deviceType && "50%",
    margin: DEVICE_CODE_DESKTOP === Device.deviceType && "auto",
  },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  imageLoading: { width: 100, height: 100 },
  content: { marginTop: 10 },
});
