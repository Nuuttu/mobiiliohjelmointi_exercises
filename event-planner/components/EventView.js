import React from 'react';
import { Text, View, StyleSheet, FlatList, Button } from 'react-native';



export default function EventView({ route, navigation }) {
  console.log('event route params', route)
  return(
    <View>
      <Text>title: {route.params.itemdata.name} </Text>
      <Button 
      title="Map of this event" 
      onPress={() => navigation.navigate('MapShowCoordinates', {itemdata: route.params.itemdata})} 
      />
      <Button 
      title="Go back" 
      onPress={() => navigation.goBack()} 
      />
      

    </View>
  );
}