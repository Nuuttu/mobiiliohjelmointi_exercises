import { StatusBar } from 'expo-status-bar';
import React, {  useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import MapView, { Marker, MyCustomMarkerView, MyCustomCalloutView, Callout } from 'react-native-maps';

export default function MapSetCoordinates({ route, navigation }) {
  console.log('mapSetCoordinates route params', route)

  // EHKÄ VOIS LAITTAA REGIONIKS KÄYTTÄJÄN SIJAINTI 
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.2922,
    longitudeDelta: 0.2921,
  })

  const [marker1, setMarker1] = useState({
    title: 'marker1',
    coordinates: {
      latitude: 60.201373,
      longitude: 24.934041,
    }
  })


  const handleMarker1Change = (e) => {
    setMarker1({...marker1, coordinates: e.nativeEvent.coordinate })
  }



  console.log('coordinates', marker1.coordinates)

  return (
    <View style={styles.container}>

      <MapView 
        style={{ flex: 3, width: '100%' }} 
        initialRegion={region}  
        onPress={(e) => handleMarker1Change(e)}
        >
          <Marker 
            
            coordinate={marker1.coordinates} 
            title={marker1.title} 
            onPress={(e) => handleMarker1Change(e)}
            >  
          </Marker>
        

      </MapView>
      <View containerViewStyle={{width: Dimensions.get('window').width}}>
        
          <Button 
            containerViewStyle={{
              width: Dimensions.get('window').width,
              marginLeft: 0,
            }}
            buttonStyle={{width:"100%"}} 
            title='Set Coordinates'
            onPress={() => {
              route.params?.CallBackCoordinates(marker1.coordinates)
              navigation.goBack()
            } }
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
  },
  buttonView: {
    flexDirection: 'row', 
    width: width, 
    marginLeft: 0, 
    marginRight: 0
  }
});

