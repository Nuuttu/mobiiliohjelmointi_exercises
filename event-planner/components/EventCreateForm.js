import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';
import { typography, space, color } from 'styled-system'
import firebase from 'firebase';


function EventCreateForm({ navigation }) {
  const [value, setValue] = useState(0);
  const [ e, setE ] = useState({
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
  const saveE = () => {
    firebase.database().ref('items/').push({
      'name': name, 
      'datetime': datetime, 
      'latitude': latitude, 
      'longitude': longitude});
  }

  const clear = () => {
    
  }

  return (
    
    <View >
      {/*<View style={styles.container}> */}    
      <Text style={{ fontSize: 18 }}>EventCreateForm</Text>
      
      {/*
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
        */}

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
            <Button style={{width: 40}} onPress={saveE} title='Add'/>
            <Button onPress={clear} title='Clear'/>
          </View>
        </View>
        
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

/*
<Box alignItems="flex-end" p="8">
  <VStack alignItems="flex-end" space="5">
    <FormControl>
      <FormControl.Label mb="3">What's your event called?</FormControl.Label>
      <Input placeholder="Event's Name" />
    </FormControl>
    <FormControl>
      <FormControl.Label mb="3">When is your Event?</FormControl.Label>
      <Radio.Group nativeID="patani" name="day_night">
        <VStack space="3">
          <Radio value="day">Day</Radio>
          <Radio value="night">Night</Radio>
        </VStack>
      </Radio.Group>
    </FormControl>
    <Divider />
    <Checkbox size="sm" value="tnc" justifyContent="center" mb="4">
      I agree to Terms and conditions
    </Checkbox>
  </VStack>
  <Button mt="2" endIcon={<AddIcon size="3" />}>Create Event</Button>
</Box>
*/


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