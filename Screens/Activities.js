
import React, { useContext } from 'react';
import ItemsList from '../Components/ItemsList';
import { AppContext } from '../context/AppContext';

const Activities = () => {
  const { activities } = useContext(AppContext);

  return <ItemsList type="activities" entries={activities} />;
};

export default Activities;
