  
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import SettingsMenu from './SettingsMenu';
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