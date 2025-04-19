import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View } from "react-native";
import bg from "./assets/background.jpg";
import Main from "./features/Main";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={bg} style={styles.bg} />
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: "100%",
  },
  bg: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});
