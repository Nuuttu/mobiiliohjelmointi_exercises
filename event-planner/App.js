import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home'
import SettingsMenu from './components/SettingsMenu';
import Settings from './components/Settings'
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') 
          iconName = 'md-home'; 
        else if (route.name === 'Settings')   
          iconName = 'md-settings';
        
        return <Ionicons name={iconName} size={size} color={color} />
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={SettingsMenu} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
