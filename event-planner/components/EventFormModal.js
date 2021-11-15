import React, { useState } from 'react'
import { StyleSheet, View } from "react-native";
import Modal from 'react-native-modal';
import { Text, Button } from "react-native-elements";
import EventCreateForm from './EventCreateForm';
import More from './More';

// https://blog.logrocket.com/build-better-forms-with-react-native-ui-components/








export default function EventFormModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <Button title="Create Event" onPress={toggleModal} />
      <Modal
        animationOutTiming={1000}
        animationOut={'slideOutUp'}
        isVisible={isModalVisible}>
        <View>
          <More />
          <View style={{ marginTop: 150 }}>
            <Button title="Hide modal" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
});