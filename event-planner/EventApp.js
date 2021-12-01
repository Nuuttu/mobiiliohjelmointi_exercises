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
import { setEvents } from './store/eventAction';

const Tab = createBottomTabNavigator();

export default function EventApp() {
  const dispatch = useDispatch()
  //const [events, setEvents] = useState([])


  useEffect(() => {
    var eventList = []
    firebase.database().ref('items/').on('value', snapshot => {

      if (snapshot.val() !== null) {

        /* TÄMÄ TOIMISI; JOS PÄIVITTÄISI KIVASTI :>
            NYT TOIMII QUERY NIMEN KAUTTA DELETE NAPPULASSA
        snapshot.forEach( childSnapshot => {
          var childData = childSnapshot.val()
          var itemAdd = {
            name: childData.name,
            datetime: childData.datetime,
            coordinates: childData.coordinates,
            id: childSnapshot.key
          }
          eventList.push(itemAdd)
        })
        */
        const data = snapshot.val();
        const prods = Object.values(data);
        dispatch(setEvents(prods))
      }
    });
    /*
    firebase.database().ref('items/').on('value', snapshot=> {
      console.log('firebasee', snapshot.val())
      const data = snapshot.val();
      
      const prods = Object.values(data);
      let dataList = prods.map((d, i) => { console.log('map', d)})
      dispatch(setEvents(prods))
    });
    */
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

