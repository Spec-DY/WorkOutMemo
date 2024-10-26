import React from 'react';
import { Pressable, View, StyleSheet, Platform } from 'react-native';

const PressableButton = ({ children, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressedButton,  // Feedback style for iOS
      ]}
      android_ripple={{ color: 'rgba(0, 123, 255, 0.2)' }}  // Ripple effect for Android
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'yellow',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row'
  },
  pressedButton: {
    opacity: 0.7,  // Visual feedback for iOS when pressed
  },
});

export default PressableButton;
