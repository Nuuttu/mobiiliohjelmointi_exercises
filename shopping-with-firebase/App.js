import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Dimensions } from 'react-native';

import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyBY6jcDj28YUrjd7YyFtJW1HajLTSw00J8",
  authDomain: "shopping-with-firebase.firebaseapp.com",
  databaseURL: "https://shopping-with-firebase-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "shopping-with-firebase",
  storageBucket: "shopping-with-firebase.appspot.com",
  messagingSenderId: "443134865988",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



export default function App() {
  
  const [ item, setItem ] = useState('');
  const [ amount, setAmount ] = useState('');
  const [ shoppingList, setShoppingList] = useState([]);
  const [ items, setItems ] = useState([]);

  

  useEffect(() => {
    firebase.database().ref('items/').on('value', snapshot=> {
      const data = snapshot.val();
      const prods = Object.values(data);
      setItems(prods);
    });
  }, []);

  // Save
  const saveItem = () => {
    firebase.database().ref('items/').push({'item': item, 'amount': amount});
  }

  // Update
  const updateList = () => {
    
  }

  // Delete
  const deleteItem = (id) => {
    console.log('itemid', id)
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
          <FlatList 
            data={items} 
            keyExtractor={(item, index) => index.toString()} 
            renderItem={({item}) => 
              <View style={styles.listContainer}>
                <Text style={{fontSize: 18}}>{item.item}, {item.amount}</Text>
                <Text style={{fontSize: 16, color: '#0000ff', alignSelf: 'flex-end'}} onPress={() => deleteItem(item)}> Delete</Text>
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
