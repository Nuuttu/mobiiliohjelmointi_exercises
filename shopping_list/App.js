import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [listItem, setListItem] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  const add = () => {
    setShoppingList([...shoppingList, {key: listItem}])
    setListItem('')
  }

  const clear = () => {
        
    setShoppingList([])
  }

  return (
    <View style={styles.container}>
      <View style={{height:100, flex:1}}>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <TextInput 
            style={styles.listInput} 
            onChangeText={n => setListItem(n)}
            value={listItem} />
          <View style={{width: '100%',flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
            <Button style={{width: 20}} onPress={add} title='Add'/>
            <Button onPress={clear} title='Clear'/>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.blueText}>Shoppinglist:</Text>
          {/* <Text>{history.map((n, i) => {return ( n + '\n')})}</Text> */}
          <FlatList 
            data={shoppingList} 
            renderItem={({item}) => <Text>{item.key}</Text>} 
            keyExtractor={item => item.id}
          />
        </View>
        <StatusBar style="auto" />
      </View>

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  redtext: {fontSize:18, color: 'red'},
});
