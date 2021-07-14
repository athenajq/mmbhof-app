import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";

import Scan from "../screens/Scan";
import Bike from "../screens/Bike";

export default function Navigation() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Scan" component={Scan} />
        <Stack.Screen name="Bike" component={Bike} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
