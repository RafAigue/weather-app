import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View } from "react-native";
import * as Device from "expo-device";
import bg from "./assets/background.jpg";
import loading from "./assets/svgs/loading.svg";
import Warnings from "./components/Warnings";
import Warning from "./components/Warning";
import CitySelector from "./components/CitySelector";
import Weather from "./components/Weather";
import Searcher from "./components/Searcher";
import { getWeather } from "./services/weather";
import {
  checkIfLocationEnabled,
  checkNetworkStatus,
  checkAirplaneMode,
} from "./utils/utils";
import { DEVICE_CODE_DESKTOP } from "./constants";
import { useWeather } from "./hooks/useWeather";
import { useApi } from "./hooks/useApi";
import { useConnectivity } from "./hooks/useConnectivity";

export default function App() {
  const [showCities, setShowCities] = useState(false);
  const { locationState, updateLocationState, getCurrentLocation } =
    useWeather();
  const { apiState, updateApiState } = useApi();
  const { connectivityState, updateConnectivityState } = useConnectivity();

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
          updateApiState({
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
      <View style={styles.fullContent}>
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
      </View>
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
  fullContent: {
    width: DEVICE_CODE_DESKTOP === Device.deviceType && "50%",
    margin: "auto",
  },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  imageLoading: { width: 100, height: 100 },
  content: { marginTop: 10 },
});
