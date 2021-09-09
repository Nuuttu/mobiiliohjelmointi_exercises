import React from 'react';
import { useState } from 'react';
import { StyleSheet, Button, View, Text, TextInput } from 'react-native';


export default function HomeScreen({ navigation, setHistory, history }) {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10
    },
    numericInput: {
      width: 100,
      borderColor: 'green',
      borderWidth: 1,
    },
    redtext: { fontSize: 18, color: 'red' },
  });
  
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState('');
  

  const sum = () => {
    setResult(parseInt(number1) + parseInt(number2))
    setNumber1('')
    setNumber2('')
    setHistory([...history, { key: (number1 + ' + ' + number2 + ' = ' + (parseInt(number1) + parseInt(number2))) }])
  }

  const minus = () => {
    var r = parseInt(number1) - parseInt(number2)
    setResult(r)
    setNumber1('')
    setNumber2('')
    setHistory([...history, { key: (number1 + ' - ' + number2 + ' = ' + r) }])
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.redtext}>Result: {result}</Text>
        <Text style={styles.redtext}>Enter numbers!</Text>
        <View style={{ padding: 10 }}>
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
        </View>
        <View style={{ width: '30%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10 }}>
          <Button style={{ width: 20 }} onPress={sum} title='+' />
          <Button style={{ width: 20 }} onPress={minus} title='-' />
        </View>
      <Button title="History" onPress={() => navigation.navigate('History')} />
    </View>
  );
}
