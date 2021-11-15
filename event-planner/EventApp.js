import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home'
import { Ionicons } from '@expo/vector-icons';
import EventsNavigation from './components/EventsNavigation';
import { AntDesign } from '@expo/vector-icons';
import firebase from "firebase";
import { useDispatch } from 'react-redux';
import { setEvents } from './store/eventAction';

const Tab = createBottomTabNavigator();

export default function EventApp() {
  const dispatch = useDispatch()
  //const [events, setEvents] = useState([])


  useEffect(() => {
    firebase.database().ref('items/').on('value', snapshot=> {
      const data = snapshot.val();
      console.log('data from firebase', data)
      const prods = Object.values(data);
      console.log('prods from firebase', prods)
      dispatch(setEvents(prods))
    });
  }, []);

  

  //console.log('events', events)

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
  )
}

 