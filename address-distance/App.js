import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import MapView, { Marker, MyCustomMarkerView, MyCustomCalloutView, Callout } from 'react-native-maps';

export default function App() {
  const baseUrl = 'http://www.mapquestapi.com/datamanager/v2/get-custom-permissions?key=KEY&inFormat=json&outFormat=json'
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
      longitude: 24.934041
    }
  })

  const [marker2, setMarker2] = useState({
    title: 'marker2',
    coordinates: {
      latitude: 60.203363,
      longitude: 24.935231
    }
  })
  /*
    useEffect(() =>{
      fetch(baseUrl)
      .then(response => response.json())
      .then(data => {
        console.log('data', data)
        setRegion( ...region, {
          latitude: data.results.providedLocation.locations.latLng.lat,
          longitude: data.results.providedLocation.locations.latLng.lng
        })
      })
      .catch((e) => {
        console.log('error', e)
      })
    }, [])
    */

  /*
  async function postData(url = '') {
    console.log('response')
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    console.log('response')
    return response.json()
  }
  */

  /**
   * http://www.mapquestapi.com/datamanager/v2/get-custom-permissions?key=KEY&inFormat=json&outFormat=json
   * 
   */


  const handleMarker1Change = (e) => {
    setMarker1({...marker1, coordinates: e.nativeEvent.coordinate })

  }

  const handleMarker2Change = (e) => {
    setMarker2({...marker2, coordinates: e.nativeEvent.coordinate })

  }

  const handlePlaceFromChange = (e) => {  
    setPlaceFrom(e.target.value)
  }

  const handlePlaceToChange = (e) => {  
    setPlaceTo(e.target.value)
  }

  const handleMeasurePress = () => {
    setRegion({...region, latitude: (marker1.coordinates.latitude + marker2.coordinates.latitude) / 2, longitude: (marker1.coordinates.longitude + marker2.coordinates.longitude) / 2})
  }

  console.log('marker1 lat', marker1.coordinates.latitude)
  console.log('marker2 lat', marker2.coordinates.latitude)
  console.log('measere', marker1.coordinates.latitude + marker2.coordinates.latitude / 2 )

  return (
    <View style={styles.container}>

      <MapView style={{ flex: 3, width: '100%' }} region={region} >
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
      <View style={{ flexDirection: 'row'}}>
        <View style={styles.inputStyle}>
          <TextInput
            onChangeText={setPlaceFrom}
            keyboardAppearance='default'
            style={styles.inputStyle}
            placeholder=' Place from'
            value={placeFrom}
          />
          <TextInput
          onChangeText={setPlaceTo}
            keyboardAppearance='default'
            style={styles.inputStyle}
            placeholder=' Place to'
            value={placeTo}
          />
          <Button onPress={handleMeasurePress} title='MEASURE DISTANCE'></Button>
        </View>
        <View>
          <Button title='current location'></Button>
          <Button title='current location'></Button>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    minWidth: 250,
    borderColor: 'green',
    borderWidth: 1
  }
});