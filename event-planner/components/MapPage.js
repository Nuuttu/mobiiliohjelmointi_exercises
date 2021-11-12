import React from 'react';
//import MapView, { Marker } from "react-native-maps";
import { Text, View, StyleSheet, Button } from 'react-native';

export default function MapPage({ route, navigation }) {
console.log('route params', route)


return(
  <View style={styles.redContainer}>
    <Text>MAP PAGE</Text>
    <Text>{route.params.text}</Text>
  </View>
)}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redContainer: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// MUISTA tyylit, kartta ei näy iha jokaisella tavalla


/*
<MapView style={{ flex: 3, width: '100%' }} initialRegion={region}  >
    
    <Marker 
      draggable 
      coordinate={marker1.coordinates} 
      title={marker1.title} 
      onDragEnd={(e) => handleMarker1Change(e)}
      >  
    </Marker>
    <Marker 
      draggable 
      coordinate={marker2.coordinates} 
      title={marker2.title} 
      onDragEnd={(e) => handleMarker2Change(e)}
     >
    </Marker>

  </MapView>
  */