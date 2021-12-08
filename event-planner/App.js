import React from 'react';
import { StyleSheet } from 'react-native';
import store from './store/store';
import { Provider } from 'react-redux'
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDGrXeSMongfi_Z2DvoX7D3eYtiUY649QE",
  authDomain: "event-planner-86591.firebaseapp.com",
  databaseURL: "https://event-planner-86591-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "event-planner-86591",
  storageBucket: "event-planner-86591.appspot.com",
  messagingSenderId: "567128668505",
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
    // RECONFIGURING APP STRUCTURE TO ENABLE REDUX STORE FUNCTIONALITY
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
