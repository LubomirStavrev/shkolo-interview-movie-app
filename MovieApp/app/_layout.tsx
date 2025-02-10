import { ThemeProvider } from '@emotion/react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { CustomColors } from '../constants/colors';
import { CustomSpacings } from '../constants/spacings';

const theme = {
  colors: CustomColors, 
  spacing: CustomSpacings,
};

const RootLayout = () => {

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <ActionSheetProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </ActionSheetProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};


export default RootLayout;
