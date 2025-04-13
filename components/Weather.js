import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import CLOUDY from "../assets/weather pngs/cloudy.png";
import DRIZZLE from "../assets/weather pngs/drizzle.png";
import FOG from "../assets/weather pngs/fog.png";
import OVERCAST from "../assets/weather pngs/overcast.png";
import RAIN from "../assets/weather pngs/rain.png";
import SNOW from "../assets/weather pngs/snow.png";
import SUN from "../assets/weather pngs/sun.png";
import THUNDERSTORM_HAIL from "../assets/weather pngs/thunderstorm_hail.png";
import THUNDERSTORM from "../assets/weather pngs/thunderstorm.png";
import {
  WEATHER_CODES,
  SUN_CODES,
  CLOUDY_CODES,
  OVERCAST_CODES,
  FOG_CODES,
  DRIZZLE_CODES,
  RAIN_CODES,
  SNOW_CODES,
  THUNDERSTORM_CODES,
  THUNDERSTORM_HAIL_CODES,
} from "../constants";

export default function Weather({
  place,
  weatherCode,
  precipitation,
  temperature,
}) {
  const getImageFromCode = (code) => {
    if (SUN_CODES.includes(weatherCode)) {
      return <Image source={SUN} style={styles.image} />;
    } else if (CLOUDY_CODES.includes(weatherCode)) {
      return <Image source={CLOUDY} style={styles.image} />;
    } else if (DRIZZLE_CODES.includes(weatherCode)) {
      return <Image source={DRIZZLE} style={styles.image} />;
    } else if (FOG_CODES.includes(weatherCode)) {
      return <Image source={FOG} style={styles.image} />;
    } else if (THUNDERSTORM_HAIL_CODES.includes(weatherCode)) {
      return <Image source={THUNDERSTORM_HAIL} style={styles.image} />;
    } else if (OVERCAST_CODES.includes(weatherCode)) {
      return <Image source={OVERCAST} style={styles.image} />;
    } else if (RAIN_CODES.includes(weatherCode)) {
      return <Image source={RAIN} style={styles.image} />;
    } else if (SNOW_CODES.includes(weatherCode)) {
      return <Image source={SNOW} style={styles.image} />;
    } else if (THUNDERSTORM_CODES.includes(weatherCode)) {
      return <Image source={THUNDERSTORM} style={styles.image} />;
    }
    return null;
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text
          style={{
            marginTop: 10,
            color: "white",
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          {place}
        </Text>
        {getImageFromCode()}
        <Text style={{ color: "white", marginTop: 5, fontSize: 20 }}>
          {WEATHER_CODES[weatherCode]}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: "100%",
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 40,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
