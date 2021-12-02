import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home'
import { Ionicons } from '@expo/vector-icons';
import EventsNavigation from './components/EventsNavigation';
import { AntDesign } from '@expo/vector-icons';
import firebase from "firebase";
import { useDispatch } from 'react-redux';
// save event data to store for use everywhere inside the app
import { setEvents } from './store/eventReducer';
import { setFirebaseUrl } from './store/firebaseReducer';
// set firebaseurl so events can be sought at will


// ASYNC STORAGE ASENNETTU KÄYTÄ SITÄ LAITTEEN YKSILÖIMISEEN , 
// VAI PITÄISIKÖ SITTENKIN ANTAA KÄYTTÄJÄN ITSE VALITA, 
// JOTTA MONET VOISIVAT TARKASTELLA SAMOJA TAPAHTUMIA
// 

const Tab = createBottomTabNavigator();

export default function EventApp() {
  const dispatch = useDispatch()
  //const [events, setEvents] = useState([])

  // init event finder term
  const [finderUrl, setFinderUrl] = useState('')
  const readFinderData = async () => {
    try {
      let value = await AsyncStorage.getItem('firebaseUrl');
      setFinderUrl(value)
      console.log('urlset', value)
    } catch (error) {
      console.log("moi", error)
    }
  }
// PITÄIS OMAAN SERVICEEN
  useEffect(async () => {
    console.log(finderUrl)
    try {
      let val = await AsyncStorage.getItem('firebaseUrl')
      setFirebaseUrl(val)
    } catch (e) {
      console.log('e', e)
    }

    firebase.database().ref(`items/${finderUrl}`).on('value', snapshot => {

      if (snapshot.val() !== null) {
        const data = snapshot.val();
        const prods = Object.values(data);
        dispatch(setEvents(prods))
      }
    });
  
}, []);


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

