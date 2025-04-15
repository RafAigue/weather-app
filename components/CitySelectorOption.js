import { Text, Pressable, StyleSheet } from "react-native";
import { MapPinIcon } from "react-native-heroicons/outline";

export default function CitySelectorOption({
  city,
  updateLocationState,
  setShowCities,
}) {
  return (
    <Pressable
      style={styles.citySelector}
      onPress={() => {
        updateLocationState({ selected: city });
        setShowCities(false);
      }}
    >
      <MapPinIcon size={15} style={styles.icon} />
      <Text style={styles.city}>{city.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
  icon: { color: "blue", marginRight: 2 },
  city: { position: "relative", color: "black" },
});
