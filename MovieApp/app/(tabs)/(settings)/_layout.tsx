import { Stack, useNavigation } from "expo-router";
import React, { useEffect } from "react";

const SettingsLayout = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};
export default SettingsLayout;
