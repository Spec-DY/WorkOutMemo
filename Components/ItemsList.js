import React, { useContext } from 'react';
import { FlatList, Text, View, Pressable, navigate } from 'react-native';
import { AppContext } from '../context/AppContext';
import itemListStyles from '../Styles/ItemListStyles';
import AntDesign from '@expo/vector-icons/AntDesign';

const ItemsList = ({ entries, type, navigation }) => {
  const { theme, themeStyles } = useContext(AppContext);

  return (
    <FlatList
      data={entries}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const date = item.date instanceof Date ? item.date : new Date(item.date);

        return (
          <Pressable
            onPress={() => navigation.navigate('EditScreen', { id: item.id, type })}
            style={[itemListStyles.itemContainer, { backgroundColor: themeStyles[theme].backgroundColor }]}
          >
            <View style={itemListStyles.row}>
              <Text style={[itemListStyles.typeText, { color: themeStyles[theme].textColor }]}>
                {type === 'activity' ? item.type : item.description}
              </Text>
              {item.isSpecial && <AntDesign name="star" size={24} color="orange" />}
            </View>
            <Text style={[itemListStyles.detailsText, { color: themeStyles[theme].textColor }]}>
              {type === 'activity' ? `${item.duration} Minutes` : `${item.calories} Calories`}
            </Text>
            <Text style={[itemListStyles.dateText, { color: themeStyles[theme].textColor }]}>
              {date.toLocaleDateString()}
            </Text>
          </Pressable>
        );
      }}
    />
  );
};

export default ItemsList;
