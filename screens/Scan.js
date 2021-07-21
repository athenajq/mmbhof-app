import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, SafeAreaView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";
import bike_info from "../bike_info.json";


export default function Scan(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [bounds, setBounds] = useState(null);
  const [corners, setCorners] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ bounds, data }) => {
    setScanned(true);
    setBounds(bounds);
    setTimeout(() => {
      setScanned(false);
      props.navigation.navigate("Bike", {
        image: { uri: bike_info[data].image },
        title: bike_info[data].title,
        subtitle: bike_info[data].type,
        description: bike_info[data].description,
      });
    }, 1500);
  };

  if (hasPermission === null) {
    console.warn("null perms");
    return (
      <SafeAreaView>
        <Text>Requesting for camera permission</Text>
      </SafeAreaView>
    );
  }
  if (hasPermission === false) {
    return (
      <SafeAreaView>
        <Text>No access</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? null : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Ionicons
          size={bounds.size.height + 5}
          color={"#FC6351"}
          name="scan-outline"
          style={(styles.icon, { top: bounds.origin.y, left: bounds.origin.x })}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "yellow",
  },
  icon: {
    position: "absolute",
  },
});
