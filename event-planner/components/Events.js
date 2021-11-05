import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Button, Icon } from 'react-native-elements';


function Events({ navigation }) {

  const d = [
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
  ]

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>Events</Text>
      <Button title="Mores..." onPress={() => navigation.navigate('More')} />
      <Button title="Map" onPress={() => navigation.navigate('MapView')} />


      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <FlatList
          style={{ marginLeft: "5%", marginRight: '5%' }}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({ item }) =>
            <View style={styles.listStyle}>
              <Text>
                {item.title} -
                {item.place} -
                {item.datetime} -
                </Text>
                <Button icon={<Icon
                  reverse
                  name='ios-american-football'
                  type='ionicon'
                  color='#517fa4'
                  onPress={() => navigation.navigate('EventView', { title: item.title })} />} type='clear' />

             
            </View>}
          data={d}
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