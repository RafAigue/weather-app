import { useState, useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import * as Device from "expo-device";
import loading from "../assets/svgs/loading.svg";
import Warnings from "../components/warning/Warnings";
import CitySelector from "../components/selector/CitySelector";
import Weather from "./Weather";
import Searcher from "./Searcher";
import { getWeather } from "../services/weather";
import {
  checkIfLocationEnabled,
  checkNetworkStatus,
  checkAirplaneMode,
} from "../utils/utils";
import { DEVICE_CODE_DESKTOP } from "../constants";
import { useWeather } from "../hooks/useWeather";
import { useApi } from "../hooks/useApi";
import { useConnectivity } from "../hooks/useConnectivity";

export default function Main() {
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
    <View style={styles.fullContent}>
      <View>
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
      </View>
      {apiState.loading ? (
        <View style={styles.loading}>
          <Image source={loading} style={styles.imageLoading} />
        </View>
      ) : (
        <View>
          {apiState.data && (
            <Weather
              place={locationState.selected?.name}
              weatherCode={apiState.data?.weather_code}
              precipitation={apiState.data?.precipitation}
              temperature={apiState.data?.temperature_2m}
            />
          )}
        </View>
      )}
      <Warnings
        locationState={locationState}
        apiState={apiState}
        connectivityState={connectivityState}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fullContent: {
    height: "100%",
    width: DEVICE_CODE_DESKTOP === Device.deviceType ? "50%" : "100%",
    minWidth: 400,
    position: "relative",
  },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  imageLoading: { width: 100, height: 100 },
});
