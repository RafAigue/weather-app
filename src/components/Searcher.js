import { Text, View, StyleSheet, Pressable } from "react-native";
import {
  GlobeEuropeAfricaIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

export default function Searcher({
  selectedLocation,
  setShowCities,
  showCities,
}) {
  return (
    <View style={styles.search}>
      <GlobeEuropeAfricaIcon
        size={30}
        style={{ color: "#69bfff", marginHorizontal: 5 }}
      />
      <Pressable
        onPress={() => setShowCities(!showCities)}
        style={styles.press}
      >
        <Text style={styles.textInput}>
          {selectedLocation ? selectedLocation.name : "Search city"}
        </Text>
        <MagnifyingGlassIcon size={20} style={styles.glassIcon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: 15,
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
  glassIcon: {
    marginRight: 5,
    padding: 5,
    color: "white",
  },
  press: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: "1",
  },
});
