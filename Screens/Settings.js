import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';
import colors from '../Styles/colors';
import PressableButton from '../Components/PressableButton';

const Settings = () => {
  const { theme, toggleTheme, themeStyles } = useContext(AppContext);
  const isDarkMode = theme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: themeStyles[theme].backgroundColor }]}>
      <PressableButton onPress={toggleTheme}>
        <View style={[
          styles.buttonContainer,
          { backgroundColor: isDarkMode ? colors.thumbColor.dark : colors.thumbColor.light }
        ]}>
          <Text style={{ color: themeStyles[theme].textColor }}>
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </Text>
        </View>
      </PressableButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Settings;
