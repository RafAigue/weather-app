import { Text, Pressable, StyleSheet, View } from "react-native";
import { MapIcon } from "react-native-heroicons/outline";
import { CITIES } from "../constants";
import CitySelectorOption from "./CitySelectorOption";

export default function CitySelector({
  setSelectedLocation,
  setShowCities,
  getLocation,
}) {
  return (
    <View style={styles.component}>
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
        <CitySelectorOption
          key={city.name + index}
          city={city}
          index={index}
          setSelectedLocation={setSelectedLocation}
          setShowCities={setShowCities}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    height: "165px",
    overflow: "auto",
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
