import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimePicker = (props) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [ title, setTitle ] = useState("Select Time")

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    console.log("A date has been picked: ", time);
    const t = time.getHours() + ":" + time.getMinutes()
    setTitle(t)

    const tt = props.dt
    tt.setHours(time.getHours())
    tt.setMinutes(time.getMinutes())
    tt.setSeconds(0)
    tt.setMilliseconds(0)
    props.setDt(tt)
    hideTimePicker();
  };

  return (
    <View>
      <Button title={title} onPress={showTimePicker} />
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