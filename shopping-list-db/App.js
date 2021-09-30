import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Dimensions } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppinglistdb.db');

export default function App() {
  
  const [ item, setItem ] = useState('');
  const [ amount, setAmount ] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppingList (id integer primary key not null, item text, amount text);');
    });
    updateList();    
  }, []);

  // Save
  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shoppingList (item, amount) values (?, ?);', [ item, amount ]);    
      }, null, updateList
    )
  }

  // Update
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoppingList;', [], (_, { rows }) =>
        setShoppingList(rows._array)
      ); 
    });
  }

  // Delete
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from shoppingList where id = ?;`, [id]);
      }, null, updateList
    )    
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };


  const clear = () => {
    db.transaction(
      tx => {
        tx.executeSql(`drop table if exists shoppingList;`);
      }, null, updateList
    )
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppingList (id integer primary key not null, item text, amount text);');
    });
    updateList();    
  }

  return (
    <View style={styles.container}>
      <View style={{height:100, flex:1}}>
        <View style={{height: 150, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <TextInput 
            style={styles.listInput} 
            onChangeText={n => setItem(n)}
            value={item} />
            <TextInput 
            style={styles.listInput} 
            onChangeText={n => setAmount(n)}
            value={amount} />
          <View style={{width: '100%',flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
            <Button style={{width: 20}} onPress={saveItem} title='Add'/>
            <Button onPress={clear} title='Clear'/>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.blueText}>Shoppinglist:</Text>
          {/* <Text>{history.map((n, i) => {return ( n + '\n')})}</Text> */}
          <FlatList 
            data={shoppingList} 
            keyExtractor={item => item.id} 
            renderItem={({item}) => 
              <View style={styles.listContainer}>
                <Text style={{fontSize: 18}}>{item.item}, {item.amount}</Text>
                <Text style={{fontSize: 16, color: '#0000ff', alignSelf: 'flex-end'}} onPress={() => deleteItem(item.id)}> Delete</Text>
              </View>}
            ItemSeparatorComponent={listSeparator} 
          />
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
