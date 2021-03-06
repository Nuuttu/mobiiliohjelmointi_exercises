import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Icon, Header, Input } from 'react-native-elements';
import firebase from 'firebase';
import DatetimePicker from './DatetimePicker';
import TimePicker from './TimePicker';
import { useSelector } from 'react-redux'

function EventCreateForm({ navigation }) {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [dt, setDt] = useState(new Date)
  const firebaseUrl = useSelector(state => state.firebaseReducer.url)

  // Save
  const saveE = () => {
    console.log('rburl', firebaseUrl)
    if (name !== '') {

      if (latitude === null || longitude === null) {
        firebase.database().ref(`items/${firebaseUrl}`).push({
          'name': name,
          'datetime': dt.toString(),
        })
      } else {
        firebase.database().ref(`items/${firebaseUrl}`).push({
          'name': name,
          'datetime': dt.toString(),
          coordinates: {
            'latitude': parseFloat(latitude),
            'longitude': parseFloat(longitude)
          }
        });
      }
    } else {
      alert("needs a name")
    }
    navigation.goBack()
  }

  const clear = () => {
    navigation.goBack()
  }
  
  const [coordsButtonText, setCoordsButtonText] = useState('Select on map')
  const [coordsButtonType, setCoordsButtonType] = useState('solid')

  // TÄMÄN FUNKTION KANSSA JOKU VAROITUS, MUTTA SEN KAI VOI VAIN OHITTAA
  // NAVIGAATIO VAROITUS SIIS
  const CallBackCoordinates = (p) => {
    setLatitude(p.latitude)
    setLongitude(p.longitude)
    setCoordsButtonText('Place Selected')
    setCoordsButtonType('clear')
  }

  return (

    <ImageBackground
      source={require('../images/pilvi1.jpg')}
      resizeMode="cover"
      imageStyle={{ opacity: 0.2 }}
      style={styles.image}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, marginTop: 10, marginBottom: 2 }}>Create a new Event</Text>
          <Text style={{ fontSize: 18, marginTop: 3, marginBottom: 10 }}>event term: {firebaseUrl}</Text>
          <Input
            placeholder='name'
            onChangeText={n => setName(n)}
            value={name}
          />
          <DatetimePicker dt={dt} setDt={setDt} />
          <TimePicker dt={dt} setDt={setDt} />
          <View style={{ width: '100%' }}>
            <Button
              type={coordsButtonType}
              onPress={() => navigation.navigate('MapSetCoordinates', { CallBackCoordinates: CallBackCoordinates })}
              title={coordsButtonText}
            />
          </View>
          <View style={{ width: '100%', }}>
            <Button buttonStyle={{ backgroundColor: 'green' }} style={{ width: 40 }} onPress={saveE} title='Add' />
            <Button onPress={clear} type='outline' title='Cancel' />
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
  },
  listInput: {
    height: 30,
    width: 250,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 4
  },
  blueText: {
    fontWeight: '700',
    color: 'blue',
  },
  listContainer: {
    width: width - 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'space-between'
  },
  redtext: {
    fontSize: 18, color: 'red'
  },
  image: {
    flex: 1,
    justifyContent: "center",

  },
});

export default EventCreateForm;