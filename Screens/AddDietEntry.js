import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppContext } from '../context/AppContext';
import { addDoc, updateDoc, collection, doc, getDoc } from 'firebase/firestore';
import { database } from '../firebase/firebaseConfig';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import commonStyles from '../Styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteDocument } from '../firebase/firebaseHelper';

const AddDietEntry = ({ navigation, route }) => {
  const { theme, themeStyles } = useContext(AppContext);
  const entryId = route.params?.entryId || null;

  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(null);
  const [isSpecial, setIsSpecial] = useState(false); // Holds the value saved in Firestore
  const [isSpecialConfirmed, setIsSpecialConfirmed] = useState(false); // Checkbox state
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: entryId ? 'Edit Diet' : 'Add Diet',
      headerRight: () =>
        entryId && (
          <Icon
            name="trash"
            size={24}
            color="red"
            onPress={handleDelete}
          />
        ),
    });
  }, [entryId, navigation]);

  useEffect(() => {

    if (entryId) {
      // Fetch data if editing an existing entry
      const fetchEntryData = async () => {
        try {
          const docRef = doc(database, 'diet', entryId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setDescription(data.description || '');
            setCalories(data.calories?.toString() || '');
            setDate(data.date ? new Date(data.date) : new Date());
            setIsSpecial(data.isSpecial || false);
            setIsSpecialConfirmed(false);
          }
        } catch (error) {
          console.error('Error fetching document:', error);
          Alert.alert('Error', 'Could not load diet entry data.');
        }
      };
      fetchEntryData();
    } else if (Number(calories) > 800) {
      setIsSpecial(true); // Automatically mark new high-calorie entries as special
    }
  }, [entryId, calories, navigation]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSave = async () => {
    if (!description) {
      Alert.alert('Invalid Input', 'Please enter diet description.');
      return;
    }
    if (!calories || isNaN(calories) || Number(calories) < 0 || !Number.isInteger(Number(calories))) {
      Alert.alert('Invalid Input', 'Calories must be a valid integer.');
      return;
    }
    if (!date) {
      Alert.alert('Invalid Input', 'Date should not be empty.');
      return;
    }
    // Confirmation Alert before saving
    Alert.alert(
      'Confirm Save',
      'Are you sure you want to save this diet entry?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Save',
          onPress: async () => {
            // Update isSpecial only if editing an existing entry with checkbox
            const finalSpecialStatus = entryId ? isSpecialConfirmed : isSpecial;
  
            const dietData = {
              description,
              calories: Number(calories),
              date: date ? date.toISOString() : null,
              isSpecial: finalSpecialStatus, // Final special status based on conditions
            };
  
            try {
              if (entryId) {
                const docRef = doc(database, 'diet', entryId);
                await updateDoc(docRef, dietData);
                Alert.alert('Success', 'Diet entry updated successfully.');
              } else {
                await addDoc(collection(database, 'diet'), dietData);
                Alert.alert('Success', 'Diet entry added successfully.');
              }
              navigation.goBack();
              setIsSpecialConfirmed(false);
            } catch (error) {
              console.error('Error saving diet entry:', error);
              Alert.alert('Error', 'There was an error saving the diet entry.');
            }
          },
        },
      ]
    );
  };
  


  const handleDelete = () => {
    Alert.alert('Delete Entry', 'Are you sure you want to delete this entry?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteDocument('diet', entryId); // Pass collection name and doc ID
            Alert.alert('Success', 'Entry deleted successfully.');
            navigation.goBack();
          } catch (error) {
            console.error('Error deleting entry:', error);
            Alert.alert('Error', 'There was an error deleting the entry.');
          }
        },
      },
    ]);
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
        onChangeText={(value) => {
          setCalories(value);
          if (!entryId && Number(value) > 800) {
            setIsSpecial(true); // Set special if new entry and calories > 800
          }
        }}
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
      {showDatePicker && (
        <View style={{ backgroundColor: theme === 'dark' ? '#fff' : themeStyles[theme].backgroundColor, padding: 10, borderRadius: 8 }}>
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="inline"
            onChange={handleDateChange}
          />
        </View>
      )}

      {entryId && isSpecial && (
        <BouncyCheckbox
          isChecked={isSpecialConfirmed} // Track checkbox state
          text="This item is marked as special. Select the checkbox if you would like to approve it."
          fillColor="green"
          unfillColor="white"
          iconStyle={{ borderColor: 'green' }}
          textStyle={{ color: themeStyles[theme].textColor, textDecorationLine: 'none' }}
          onPress={(newValue) => setIsSpecialConfirmed(newValue)}
          style={{ marginVertical: 10 }}
        />
      )}

      <Button title="Save" onPress={handleSave} />
      <View style={{ margin: 10 }} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default AddDietEntry;
