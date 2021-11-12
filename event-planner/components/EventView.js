import React from 'react';
import { Text, View, StyleSheet, FlatList, Button } from 'react-native';



export default function EventView({ route, navigation }) {
  const { title } = route.params;
  console.log('nn', title)
  return(
    <View>
      <Text>title: {JSON.stringify(title)} </Text>
      <Button title="Map of this event" onPress={() => navigation.navigate('MapView', {text: JSON.stringify(title)})} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      

    </View>
  );
}