import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import { setEvents } from '../store/eventAction';
import { SET_EVENTS } from '../store/eventTypes';
import EventFormModal from './EventFormModal';

function Events({ route, navigation }) {
  console.log('events route params', route)

  const dispatch = useDispatch()
  
  const [ d, setD ] = useState([
    {
      title: 'Dee',
      place: 'Katu',
      datetime: '32-12-3212-12.12.32'
    },
    {
      title: 'Dee',
      place: 'Kat3',
      datetime: '22-52-3212-12.12.32'
    },
    {
      title: 'Dasd',
      place: 'Katu2',
      datetime: '12-42-3212-12.12.32'
    }
  ])

  //dispatch(setEvents(d))

  const de = useSelector(state => state.events)
  console.log('de', de)
  console.log('route to events', route)

  // Delete
  const deleteItem = (id) => {
    console.log('itemid', id)
    //firebase.database().ref('Users/' + userId).remove();
  }

//         ASDASDASDASDASD ASDASCIUDHNOAISHUCDOAUSHCDOUH ___________________ DELETE ID FIREBASESTA ???

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>Events</Text>
      <Button title="Create event" onPress={() => navigation.navigate('EventCreateForm')} />
      <Button title="Map of all events" onPress={() => navigation.navigate('MapView', {itemdata: { name: "All events"}, de})} />


      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <FlatList
          style={{ marginLeft: "5%", marginRight: '5%' }}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({ item }) =>
            <View style={styles.listStyle}>
              <Text>
                {item.name} -
                {item.place} -
                {item.datetime} -
                </Text>
                <Button icon={<Icon
                  reverse
                  name='ios-american-football'
                  type='ionicon'
                  color='#517fa4'
                  onPress={() => navigation.navigate('EventView', { itemdata: item })} />} type='clear' 
                  />
                <Button style={{fontSize: 16, color: '#0000ff', alignSelf: 'flex-end'}} onPress={() => deleteItem(item)} title='delete'></Button>
            </View>}
          data={de}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  listStyle: {
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderStyle: 'solid',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  

});

export default Events;