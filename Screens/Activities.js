import React, { useContext, useLayoutEffect, useState, useEffect } from 'react';
import ItemsList from '../Components/ItemsList';
import { AppContext } from '../context/AppContext';
import { Button, View } from 'react-native';
import { listenToCollection } from '../firebase/firebaseHelper';
import PressableButton from '../Components/PressableButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const Activities = ({navigation}) => {
  const { theme, themeStyles } = useContext(AppContext);
  const [activities, setActivities] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton onPress={() => navigation.navigate('AddActivity')}>
          <Icon name="plus" size={24} color='black'/>
          <MaterialCommunityIcons name="run-fast" size={24} color='black' style={{ marginHorizontal: 5 }} />
        </PressableButton>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    // Listen for real-time updates in the activities collection
    const unsubscribe = listenToCollection('activities', setActivities);

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: themeStyles[theme].backgroundColor }}>
      <ItemsList entries={activities} type="activity" navigation={navigation} />
    </View>
  );
};

export default Activities;
