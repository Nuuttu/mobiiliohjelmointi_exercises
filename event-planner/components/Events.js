import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import { setEvents } from '../store/eventAction';
import { SET_EVENTS } from '../store/eventTypes';
import EventFormModal from './EventFormModal';
import firebase from 'firebase';

function Events({ route, navigation }) {
  console.log('events route params', route)

  const dispatch = useDispatch()


  //dispatch(setEvents(d))

  const de = useSelector(state => state.events)
  console.log('de', de)
  console.log('route to events', route)

  const showDate = (d) => {
    const da = new Date(d)
    return da.getFullYear() + '-' + da.getMonth() + '-' + da.getDate()
  }

  const showTime = (d) => {
    const ti = new Date(d)
    return ti.getHours() + ':' + ti.getMinutes()
  }

  // Delete
  const deleteItem = (item) => {
    
    var a = firebase.database().ref().child("items/").orderByChild("name").equalTo(item.name)
    .on("child_added", function(snapshot) {
      console.log('to delete', snapshot.key);
      firebase.database().ref(`items/${snapshot.key}`).remove()
    });

    console.log('itemid', a)
    //firebase.database().ref(`items/${item.id}`).remove()
    
    

    /*
      function deleteTodo(clickedElement) {
          const key = clickedElement.parentElement.getAttribute('data-key');
          firebase.database().ref('tasks').child(key).remove();
      }
    */
    
     /*       .remove()
    .then(console.log('success'))
    .catch(function(e) {
      console.log('error', e)
    })
    

    /*
     firebase.database().ref('items/').push({
      'name': name, 
      'datetime': dt.toString(), 
      coordinates: {
        'latitude': parseFloat(latitude), 
        'longitude': parseFloat(longitude)
      }
    }
    );
     */
    //firebase.database().ref('Users/' + userId).remove();
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>Events</Text>
      <Button title="Create event" onPress={() => navigation.navigate('EventCreateForm')} />
      <Button title="Map of all events" onPress={() => navigation.navigate('MapView', { itemdata: { name: "All events" }, de })} />


      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <FlatList
          style={{ marginLeft: 0, marginRight: 0 }}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({ item }) =>
            <View style={styles.listStyle} >
              <TouchableOpacity onPress={() => navigation.navigate('EventView', { itemdata: item })}>
                <View style={{ flexDirection: 'column'}}>
                  <Text style={{ fontWeight: 'bold' }}>
                    {item.name}
                  </Text>
                  <Text>
                    {showDate(item.datetime)}
                  </Text>
                  <Text>
                    {showTime(item.datetime)}
                  </Text>
                </View>
              </TouchableOpacity>
             <Button  icon={<Icon
                reverse
                name='ios-navigate'
                type='ionicon'
                color='#517fa4'
                onPress={() => navigation.navigate('MapShowCoordinates', {itemdata: item})} />} type='clear'
              />
              
              <Button style={{ fontSize: 16, color: '#0000ff', alignSelf: 'flex-end' }} onPress={() => deleteItem(item)} title='delete'></Button>

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
    display: 'flex',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderStyle: 'solid',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },


});

export default Events;