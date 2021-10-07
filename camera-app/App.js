import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import { Camera } from 'expo-camera';


export default function App() {

  const [ hasPermission, setHasPermission] = useState(null);
  const [ photoName, setPhotoName ] = useState('');
  const [ photoBase64, setPhotoBase64 ] = useState('');

  const camera = useRef(null);

  useEffect(() => {
    askCameraPermission();
  }, []);

  const askCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission( status === 'granted' ); 
  }

  const snap = async () => {
    if (camera) {
      const photo = await camera.current.takePictureAsync({base64: true});
      setPhotoName(photo.uri);
      setPhotoBase64(photo.base64);
    }
  };

  return (
    <View style={{flex:1}}>
      {hasPermission ? 
      (
        <View style={{flex:1}}>
          <Camera style={{ flex:4 }} ref={camera} />
          <View>
              <Button title="take Photo" onPress={snap} />
          </View>
          <View style={{flex: 4}}>
            <Image style={{flex:1}}
              source={{uri: photoName }} />
            <Image style={{flex:1}}
              source={{uri: `data:image/gif;base64,${photoBase64}`}} />
          </View>
        </View>
      ) : (
        <Text>No camera access</Text>
      )}
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
});
