import { Text, View, StyleSheet } from "react-native";
import { ExclamationTriangleIcon } from "react-native-heroicons/outline";

export default function Warning({ message }) {
  return (
    <View style={{ marginTop: 10 }}>
      <View style={styles.view}>
        <ExclamationTriangleIcon size={25} color="black" />
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    margin: "auto",
    padding: 12,
    backgroundColor: "#ff691b",
    borderRadius: 10,
    alignItems: "center",
  },
  message: { fontWeight: "bold", textAlign: "center", paddingLeft: 5 },
});
