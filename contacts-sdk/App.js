import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';

import * as Contacts from 'expo-contacts';

export default function App() {

  
  const [contact, setContact] = useState({});
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    setContacts([]);
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContact(data[0])
        data.map(c => {
          setContacts(contacts => [...contacts, c]);
        })
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>

        <Text>{contact.name}</Text>
        <FlatList 
          style={{marginLeft: "5%"}} 
          keyExtractor={(item, index) => 'key'+index}
          renderItem={({ item })  =>  
            <View>
              <Text>{item.name} - { item.phoneNumbers[0].number}</Text>
            </View>}
          data={contacts}
        />

      </View>
      <Button title="Get Contacts" onPress={getContacts} />
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
});
