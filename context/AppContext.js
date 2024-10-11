
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  
  const [diet, setDiet] = useState([]);

  const addActivity = (newActivity) => {
    console.log(newActivity)
    setActivities([...activities, { id: activities.length + 1, ...newActivity }]);
  };

  return (
    <AppContext.Provider value={{ activities, diet, addActivity }}>
      {children}
    </AppContext.Provider>
  );
};

