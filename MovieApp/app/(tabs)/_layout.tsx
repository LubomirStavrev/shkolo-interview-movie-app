import { faCamera, faFileAlt, faHome, faUser, faWarning } from '@fortawesome/free-solid-svg-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import TabIcon from '../../components/TabIcon';

const TabsLayout = () => {

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { ...styles.tabBar, },
      }}
    >
      <Tabs.Screen
        name="(movies)"
        redirect={false}
        options={{
          title: 'Movies',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarInactiveTintColor: "#BDBDBD",
          tabBarActiveTintColor: "#FF8F71",
          tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) =>
            TabIcon({
              icon: faHome,
              color,
              size: 24,
              name: "Home",
              focused,
            }),
        }}
      />

      <Tabs.Screen
        name="(settings)"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarInactiveTintColor: "#BDBDBD",
          tabBarActiveTintColor: "#FF8F71",
          tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) =>
            TabIcon({
              icon: faUser,
              size: 24,
              color,
              name: "Profile",
              focused,
            }),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  tabBar: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: "black",
    borderStyle: 'solid',
    paddingVertical: 10,
    backgroundColor: '#15141F'
  },
});
