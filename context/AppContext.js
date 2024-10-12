
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  
  const [diet, setDiet] = useState([]);

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const addActivity = (newActivity) => {
    console.log(newActivity)
    setActivities([...activities, { id: activities.length + 1, ...newActivity }]);
  };

  const addDietEntry = (newDietEntry) => {
    console.log(newDietEntry)
    setDiet([...diet, { id: diet.length + 1, ...newDietEntry }]);
  };

  const themeStyles = {
    light: {
      backgroundColor: '#fff',
      textColor: '#000'
    },
    dark: {
      backgroundColor: '#333',
      textColor: '#fff'
    }
  };

  return (
    <AppContext.Provider value={{ activities, diet, addActivity, addDietEntry, theme, toggleTheme, themeStyles }}>
      {children}
    </AppContext.Provider>
  );
};

