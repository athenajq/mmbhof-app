import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import Navigation from "./config/Navigation";
import Scan from "./screens/Scan";
import Bike from "./screens/Bike";

export default function App() {
  return <Navigation />;
}
