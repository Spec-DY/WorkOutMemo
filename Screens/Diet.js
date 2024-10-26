import React, { useContext,useLayoutEffect, useEffect, useState } from 'react';
import ItemsList from '../Components/ItemsList';
import { AppContext } from '../context/AppContext';
import { Button, View, Text } from 'react-native';
import { listenToCollection } from '../firebase/firebaseHelper';
import PressableButton from '../Components/PressableButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Diet = ({navigation}) => {
  const {theme, themeStyles } = useContext(AppContext);
  const [diet, setDiet] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton onPress={() => navigation.navigate('AddDietEntry')}>
          <Icon name="plus" size={24} color={themeStyles[theme].textColor}/>
          <MaterialCommunityIcons name="food-turkey" size={24} color={themeStyles[theme].textColor} style={{ marginHorizontal: 5 }} />
        </PressableButton>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    // Listen for real-time updates in the diet collection
    const unsubscribe = listenToCollection('diet', setDiet);

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    
    <View style={{flex: 1, backgroundColor: themeStyles[theme].backgroundColor}}>
      <ItemsList type="diet" entries={diet} navigation={navigation}/>
    </View>


  ) 
};

export default Diet;
