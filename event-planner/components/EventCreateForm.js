import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';
import { typography, space, color } from 'styled-system'


function EventCreateForm({ navigation }) {

  const [ event, setEvent ] = useState({
    "name": '',
    "coordinates": {
      "latitude": 0,
      "longitude": 0
    },
    "datetime": ''
  });
  const [ name, setName ] = useState('');
  const [ latitude, setLatitude ] = useState([]);
  const [ longitude, setLongitude ] = useState([]);
  const [ datetime, setDatetime ] = useState('');

  // Save
  const saveEvent = () => {
    firebase.database().ref('items/').push({
      'name': name, 
      'datetime': datetime, 
      'latitude': latitude, 
      'longitude': longitude});
  }

  const clear = () => {
    
  }

  return (
    <View style={styles.container}>
        
      <Text style={{ fontSize: 18 }}>EventCreateForm</Text>
      
      <Button 
      icon={<Icon 
        reverse 
        type="material"
        reversecolor="lightblue" 
        name="alarm" 
        onPress={() => navigation.navigate('Home')}
         />} 
      type='clear'
      />

      <View style={{height:100, flex:1}}>
        <View style={{height: 150, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <TextInput 
            style={styles.listInput} 
            onChangeText={n => setName(n)}
            value={name} 
            placeholder="name"
            />
            <TextInput 
            style={styles.listInput} 
            onChangeText={n => setDatetime(n)}
            value={datetime} 
            placeholder="date and time"
            />
            <TextInput 
            style={styles.listInput} 
            onChangeText={n => setLatitude(n)}
            value={latitude} 
            placeholder="latitude"
            />
            <TextInput 
            style={styles.listInput} 
            onChangeText={n => setLongitude(n)}
            value={longitude} 
            placeholder="longitude"
            />
          <View style={{width: '100%',flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
            <Button style={{width: 40}} onPress={saveEvent} title='Add'/>
            <Button onPress={clear} title='Clear'/>
          </View>
        </View>
        
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listInput: {
    width: 250,
    borderColor: 'green',
    borderWidth: 1
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
  redtext: {fontSize:18, color: 'red'},
});

export default EventCreateForm;