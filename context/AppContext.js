
import React, { createContext, useState } from 'react';
import { buttonColorLight, buttonColorDark } from '../Styles/colors';


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
      backgroundColor: 'white',
      textColor: 'black',
      buttonColor: buttonColorLight
    },
    dark: {
      backgroundColor: 'black',
      textColor: 'white',
      buttonColor: buttonColorDark
    }
  };

  return (
    <AppContext.Provider value={{ activities, diet, addActivity, addDietEntry, theme, toggleTheme, themeStyles }}>
      {children}
    </AppContext.Provider>
  );
};

