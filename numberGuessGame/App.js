import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  const [number, setNumber] = useState('')
  const [reply, setReply] = useState('')
  const [generatedNumber, setGeneratedNumber] = useState(0)
  const [guesses, setGuesses] = useState([])

  useEffect(() => {
    setGeneratedNumber(Math.floor(Math.random() * 100) + 1)
  }, [])

  const guess = () => {
    setGuesses(guesses.concat(number))
    if(parseInt(number) < generatedNumber) setReply('^')
    if(parseInt(number) > generatedNumber) setReply('v')
    if(parseInt(number) === generatedNumber) {alert('You guessed the number with ' + (guesses.length + 1)  + ' guesses')}
    setNumber('')
    
  }

  return (
    <View style={styles.container}>
      <Text>Guess a number between 1-100</Text>
      <TextInput
        keyboardType='numeric'
        style={{
          width: 100,
          borderColor: 'green',
          borderWidth: 1}}
        onChangeText={n => setNumber(n)}
        value={number}
      />
      <Button onPress={guess} title='make guess' />
      <Text>{reply}</Text>
      <Text>{guesses.map(n => {return n + '\n'})}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
