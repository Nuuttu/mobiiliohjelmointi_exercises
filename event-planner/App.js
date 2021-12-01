import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home'
import { Ionicons } from '@expo/vector-icons';
import EventsNavigation from './components/EventsNavigation';
import { AntDesign } from '@expo/vector-icons';
import store from './store/store';
import { Provider } from 'react-redux'
// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // using databse from previous app
  /*
  apiKey: "AIzaSyBY6jcDj28YUrjd7YyFtJW1HajLTSw00J8",
  authDomain: "shopping-with-firebase.firebaseapp.com",
  databaseURL: "https://shopping-with-firebase-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "shopping-with-firebase",
  storageBucket: "shopping-with-firebase.appspot.com",
  messagingSenderId: "443134865988",
  */
  apiKey: "AIzaSyDGrXeSMongfi_Z2DvoX7D3eYtiUY649QE",
  authDomain: "event-planner-86591.firebaseapp.com",
  databaseURL: "https://event-planner-86591-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "event-planner-86591",
  storageBucket: "event-planner-86591.appspot.com",
  messagingSenderId: "567128668505",
  
  //appId: "1:567128668505:web:e3d5dfe0f404b6989bf448"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

import EventApp from './EventApp';



export default function App() {
  


  return (
    // RECONFIGURING APP STRUCTURE TO ENABLE REDUX FUNCTIONALITY
    <Provider store={store}>
   
      <EventApp />

    </Provider>
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
