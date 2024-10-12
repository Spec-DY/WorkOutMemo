
import React, { useContext,useLayoutEffect } from 'react';
import ItemsList from '../Components/ItemsList';
import { AppContext } from '../context/AppContext';
import { Button } from 'react-native';

const Diet = ({navigation}) => {
  const { diet } = useContext(AppContext);

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

  return <ItemsList type="diet" entries={diet} />;
};

export default Diet;
