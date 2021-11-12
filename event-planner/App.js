import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home'
import { Ionicons } from '@expo/vector-icons';
import EventsNavigation from './components/EventsNavigation';
import { AntDesign } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    
   
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'md-home';
              return <Ionicons name={iconName} size={size} color={color} />
            }
            else if (route.name === 'Events')
              iconName = 'md-settings';
            return <AntDesign name="bars" size={size} color={color} />
          },
           headerShown: false
        })}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Events" component={EventsNavigation} />
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
