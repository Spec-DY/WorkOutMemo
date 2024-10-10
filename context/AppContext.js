
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activities, setActivities] = useState([
    { id: 1, name: 'Running' },
    { id: 2, name: 'Swimming' }
  ]);
  
  const [diet, setDiet] = useState([
    { id: 1, name: 'Breakfast - Eggs' },
    { id: 2, name: 'Lunch - Salad' }
  ]);

  return (
    <AppContext.Provider value={{ activities, diet }}>
      {children}
    </AppContext.Provider>
  );
};
