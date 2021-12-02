import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Button, Icon, Header, Input } from 'react-native-elements';
import { typography, space, color } from 'styled-system'

import { useSelector, useDispatch } from 'react-redux'
import { setFirebaseUrl } from '../store/firebaseReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Home({ navigation }) {

  const now = new Date
  console.log('now', now)

  const showDate = (d) => {
    const da = new Date(d)
    return da.getFullYear() + '-' + da.getMonth() + '-' + da.getDate()
  }

  const showTime = (d) => {
    const ti = new Date(d)
    return ti.getHours() + ':' + ti.getMinutes()
  }

  const [firebaseUrl, setFirebaseUrl] = useState('')
  const saveFirebaseUrl = async () => {
    try {
      await AsyncStorage.setItem('firebaseUrl', firebaseUrl);
    } catch (error) {
      console.log('Errorsavingdata', error);
    }
  }
  const readData = async () => {
    try {
      let value = await AsyncStorage.getItem('firebaseUrl');
      setFirebaseUrl(value)
      console.log('urlset', value)
    } catch (error) {
      console.log("moi", error)
    }
  }

  useEffect(() => {
    readData()

  }, []);

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
            placeholder='name'
            onChangeText={n => setFirebaseUrl(n)}
            value={firebaseUrl}
          />
          <Button 
          type='clear' 
          buttonStyle={{ fontSize: 16, color: 'blue', backgroundColor: 'rgb(0, 0, 0, 0.4)' }} 
          onPress={() => saveFirebaseUrl()} 
          title='set event finder term' 
          titleStyle={{ color: 'rgb(100, 102, 255)' }}></Button>

        </View>

        <Text style={{ fontSize: 22, alignSelf: 'center', margin: 4 }}>Upcoming events</Text>

        <FlatList
          style={{ marginLeft: 0, marginRight: 0 }}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => navigation.navigate('EventView', { itemdata: item })}>
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