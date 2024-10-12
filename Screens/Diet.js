
import React, { useContext,useLayoutEffect } from 'react';
import ItemsList from '../Components/ItemsList';
import { AppContext } from '../context/AppContext';
import { Button, View, Text } from 'react-native';

const Diet = ({navigation}) => {
  const { diet, theme, themeStyles } = useContext(AppContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('AddDietEntry')}
          title="Add"
        />
      ),
    });
  }, [navigation]);

  return (
    
    <View style={{flex: 1, backgroundColor: themeStyles[theme].backgroundColor}}>
      <ItemsList type="diet" entries={diet} />
    </View>


  ) 
};

export default Diet;
