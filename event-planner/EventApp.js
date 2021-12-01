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
// set firebaseurl so events can be sought at will
import { setFirebaseUrl } from './store/firebaseReducer';

// ASYNC STORAGE ASENNETTU KÄYTÄ SITÄ LAITTEEN YKSILÖIMISEEN , 
// VAI PITÄISIKÖ SITTENKIN ANTAA KÄYTTÄJÄN ITSE VALITA, 
// JOTTA MONET VOISIVAT TARKASTELLA SAMOJA TAPAHTUMIA
// https://haagahelia-my.sharepoint.com/personal/h01270_haaga-helia_fi/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fh01270%5Fhaaga%2Dhelia%5Ffi%2FDocuments%2FReact%5FMaterial%2FMobile%2FReact%5Fnative%5Fdatabase%5Ffirebase%2Epdf&parent=%2Fpersonal%2Fh01270%5Fhaaga%2Dhelia%5Ffi%2FDocuments%2FReact%5FMaterial%2FMobile

const Tab = createBottomTabNavigator();

export default function EventApp() {
  const dispatch = useDispatch()
  //const [events, setEvents] = useState([])



  useEffect(() => {

    firebase.database().ref('items/').on('value', snapshot => {

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
      tabBarOptions={{
       activeTintColor: '#fff',
       inactiveTintColor: 'rgb(191, 191, 191)',
       activeBackgroundColor: 'rgb(0, 153, 204)',
       inactiveBackgroundColor: 'rgb(51, 102, 153)',
           style: {
                 backgroundColor: '#CE4418',
                 paddingBottom: 3
           }
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

