import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { doc, deleteDoc } from 'firebase/firestore';
import { database } from '../firebase/firebaseConfig';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditScreen = ({ route, navigation }) => {
  const { id, type } = route.params;

  useEffect(() => {
    // Navigate to the add or edit screen when EditScreen is mounted
    if (type === 'activity') {
      navigation.replace('AddActivity', { entryId: id });
    } else if (type === 'diet') {
      navigation.replace('AddDietEntry', { entryId: id });
    }
  }, [id, type, navigation]);

  return null;
};

export default EditScreen;
