import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';
import { typography, space, color } from 'styled-system'

function Home({ navigation }) {

  return (
    <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
      <Text style={{ fontSize: 18 }}>Home</Text>
      
      <Button 
      icon={<Icon 
        reverse 
        type="material"
        reversecolor="lightblue" 
        name="alarm" 
        onPress={() => navigation.navigate('Events')}
         />} 
      type='clear'
      />
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