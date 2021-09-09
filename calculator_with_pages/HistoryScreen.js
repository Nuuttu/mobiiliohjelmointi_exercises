import React from 'react'
import { StatusBar, StyleSheet, Text, View, Button, FlatList } from 'react-native';


export default function HistoryScreen({ history }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>History:</Text>
        <FlatList
          data={history}
          renderItem={({ item }) => <Text>{item.key}</Text>}
          keyExtractor={item => item.id}
        />
    </View>
  );
}
