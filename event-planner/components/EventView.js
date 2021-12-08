import React from 'react';
import { Text, View, StyleSheet, FlatList, Alert, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import firebase from 'firebase';


export default function EventView({ route, navigation }) {
  console.log('event route params', route)
  const item = route.params.itemdata

  const firebaseUrl = useSelector(state => state.firebaseReducer.url)

  // DELETE CONFIRM
  const wannaDelete = (item) =>
    Alert.alert(
      "Deleting",
      item.name,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteItem(item) }
      ]
    );

  // Delete
  const deleteItem = (item) => {
    navigation.goBack()
    firebase.database().ref().child(`items/${firebaseUrl}`).orderByChild("name").equalTo(item.name)
      .on("child_added", function (snapshot) {
        console.log('to delete', snapshot.key);
        if (firebaseUrl === '') {
          firebase.database().ref(`items/${snapshot.key}`).remove()
        } else {
          firebase.database().ref(`items/${firebaseUrl}/${snapshot.key}`).remove()
        }
      });
  }


  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
      <Text style={{fontWeight: 'bold', fontSize: 24}}>{route.params.itemdata.name} </Text>
      </View>
      <View>
        {item.coordinates &&


          <Button
            title="Map of this event"
            onPress={() => navigation.navigate('MapShowCoordinates', { itemdata: route.params.itemdata })}
          />
        }
        <Button type='clear' buttonStyle={{ fontSize: 16, color: 'red', alignSelf: 'flex-end' }} onPress={() => wannaDelete(item)} title='delete' titleStyle={{ color: 'rgb(255, 102, 102)' }}></Button>

        <Button
          title="Go back"
          onPress={() => navigation.goBack()}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    backgroundColor: 'rgba(0,0,0,0.0)',
    justifyContent: "center",
    
  },
});