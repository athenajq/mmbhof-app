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

export default function Bike({ route }) {
  const [speak, setSpeak] = useState(false);
  const [played, setPlayed] = useState(false);
  const { image, title, subtitle, description } = route.params;
  const play = async () => {
    setSpeak(!speak);
    const speaking = await Speech.isSpeakingAsync();
    if (!speaking) {
      Speech.speak(description, {
        onDone: () => {
          setSpeak(false);
          setPlayed(false);
        },
      });
    }
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
      <Image source={image} style={styles.bike} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
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
      <View style={{ height: 70 }}></View>
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
