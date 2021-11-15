import React from 'react';
import { Text, View, StyleSheet, FlatList, Button } from 'react-native';



export default function EventView({ route, navigation }) {
  const { name } = route.params;
  console.log('route.parma', route)
  return(
    <View>
      <Text>title: {name} </Text>
      <Button title="Map of this event" onPress={() => navigation.navigate('MapView', {text: name})} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      

    </View>
  );
}