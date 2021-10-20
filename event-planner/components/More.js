  
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function More() {
  return(
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>Mores</Text> 
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

export default More;