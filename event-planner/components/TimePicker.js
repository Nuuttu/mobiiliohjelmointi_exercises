import React, { useState } from "react";
import { View } from "react-native";
import { Button } from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimePicker = (props) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [ title, setTitle ] = useState("Select Time")
  const [ buttonType, setButtonType ] = useState('solid')

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    console.log("A time has been picked: ", time);
    const t = time.getHours() + ":" + time.getMinutes()
    setTitle(t)

    const tt = props.dt
    tt.setHours(time.getHours())
    tt.setMinutes(time.getMinutes())
    tt.setSeconds(0)
    tt.setMilliseconds(0)
    props.setDt(tt)
    setButtonType('clear')
    hideTimePicker();
  };

  return (
    <View style={{width:'100%'}}>
      <Button type={buttonType} title={title} onPress={showTimePicker} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
};

export default TimePicker;