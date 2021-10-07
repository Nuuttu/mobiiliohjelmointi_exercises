import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as Speech from 'expo-speech';


export default function App() {
  const [ textToSpeech, setTextToSpeech ] = useState('');

  const speak = () => {
    console.log('text', textToSpeech)
    Speech.speak( textToSpeech );
  }
  

  return (
    <View style={styles.container}>
      <Text>Write something for the app to speak!</Text>


      <View style={styles.inputContainer}>
        <TextInput 
              keyboardAppearance='default'
              style={styles.inputStyle} 
              onChangeText={textToSpeech => setTextToSpeech(textToSpeech)}
              value={textToSpeech} />
        <Button onPress={speak} title='PUHU'></Button>
      </View>

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
  },
  inputContainer: {
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    width: 250,
    height: 50,
    borderColor: 'green',
    borderWidth: 1,
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
