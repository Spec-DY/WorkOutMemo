import React from 'react';
import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native';

const PressableButton = ({ children, onPress }) => {
  return (
    <Pressable onPress={onPress} style = {styles.button}>
      {children}
    </Pressable>
  );
};
const styles = StyleSheet.create({
    button: {
      marginRight:5,
      flexDirection: 'row',
    }
  });


export default PressableButton;
