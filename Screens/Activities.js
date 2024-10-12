
import React, { useContext, useLayoutEffect } from 'react';
import ItemsList from '../Components/ItemsList';
import { AppContext } from '../context/AppContext';
import { Button, View } from 'react-native';


const Activities = ({navigation}) => {
  const { activities, theme, themeStyles } = useContext(AppContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('AddActivity')}
          title="Add"
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: themeStyles[theme].backgroundColor }}>
      <ItemsList entries={activities} type="activity" />
    </View>
  );
};

export default Activities;
