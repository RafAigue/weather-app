import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";

import bg from "./assets/bg.jpg";
import loading from "./assets/svgs/loading.svg";
import {
  MagnifyingGlassIcon,
  GlobeEuropeAfricaIcon,
  MapIcon,
} from "react-native-heroicons/outline";
import { CITIES, URL_BASE, URL_FIELDS } from "./constants";

import Warning from "./components/Warning";
import CitySelector from "./components/CitySelector";
import Weather from "./components/Weather";

export default function App() {
  const [showCities, setShowCities] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [fetchingError, setFetchingError] = useState(false);
  const [dataFetch, setFDataFetch] = useState(null);

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
    selectedLocation && fetchAPI();
  }, [selectedLocation]);

  useEffect(() => {
    checkIfLocationEnabled();
    checkIfPermissionGranted();
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

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={bg} blurRadius={5} style={styles.bg} />
      <View style={styles.search}>
        <GlobeEuropeAfricaIcon
          size={30}
          style={{ color: "#69bfff", marginHorizontal: 5 }}
        />
        <Pressable
          onPress={() => setShowCities(!showCities)}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flex: "1",
          }}
        >
          <Text style={styles.textInput}>
            {selectedLocation ? selectedLocation.name : "Search city"}
          </Text>
          <MagnifyingGlassIcon size={20} style={styles.glassIcon} />
        </Pressable>
      </View>
      {showCities ? (
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 10,
            borderRadius: 10,
            height: "165px",
            overflow: "auto",
          }}
        >
          <Pressable
            style={styles.currLocSelector}
            onPress={() => {
              getLocation();
              setShowCities(false);
            }}
          >
            <MapIcon size={15} style={{ color: "blue", marginRight: 2 }} />
            <Text style={{ position: "relative", color: "black" }}>
              My current location
            </Text>
          </Pressable>
          {CITIES.map((city, index) => (
            <CitySelector
              key={city.name + index}
              city={city}
              index={index}
              setSelectedLocation={setSelectedLocation}
              setShowCities={setShowCities}
            />
          ))}
        </View>
      ) : null}
      {fetching ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image source={loading} style={{ width: 100, height: 100 }} />
        </View>
      ) : (
        <View style={{ marginTop: 10 }}>
          {!locationEnabled && <Warning message="Location not enabled" />}
          {!permissionGranted && <Warning message="Permission not granted" />}
          {fetchingError && <Warning message="Fetching error" />}
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
  search: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    margin: 15,
    marginBottom: 5,
    padding: 5,
    borderRadius: 15,
    borderColor: "#ffffff80",
    borderWidth: 1,
    backgroundColor: "#515151db",
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    padding: 5,
    fontSize: 16,
    color: "white",
  },
  glassIconPressable: {
    alignItems: "center",
  },
  glassIcon: {
    marginRight: 5,
    padding: 5,
    color: "white",
  },
  currLocSelector: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 1,
    paddingVertical: 8,
    paddingLeft: 10,
    backgroundColor: "#d0fbffe6",
    color: "#000",
    gap: 5,
  },
});
