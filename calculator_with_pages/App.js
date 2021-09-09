import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import HistoryScreen from './HistoryScreen';





export default function App() {
  
  const Stack = createNativeStackNavigator();

  const [history, setHistory] = useState([]);

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home"> 
          {props => <HomeScreen {...props} history={history} setHistory={setHistory} />} 
        </Stack.Screen>
        <Stack.Screen name="History"> 
          {props => <HistoryScreen {...props} history={history} />}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar hidden={true} />
    </NavigationContainer>


  );
}