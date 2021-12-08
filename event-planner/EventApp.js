import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home'
import { Ionicons } from '@expo/vector-icons';
import EventsNavigation from './components/EventsNavigation';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function EventApp() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          "tabBarActiveTintColor": "#fff",
          "tabBarInactiveTintColor": "rgb(191, 191, 191)",
          "tabBarActiveBackgroundColor": "rgb(0, 153, 204)",
          "tabBarInactiveBackgroundColor": "rgb(51, 102, 153)",
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ]
        }}
        screenOptions={({ route }) => ({
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
  )
}

