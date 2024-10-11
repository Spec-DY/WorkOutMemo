import React from 'react';
import { FlatList, Text, View } from 'react-native';

const ItemsList = ({ entries }) => {
  return (
    <FlatList
      data={entries}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        console.log(item);

      const date = item.date instanceof Date ? item.date : new Date(item.date);
        return (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ddd' }}>
            <Text>{item.type}</Text>
            <Text>{item.duration}</Text>
            <Text>{date.toLocaleDateString()}</Text>
            <Text>{item.isSpecial ? "Special":null}</Text>
          </View>
        );
      }}
      
    />
  );
};

export default ItemsList;
