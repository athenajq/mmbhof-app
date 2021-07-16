import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, SafeAreaView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";

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

  const handleBarCodeScanned = ({ bounds }) => {
    setScanned(true);
    setBounds(bounds);
    setTimeout(() => {
      setScanned(false);
      props.navigation.navigate("Bike", {
        image: require("../assets/bike.jpg"),
        title: "1868 Velocipede",
        subtitle: "Object/Artifact",
        description: `Pierre Michaux, his son Ernest and business partners, in Paris, were the first commercial makers of pedal bicycles, in the mid to late 1860s. At the time the vehicles were called velocipedes. Competitors began to build velocipedes as well, and this example could be by one of them. 

Cranks and pedals are on the front wheel, a direct-drive system. One turn of the pedals takes you the circumference of the wheel. This velocipede's 36-inch drive wheel provides a very low gear compared to bicycles of today. Cradles above the front wheel (forward of the head tube) allowed riders to rest their legs when coasting down hills. A handlebar-operated rear brake provided some (marginal) sense of safety.
        
The Calcium King acetylene lantern displayed on the velocipede is from a different period - the 1890s.`,
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
