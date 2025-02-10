import { useAuth } from "../context/AuthContext";
import * as SystemUI from "expo-system-ui";
import React, { useEffect } from "react";
import LoginScreen from "./LoginScreen";
import WelcomeScreen from "./WelcomeScreen";
import { usePushNotifications } from "../hooks/usePushNotifications";
import { View } from "react-native";

SystemUI.setBackgroundColorAsync("white");

const IndexScreen = () => {
  const { authenticated } = useAuth();
  const { expoPushToken } = usePushNotifications();

  useEffect(() => {
    console.log('Push Token:', expoPushToken);
    
    if (authenticated && expoPushToken) {
      // Here you can send the push token to your backend
    }
  }, [authenticated, expoPushToken]);

  return (
    <View style={{ flex: 1 }}>
      {authenticated ? <WelcomeScreen /> : <LoginScreen />}
    </View>
  );
};

export default IndexScreen;
