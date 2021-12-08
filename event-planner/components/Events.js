import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import firebase from 'firebase';

function Events({ route, navigation }) {
  console.log('events route params', route)

  const dispatch = useDispatch()


  const de = useSelector(state => state.eventReducer.events)
  const firebaseUrl = useSelector(state => state.firebaseReducer.url)
  console.log('de', de)
  var sortedEvents = de.sort((a,b) => {
    return new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
  }).filter(a => { if(a.name !== undefined){ return a} })
  console.log('sorted', sortedEvents)

  const showDate = (d) => {
    const da = new Date(d)
    return da.getFullYear() + '-' + (da.getMonth() + 1) + '-' + da.getDate()
  }

  const showTime = (d) => {
    const ti = new Date(d)
    return ti.getHours() + ':' + ti.getMinutes()
  }
  // DELETE CONFIRM
  const wannaDelete = (item) =>
    Alert.alert(
      "Deleting",
      item.name,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed", firebaseUrl),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteItem(item) }
      ]
    );

  // Delete
  const deleteItem = (item) => {
    firebase.database().ref().child(`items/${firebaseUrl}`).orderByChild("name").equalTo(item.name)
      .on("child_added", function (snapshot) {
        console.log('to delete', snapshot.key);
        if(firebaseUrl === ''){
          firebase.database().ref(`items/${snapshot.key}`).remove()
        } else {
        firebase.database().ref(`items/${firebaseUrl}/${snapshot.key}`).remove()
        }
      });

  }

  return (
    <ImageBackground
        source={require('../images/vuori1.jpg')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.5 }}
        style={styles.image}
      >
      
        <Text style={{ fontSize: 18 }}>Events</Text>
        <Button type='clear' buttonStyle={{ color: 'rgb(0,0,0,0.2'}} title="Create event" onPress={() => navigation.navigate('EventCreateForm')} />
        <Button title="Map of all events" onPress={() => navigation.navigate('MapView', { itemdata: { name: "All events" }, de })} />


        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <FlatList
            style={{ marginLeft: 0, marginRight: 0 }}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) =>
              <View style={styles.listStyle}>
                <TouchableOpacity onPress={() => navigation.navigate('EventView', { itemdata: item })}>
                  <View style={{ flexDirection: 'column' }}>
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
                {item.coordinates &&
                  <Button icon={<Icon
                    reverse
                    name='ios-navigate'
                    type='ionicon'
                    color='#517fa4'
                    onPress={() => navigation.navigate('MapShowCoordinates', { itemdata: item })} />} type='clear'
                  />
                }
                <Button type='clear' buttonStyle={{ fontSize: 16, color: 'red', alignSelf: 'flex-end' }} onPress={() => wannaDelete(item)} title='delete' titleStyle={{color: 'rgb(255, 102, 102)'}}></Button>

              </View>}
            data={sortedEvents}
          />
        </View>
      
    </ImageBackground>
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
    borderBottomColor: 'grey',
    borderStyle: 'solid',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(0,0,255,0.1)',
  },
  image: {
    flex: 1,
    justifyContent: "center",
    
  },


});

export default Events;