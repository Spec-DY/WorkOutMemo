
import React, { useContext } from 'react';
import ItemsList from '../Components/ItemsList';
import { AppContext } from '../context/AppContext';

const Diet = () => {
  const { diet } = useContext(AppContext);

  return <ItemsList type="diet" entries={diet} />;
};

export default Diet;
