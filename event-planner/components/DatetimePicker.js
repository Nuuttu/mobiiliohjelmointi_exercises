import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatetimePicker = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [ title, setTitle ] = useState("Select Date")

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    const d = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate())

    const dd = props.dt
    dd.setDate(date.getDate())
    dd.setMonth(date.getMonth())
    dd.setFullYear(date.getFullYear())
    props.setDt(dd)
    setTitle(d)
    hideDatePicker();
  };

  

  return (
    <View>
      <Button title={title} onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatetimePicker;