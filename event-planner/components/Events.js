import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

function Events({ navigation }) {
  return(
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>Settings</Text> 
      <Button title="More settings..." onPress={() => navigation.navigate('More')} />
      <Button title="Map" onPress={() => navigation.navigate('MapView')} />
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
});

export default Events;