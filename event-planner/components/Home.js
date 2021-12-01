import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';
import { typography, space, color } from 'styled-system'

import { useSelector, useDispatch } from 'react-redux'



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


  const de = useSelector(state => state.events)

  var sortedEvents = de.sort((a,b) => {
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
        <Text style={{ fontSize: 18, alignSelf:'center', margin: 4 }}>Upcoming events</Text>

        <FlatList
          style={{ marginLeft: 0, marginRight: 0 }}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({ item }) =>
            <View style={styles.listStyle} >
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
              <Button type='clear' buttonStyle={{ fontSize: 16, color: 'red', alignSelf: 'flex-end' }} onPress={() => wannaDelete(item)} title='delete' titleStyle={{ color: 'rgb(255, 102, 102)' }}></Button>

            </View>}
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
  },listStyle: {
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