import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { typography, space, color } from 'styled-system'


function Home({ navigation }) {

  

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>Home</Text>
      
      <Icon reverse type="material"reversecolor="lightblue" name="alarm"  />
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

export default Home;