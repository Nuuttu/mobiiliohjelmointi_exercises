import { StatusBar } from 'expo-status-bar';
import React, {  useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import MapView, { Marker, MyCustomMarkerView, MyCustomCalloutView, Callout } from 'react-native-maps';

export default function MapShowCoordinates({ route, navigation }) {
  console.log('mapShowCoordinates route params', route)

  const coords = {
    "latitude": parseFloat(route.params.itemdata.coordinates.latitude), 
    "longitude": parseFloat(route.params.itemdata.coordinates.longitude), 
  }
  console.log('corods', coords)

  const [region, setRegion] = useState({
    latitude: coords.latitude,
    longitude: coords.longitude,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  })

  const [marker1, setMarker1] = useState({
    title: 'marker1',
    coordinates: {
      latitude: 60.201373,
      longitude: 24.934041,
    }
  })


  return (
    <View style={styles.container}>

      <MapView style={{ flex: 3, width: '100%' }} initialRegion={region}  >
        <Marker 
          
          coordinate={coords} 
          title={marker1.title} 
          >  
        </Marker>
        

      </MapView>
      <View containerViewStyle={{width: Dimensions.get('window').width}}>
        
          <Button 
          containerViewStyle={{
            width: Dimensions.get('window').width,
            marginLeft: 0,
          }}
          buttonStyle={{width: width}} 
          title='Back'
          onPress={() => navigation.goBack()}
          ></Button>
              
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  buttonView: {
    flexDirection: 'row', 
    width: width, 
    marginLeft: 0, 
    marginRight: 0
  }
});

