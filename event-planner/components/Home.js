import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Button, Icon, Header, Input } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import { setFirebaseUrl } from '../store/firebaseReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "firebase";
import { setEvents } from '../store/eventReducer';

function Home({ navigation }) {
  const dispatch = useDispatch()

  // SAVING DATE TO COMPARE TO SHOW ONLY UPCOMING EVENTS
  const now = new Date
  console.log('now', now)

  // SHOW DATE AND TIME PROPERLY FROM DATE STRING SAVED IN FIREBASE
  const showDate = (d) => {
    const da = new Date(d)
    return da.getFullYear() + '-' + (da.getMonth() + 1) + '-' + da.getDate()
  }
  const showTime = (d) => {
    const ti = new Date(d)
    return ti.getHours() + ':' + ti.getMinutes()
  }

  // WHEN EVENT SEARCH TERM HAS BEEN SELECTED, SET TERM FOR EVENT SEARCH IN FIREBASE
  // USING REDUX SAVE THE TERM AND LIST OF EVENT FROM FIREBASE
  const [finderUrl, setFinderUrl] = useState('')
  const saveFinderUrl = async () => {
    try {
      await AsyncStorage.setItem('firebaseUrl', finderUrl);
      firebase.database().ref(`items/${finderUrl}`).on('value', snapshot => {
        if (snapshot.val() !== null) {
          const data = snapshot.val();
          const prods = Object.values(data);
          dispatch(setFirebaseUrl(finderUrl))
          dispatch(setEvents(prods))
        } else {
          dispatch(setFirebaseUrl(finderUrl))
          dispatch(setEvents([
            { "name": "No Events found", "datetime": "404" },
          ]))
        }
      })
    } catch (error) {
      console.log('Errorsavingdata', error);
    }
  }

  // GET TERM UNDER WHICH EVENT ARE SAVED ON FIREBASE, THEN GET THE LIST OF THE EVENTS
  // RUNNING THIS WITH USEEFFECT
  const readData = async () => {
    try {
      let value = await AsyncStorage.getItem('firebaseUrl');
      if (value === null) {
        setFinderUrl('')
        value = ''
        dispatch(setFirebaseUrl(''))
      } else {
        setFinderUrl(value)
        dispatch(setFirebaseUrl(value))
      }
      console.log('urlset', value)
      firebase.database().ref(`items/${value}`).on('value', snapshot => {
        if (snapshot.val() !== null) {
          const data = snapshot.val();
          const prods = Object.values(data);
          dispatch(setEvents(prods))
        }
      })
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    readData()

  }, []);

  // SORT LIST 
  const de = useSelector(state => state.eventReducer.events)
  var sortedEvents = de.sort((a, b) => {
    return new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
  })
  var ucEvents = sortedEvents.filter(e => new Date(e.datetime).getTime() >= now.getTime())

  return (

    <ImageBackground
      source={require('../images/pilvi1.jpg')}
      resizeMode="cover"
      imageStyle={{ opacity: 0.5 }}
      style={styles.image}
    >
      <Header
        centerComponent={{ text: 'Event planner', style: { color: '#fff' } }}
      />
      <View style={styles.container}>
        <View >
          <Input
            autoCapitalize="none"
            placeholder='event finder term'
            onChangeText={n => setFinderUrl(n)}
            value={finderUrl}
            onSubmitEditing={() => saveFinderUrl()}
          />
          <Button
            type='clear'
            buttonStyle={{ fontSize: 16, color: 'blue', backgroundColor: 'rgb(0, 0, 0, 0.4)' }}
            onPress={() => saveFinderUrl()}
            title='set event finder term'
            titleStyle={{ color: 'rgb(100, 102, 255)' }}></Button>
        </View>
        <Text style={{ fontSize: 22, alignSelf: 'center', margin: 4 }}>Upcoming events</Text>
        <FlatList
          style={{ marginLeft: 0, marginRight: 0 }}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => navigation.navigate('Events', { screen: 'EventView', initial: false, params: { itemdata: item } })}>
              <View style={styles.listStyle} >
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                    {item.name}
                  </Text>
                </View>
                <Text>
                  {showDate(item.datetime)}
                </Text>
                <Text>
                  {showTime(item.datetime)}
                </Text>
              </View>
            </TouchableOpacity>
          }
          data={ucEvents}
        />
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            position: 'absolute',
            bottom: 10,
            right: 10,
            height: 70,
            backgroundColor: '#fff',
            borderRadius: 100,
          }}
          onPress={() => navigation.navigate('Events', {screen: 'EventCreateForm', initial: false } )}
        >
          <AntDesign name='plus' size={30} color='#01a699' />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  image: {
    flex: 1,
    justifyContent: "center",
  }, listStyle: {
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
});

export default Home;