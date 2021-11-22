import { StatusBar } from 'expo-status-bar';
import React, {  useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import MapView, { Marker, MyCustomMarkerView, MyCustomCalloutView, Callout } from 'react-native-maps';

export default function MapPage({ route, navigation }) {
  console.log('map route params', route)

  //const baseUrl = 'http://www.mapquestapi.com/datamanager/v2/get-custom-permissions?key=KEY&inFormat=json&outFormat=json'
  const [ placeFrom, setPlaceFrom ] = useState('')
  const [ placeTo, setPlaceTo ] = useState('')

  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
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


  const handleMarker1Change = (e) => {
    setMarker1({...marker1, coordinates: e.nativeEvent.coordinate })
  }

  const handlePlaceFromChange = (e) => {  
    setPlaceFrom(e.target.value)
  }

  const handlePlaceToChange = (e) => {  
    setPlaceTo(e.target.value)
  }


  console.log('coordinates', marker1.coordinates)

  return (
    <View style={styles.container}>

      <MapView style={{ flex: 3, width: '100%' }} initialRegion={region}  >
        <Marker 
          coordinate={marker1.coordinates} 
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
          buttonStyle={{width:"100%"}} 
          title='Back to events'
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
  },
  buttonView: {
    flexDirection: 'row', 
    width: width, 
    marginLeft: 0, 
    marginRight: 0
  }
});

