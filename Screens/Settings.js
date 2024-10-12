import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';

const Settings = () => {
  const { theme, toggleTheme, themeStyles } = useContext(AppContext);

  return (
    <View style={[styles.container, { backgroundColor: themeStyles[theme].backgroundColor }]}>
      <Text style={{ color: themeStyles[theme].textColor }}>Current Theme: {theme}</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
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
