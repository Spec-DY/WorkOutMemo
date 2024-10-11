
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppContext } from '../context/AppContext';

const AddActivity = ({ navigation }) => {
  const { addActivity } = useContext(AppContext);
  
  const [activityType, setActivityType] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Weights', value: 'Weights' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Hiking', value: 'Hiking' },
  ]);

  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSave = () => {
    if (!activityType || !duration || isNaN(duration) || duration <= 0) {
      Alert.alert('Invalid Input', 'Please provide valid data.');
      return;
    }

    const isSpecial = (activityType === 'Running' || activityType === 'Weights') && duration > 60;

    addActivity({ type: activityType, duration: Number(duration), date, isSpecial });

    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Activity Type</Text>
      <DropDownPicker
        open={open}
        value={activityType}
        items={items}
        setOpen={setOpen}
        setValue={setActivityType}
        setItems={setItems}
      />

      <Text>Duration (in minutes)</Text>
      <TextInput
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
        placeholder="Enter duration"
      />

      <Text>Date</Text>
      <TextInput
        value={date.toDateString()}
        onPressIn={() => setShowDatePicker(true)}
        />
        {showDatePicker ? (
          <DateTimePicker
            value={date}
            mode="date"
            display='inline'
            onChange={handleDateChange}
          />
        ) : null}

      <Button title="Save" onPress={handleSave} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default AddActivity;
