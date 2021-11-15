import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';
import { typography, space, color } from 'styled-system'
import firebase from 'firebase';









export default function EventForm() {

  return (
    <Box alignItems="flex-end" p="8">
      <VStack alignItems="flex-end" space="5">
        <FormControl>
          <FormControl.Label mb="3">What's your event called?</FormControl.Label>
          <Input placeholder="Event's Name" />
        </FormControl>
        <FormControl>
          <FormControl.Label mb="3">When is your Event?</FormControl.Label>
          <Radio.Group nativeID="patani" name="day_night">
            <VStack space="3">
              <Radio value="day">Day</Radio>
              <Radio value="night">Night</Radio>
            </VStack>
          </Radio.Group>
        </FormControl>
        <Divider />
        <Checkbox size="sm" value="tnc" justifyContent="center" mb="4">
          I agree to Terms and conditions
        </Checkbox>
      </VStack>
      <Button mt="2" endIcon={<AddIcon size="3" />}>Create Event</Button>
    </Box>
  )
}