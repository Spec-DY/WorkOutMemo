
import React from 'react';
import { FlatList, Text, View } from 'react-native';

const ItemsList = ({ type, entries }) => {
  return (
    <FlatList
      data={entries}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ddd' }}>
          <Text style={{ fontSize: 16 }}>{item.name}</Text>
        </View>
      )}
    />
  );
};

export default ItemsList;
