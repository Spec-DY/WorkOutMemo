
import React, { useContext, useLayoutEffect } from 'react';
import ItemsList from '../Components/ItemsList';
import { AppContext } from '../context/AppContext';
import { Button } from 'react-native';


const Activities = ({navigation}) => {
  const { activities } = useContext(AppContext);

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

  return <ItemsList type="activities" entries={activities} />;
};

export default Activities;
