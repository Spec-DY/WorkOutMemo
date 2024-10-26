import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppContext } from '../context/AppContext';
import { addDoc, updateDoc, collection, doc, getDoc } from 'firebase/firestore';
import { database } from '../firebase/firebaseConfig';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import commonStyles from '../Styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteDocument } from '../firebase/firebaseHelper';
import PressableButton from '../Components/PressableButton';

const AddActivity = ({ navigation, route }) => {
  const { theme, themeStyles } = useContext(AppContext);
  const entryId = route.params?.entryId || null;

  const [activityType, setActivityType] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(null);
  const [isSpecial, setIsSpecial] = useState(false);
  const [isSpecialConfirmed, setIsSpecialConfirmed] = useState(false); // Checkbox state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [items] = useState([
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Weights', value: 'Weights' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Hiking', value: 'Hiking' },
  ]);

  useEffect(() => {
    navigation.setOptions({
      title: entryId ? 'Edit Activity' : 'Add Activity',
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
      const fetchEntryData = async () => {
        try {
          const docRef = doc(database, 'activities', entryId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setActivityType(data.type || '');
            setDuration(data.duration?.toString() || '');
            setDate(data.date ? new Date(data.date) : new Date());
            setIsSpecial(data.isSpecial || false);
            setIsSpecialConfirmed(false);
          }
        } catch (error) {
          console.error('Error fetching document:', error);
          Alert.alert('Error', 'Could not load activity data.');
        }
      };
      fetchEntryData();
    }
  }, [entryId, navigation]);

  const handleSave = async () => {
    // Validate inputs
    if (!activityType) {
      Alert.alert('Invalid Input', 'Please select an activity type.');
      return;
    }
    if (!duration || isNaN(duration) || Number(duration) <= 0 || !Number.isInteger(Number(duration))) {
      Alert.alert('Invalid Input', 'Duration must be a valid integer.');
      return;
    }
    if (!date) {
      Alert.alert('Invalid Input', 'Date should not be empty.');
      return;
    }
  
    Alert.alert(
      'Confirm Save',
      'Are you sure you want to save this activity?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Save',
          onPress: async () => {
            const finalSpecialStatus = entryId ? isSpecialConfirmed : isSpecial;
  
            const activityData = {
              type: activityType,
              duration: Number(duration),
              date: date.toISOString(),
              isSpecial: finalSpecialStatus,
            };
  
            try {
              if (entryId) {
                const docRef = doc(database, 'activities', entryId);
                await updateDoc(docRef, activityData);
                Alert.alert('Success', 'Activity updated successfully.');
              } else {
                await addDoc(collection(database, 'activities'), activityData);
                Alert.alert('Success', 'Activity added successfully.');
              }
              navigation.goBack();
              setIsSpecialConfirmed(false);
            } catch (error) {
              console.error('Error saving activity:', error);
              Alert.alert('Error', 'There was an error saving the activity.');
            }
          },
        },
      ]
    );
  };
  
  

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };


  const handleDelete = () => {
    Alert.alert('Delete Entry', 'Are you sure you want to delete this entry?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteDocument('activities', entryId); // Pass collection name and doc ID
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
      <Text style={{ color: themeStyles[theme].textColor }}>Activity Type</Text>
      <DropDownPicker
        open={open}
        value={activityType}
        items={items}
        setOpen={setOpen}
        setValue={setActivityType}
        placeholder="Select an activity"
        style={{ backgroundColor: themeStyles[theme].backgroundColor }}
        dropDownContainerStyle={{ backgroundColor: themeStyles[theme].backgroundColor }}
      />

      <Text style={[{ color: themeStyles[theme].textColor }, commonStyles.description]}>
        Duration (in minutes)
      </Text>
      <TextInput
        style={[{ color: themeStyles[theme].textColor }, commonStyles.input]}
        keyboardType="numeric"
        value={duration}
        onChangeText={(value) => {
          setDuration(value);
          if (!entryId && (activityType === 'Running' || activityType === 'Weights') && Number(value) > 60) {
            setIsSpecial(true);
          }
        }}
        placeholder="Enter duration"
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
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="inline"
          onChange={handleDateChange}
        />
      )}

      {entryId && isSpecial && (
        <BouncyCheckbox
          isChecked={isSpecialConfirmed} // Checkbox state
          text="This item is marked as special. Select the checkbox if you would like to approve it."
          fillColor="green"
          unfillColor="white"
          iconStyle={{ borderColor: 'green' }}
          textStyle={{ color: themeStyles[theme].textColor, textDecorationLine: 'none' }}
          onPress={(newValue) => setIsSpecialConfirmed(newValue)}
          style={{ marginVertical: 10 }}
        />
      )}

      <View>
        <PressableButton onPress={handleSave}>
            <Text>Save</Text>
        </PressableButton>
        <View style={{ margin: 10 }} />
        <PressableButton onPress={() => navigation.goBack()}>
            <Text>Cancel</Text>
        </PressableButton>
      </View>
    </View>
  );
};

export default AddActivity;
