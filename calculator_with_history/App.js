import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const sum = () => {
    setResult(parseInt(number1) + parseInt(number2))
    setNumber1('')
    setNumber2('')
    setHistory([...history, {key:(number1 + ' + ' + number2 + ' = ' + (parseInt(number1) + parseInt(number2)))}])
  }

  const minus = () => {
    var r = parseInt(number1) - parseInt(number2)
    setResult(r)
    setNumber1('')
    setNumber2('')
    setHistory([...history, {key:(number1 + ' - ' + number2 + ' = ' + (parseInt(number1) - parseInt(number2)))}])
  }

  return (
    <View style={styles.container}>
      <View style={{height:100, flex:1}}>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.redtext}>Result: {result}</Text>
          <Text style={styles.redtext}>Enter numbers!</Text>
          <TextInput 
            keyboardType='numeric'
            style={styles.numericInput} 
            onChangeText={n => setNumber1(n)}
            value={number1} />
          <TextInput 
            keyboardType='numeric'
            style={styles.numericInput} 
            onChangeText={number2 => setNumber2(number2)}
            value={number2} />
          <View style={{width: '40%',flexDirection: 'row', justifyContent: 'space-around', alignItems:'center'}}>
            <Button style={{width: 20}} onPress={sum} title='+'/>
            <Button style={{width: 20}} onPress={minus} title='-'/>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <Text>History:</Text>
          {/* <Text>{history.map((n, i) => {return ( n + '\n')})}</Text> */}
          <FlatList 
            data={history} 
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
  numericInput: {
    width: 100,
    borderColor: 'green',
    borderWidth: 1
  },
  redtext: {fontSize:18, color: 'red'},
});
