import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import bg from "./assets/bg.webp";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  GlobeEuropeAfricaIcon,
  MapIcon,
} from "react-native-heroicons/outline";
import { CITIES, URL_BASE, URL_FIELDS } from "./constants";

export default function App() {
  const [showCities, setShowCities] = useState(false);
  const [currLoc, setCurrLoc] = useState(null);
  const [fetching, setFetching] = useState(false);

  const fetchData = async () => {
    try {
      setFetching(true);
      const response = await fetch(
        URL_BASE +
          `latitude=${currLoc.coordLat}&longitude=${currLoc.coordLong}` +
          URL_FIELDS
      );
      const result = await response.json();
      console.log(result);
      setFetching(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    currLoc && fetchData();
  }, [currLoc]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={bg} style={styles.bg} />
      <View style={styles.search}>
        <GlobeEuropeAfricaIcon
          size={40}
          style={{ color: "#69bfff", marginRight: 5 }}
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
            {currLoc ? currLoc.name : "Search city"}
          </Text>
          <MagnifyingGlassIcon size={30} style={styles.glassIcon} />
        </Pressable>
      </View>
      {showCities ? (
        <View
          style={{
            marginHorizontal: 20,
            borderRadius: 10,
            height: "165px",
            overflow: "auto",
          }}
        >
          <Pressable
            style={styles.citySelector}
            onPress={() => {
              setCurrLoc("My location");
              setShowCities(false);
            }}
          >
            <MapIcon size={15} style={{ color: "blue", marginRight: 2 }} />
            <Text style={{ position: "relative", color: "black" }}>
              My current location
            </Text>
          </Pressable>
          {CITIES.map((city, index) => (
            <Pressable
              key={city.name + index}
              style={styles.citySelector}
              onPress={() => {
                setCurrLoc(city);
                setShowCities(false);
              }}
            >
              <MapPinIcon size={15} style={{ color: "blue", marginRight: 2 }} />
              <Text style={{ position: "relative", color: "black" }}>
                {city.name}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}
      {fetching ? (
        <View>
          <Text style={{ color: "white", fontSize: 30 }}>FETCHING!</Text>
        </View>
      ) : null}
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
  text: {
    color: "white",
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
    padding: 10,
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
  citySelector: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 1,
    paddingVertical: 8,
    paddingLeft: 10,
    backgroundColor: "#f3feffe6",
    color: "#000",
    gap: 5,
  },
});
