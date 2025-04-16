import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View } from "react-native";
import * as Device from "expo-device";
import bg from "./assets/background.jpg";
import Main from "./features/Main";
import { DEVICE_CODE_DESKTOP } from "./constants";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={bg} blurRadius={10} style={styles.bg} />
      <Main />
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
    margin: DEVICE_CODE_DESKTOP === Device.deviceType && "auto",
  },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  imageLoading: { width: 100, height: 100 },
  content: { marginTop: 10 },
});
