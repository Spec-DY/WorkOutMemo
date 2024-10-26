import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppContext } from '../context/AppContext';
import { addDoc, collection } from 'firebase/firestore';
import { database } from '../firebase/firebaseConfig';
import commonStyles from '../Styles/styles';

const AddDietEntry = ({ navigation }) => {
  const { theme, themeStyles } = useContext(AppContext);

  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSave = async () => {
    if (!description || !calories || isNaN(calories) || calories <= 0 || !Number.isInteger(parseFloat(calories))) {
      Alert.alert('Invalid Input', 'Please provide valid data.');
      return;
    }

    const isSpecial = calories > 800;

    try {
      // Add a new document to the "diet" collection in Firestore
      const docRef = await addDoc(collection(database, 'diet'), {
        description,
        calories: Number(calories),
        date: date ? date.toISOString() : null, // Store date as ISO string or null
        isSpecial,
      });

      console.log('Document written with ID: ', docRef.id);
      navigation.goBack();  // Go back to the previous screen after saving
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'There was an error saving your diet entry.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: themeStyles[theme].backgroundColor }}>
      <Text style={[{ color: themeStyles[theme].textColor }, commonStyles.description]}>
        Description
      </Text>
      <TextInput
        style={[{ color: themeStyles[theme].textColor }, commonStyles.input]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />

      <Text style={[{ color: themeStyles[theme].textColor }, commonStyles.description]}>
        Calories
      </Text>
      <TextInput
        style={[{ color: themeStyles[theme].textColor }, commonStyles.input]}
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
        placeholder="Enter calories"
      />

      <Text style={[{ color: themeStyles[theme].textColor }, commonStyles.description]}>
        Date
      </Text>
      <TextInput
        style={[{ color: themeStyles[theme].textColor }, commonStyles.input]}
        value={date ? date.toDateString() : null}
        onPressIn={() => setShowDatePicker(true)}
        editable={false}
        placeholder="Select a date"
      />
      {showDatePicker ? (
        <View style={{ backgroundColor: theme === 'dark' ? '#fff' : themeStyles[theme].backgroundColor, padding: 10, borderRadius: 8 }}>
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="inline"
            onChange={handleDateChange}
          />
        </View>
      ) : null}

      <View style={{ margin: 10 }} />
      <Button title="Save" onPress={handleSave} />
      <View style={{ margin: 10 }} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default AddDietEntry;
