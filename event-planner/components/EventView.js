import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';



export default function EventView({ route, navigation }) {
  const { title } = route.params;
  console.log('nn', title)
  return(
    <Text>title: {JSON.stringify(title)} </Text>
  );
}