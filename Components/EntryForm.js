
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const EntryForm = ({
  type,
  theme,
  themeStyles,
  description,
  setDescription,
  calories,
  setCalories,
  activityType,
  setActivityType,
  duration,
  setDuration,
  date,
  setDate,
  showDatePicker,
  setShowDatePicker,
}) => {
  const [open, setOpen] = React.useState(false);
  const activityItems = [
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Weights', value: 'Weights' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Hiking', value: 'Hiking' },
  ];

  return (
    <View>
      {type === 'diet' && (
        <>
          <Text style={{ color: themeStyles[theme].textColor }}>Description</Text>
          <TextInput
            style={[{ color: themeStyles[theme].textColor }, { padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5 }]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
          />
          <Text style={{ color: themeStyles[theme].textColor }}>Calories</Text>
          <TextInput
            style={[{ color: themeStyles[theme].textColor }, { padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5 }]}
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
            placeholder="Enter calories"
          />
        </>
      )}

      {type === 'activity' && (
        <>
          <Text style={{ color: themeStyles[theme].textColor }}>Activity Type</Text>
          <DropDownPicker
            open={open}
            value={activityType}
            items={activityItems}
            setOpen={setOpen}
            setValue={setActivityType}
            style={{ backgroundColor: themeStyles[theme].backgroundColor }}
            dropDownContainerStyle={{ backgroundColor: themeStyles[theme].backgroundColor }}
          />
          <Text style={{ color: themeStyles[theme].textColor }}>Duration (minutes)</Text>
          <TextInput
            style={[{ color: themeStyles[theme].textColor }, { padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5 }]}
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
            placeholder="Enter duration"
          />
        </>
      )}

      <Text style={{ color: themeStyles[theme].textColor }}>Date</Text>
      <TextInput
        style={[{ color: themeStyles[theme].textColor }, { padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5 }]}
        value={date ? date.toDateString() : null}
        onPressIn={() => setShowDatePicker(true)}
        editable={false}
        placeholder="Select a date"
      />
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="inline"
          onChange={(event, selectedDate) => setDate(selectedDate || date)}
        />
      )}
    </View>
  );
};

export default EntryForm;
