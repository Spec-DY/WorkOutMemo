import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';
import { AppContext } from '../context/AppContext';
import colors from '../Styles/colors';

const Settings = () => {
  const { theme, toggleTheme, themeStyles } = useContext(AppContext);

  const isDarkMod = theme === 'dark'

  return (
    <View style={[styles.container, { backgroundColor: themeStyles[theme].backgroundColor }]}>
      <Switch
            trackColor={colors.trackColor}
            thumbColor={isDarkMod ? colors.thumbColor.dark : colors.thumbColor.light}
            ios_backgroundColor={colors.iosBackgroundColor}
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
