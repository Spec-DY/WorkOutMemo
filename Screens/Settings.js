import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';
import { AppContext } from '../context/AppContext';

const Settings = () => {
  const { theme, toggleTheme, themeStyles } = useContext(AppContext);

  const isDarkMod = theme === 'dark'

  return (
    <View style={[styles.container, { backgroundColor: themeStyles[theme].backgroundColor }]}>
      <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMod ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            // toogleTheme callback
            onValueChange={toggleTheme}
            value={isDarkMod}
            style={{transform: [{ scaleX: 5 }, { scaleY: 5 }]}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Settings;
