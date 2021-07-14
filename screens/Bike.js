import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";

export default function Bike(props) {
  const [speak, setSpeak] = useState(false);
  const [played, setPlayed] = useState(false);
  const description = `Pierre Michaux, his son Ernest and business partners, in Paris, were the first commercial makers of pedal bicycles, in the mid to late 1860s. At the time the vehicles were called velocipedes. Competitors began to build velocipedes as well, and this example could be by one of them. 

Cranks and pedals are on the front wheel, a direct-drive system. One turn of the pedals takes you the circumference of the wheel. This velocipede's 36-inch drive wheel provides a very low gear compared to bicycles of today. Cradles above the front wheel (forward of the head tube) allowed riders to rest their legs when coasting down hills. A handlebar-operated rear brake provided some (marginal) sense of safety.

The Calcium King acetylene lantern displayed on the velocipede is from a different period - the 1890s.`;

  const play = async () => {
    setSpeak(!speak);
    if (speak && !played) {
      Speech.speak(description, {
        onDone: () => {
          console.warn("done");
          setSpeak(false);
          setPlayed(false);
        },
      });
      setPlayed(true);
    } else if (speak && played) {
      Speech.resume();
      setPlayed(true);
    } else if (!speak) {
      setPlayed(true);
      Speech.pause();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={require("../assets/bike.jpg")} style={styles.bike} />
      <Text style={styles.title}>1868 Velocipede</Text>
      <Text style={styles.subtitle}>Object/Artifact</Text>
      <View style={styles.audioContainer}>
        <Image source={require("../assets/playBack.png")} />
        <View style={styles.controlsContainer}>
          <Ionicons
            name={"play-back-outline"}
            size={23}
            style={styles.controls}
          />
          <TouchableOpacity
            onPress={() => {
              play();
            }}
          >
            <Ionicons
              name={speak ? "play-outline" : "pause-outline"}
              size={28}
              style={styles.controls}
            />
          </TouchableOpacity>
          <Ionicons
            name="play-forward-outline"
            size={23}
            style={styles.controls}
          />
        </View>
      </View>
      <Text style={styles.subheading}>Description</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={{ height: 50 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    left: "10%",
    top: 10,
  },
  subtitle: {
    left: "10%",
    top: 10,
  },
  bike: {
    width: "80%",
    aspectRatio: 3 / 2,
    alignSelf: "center",
    height: undefined,
  },
  audioContainer: {
    top: 30,
    width: "100%",
    alignItems: "center",
  },
  controlsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  controls: {
    marginTop: 8,
    marginLeft: 12,
    marginRight: 12,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "500",
    left: "10%",
    top: 35,
  },
  description: {
    left: "10%",
    top: 40,
    width: "83%",
    textAlign: "left",
  },
});
