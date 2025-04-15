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
import precipSVG from "../assets/svgs/rain.svg";
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
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";

export default function Weather({
  place,
  weatherCode,
  precipitation,
  temperature,
}) {
  const getImageFromCode = () => {
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
  };

  const isWeatherCodeValid = () => {
    return WEATHER_CODES[weatherCode];
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.cityInfo}>
          <Text style={styles.city}>{place}</Text>
          <Text
            style={{
              color: "white",
              fontSize: 22,
            }}
          >
            {temperature}ºC
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          {isWeatherCodeValid() ? (
            <>
              {getImageFromCode()}
              <Text style={styles.conditions}>
                {WEATHER_CODES[weatherCode]}
              </Text>
              <View style={styles.precipitation}>
                <Image source={precipSVG} style={{ width: 20, height: 20 }} />
                <Text style={{ color: "white", fontSize: 18 }}>
                  {precipitation}mm
                </Text>
              </View>
            </>
          ) : (
            <>
              <QuestionMarkCircleIcon size={200} color="white" />
              <Text style={styles.conditions}>Unknown weather code</Text>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: "100%",
  },
  cityInfo: {
    display: "flex",
    flexDirection: "row",
    width: "350px",
    marginTop: 10,
    justifyContent: "space-around",
    alignItems: "baseline",
  },
  city: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  conditions: {
    color: "white",
    marginTop: 5,
    fontSize: 14,
    fontWeight: "200",
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
    marginVertical: 20,
  },
  precipitation: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    alignItems: "baseline",
  },
});
