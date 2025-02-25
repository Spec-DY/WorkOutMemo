
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppContext } from '../context/AppContext';
import commonStyles from '../Styles/styles';

const AddActivity = ({ navigation }) => {
  const { addActivity, theme, themeStyles } = useContext(AppContext);
  
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
    <View style={{ flex: 1, padding: 20, backgroundColor: themeStyles[theme].backgroundColor }}>
      <Text style={{ color: themeStyles[theme].textColor }}>Activity Type</Text>
      <DropDownPicker
        open={open}
        value={activityType}
        items={items}
        setOpen={setOpen}
        setValue={setActivityType}
        setItems={setItems}
      />

      <Text style={
        [
          { color: themeStyles[theme].textColor },
          commonStyles.description
        ]
      }>Duration (in minutes)</Text>
      <TextInput
        style={
          [
            { color: themeStyles[theme].textColor },
            commonStyles.input
          ]
        }
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
        placeholder="Enter duration"
      />

      <Text style={
        [
          { color: themeStyles[theme].textColor },
          commonStyles.description
        ]
      }>Date</Text>
      <TextInput
        style={
          [
            { color: themeStyles[theme].textColor },
            commonStyles.input
          ]
        }
        value={date? date.toDateString(): null}
        onPressIn={() => setShowDatePicker(true)}
        editable={false}
        placeholder="Select a date"
        />
        {showDatePicker ? (
          <View style={{ backgroundColor: theme === 'dark' ? '#fff' : themeStyles[theme].backgroundColor, padding: 10, borderRadius: 8 }}>
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display='inline'
            onChange={handleDateChange}
          />
          </View>
        ) : null}

        <View style={{margin:10}}></View>
        <Button title="Save" onPress={handleSave} />
        <View style={{margin:10}}></View>
        <Button title="Cancel" onPress={() => navigation.goBack()} />

    </View>
  );
};


export default AddActivity;
