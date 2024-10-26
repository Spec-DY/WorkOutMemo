import React, { useContext } from 'react';
import { FlatList, Text, View, Pressable } from 'react-native';
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
            style={[
              itemListStyles.itemContainer,
              { backgroundColor: themeStyles[theme].backgroundColor, padding: 12, borderRadius: 8 },
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={[itemListStyles.typeText, { color: themeStyles[theme].textColor, fontWeight: 'bold', flex: 1 }]}>
                {type === 'activity' ? item.type : item.description}
              </Text>
              {item.isSpecial && (
                <AntDesign name="star" size={20} color="orange" style={{ marginRight: 8 }} />
              )}
              <Text style={[itemListStyles.dateText, styles.infoBox, { backgroundColor: '#6757A6', marginRight: 8 }]}>
                {date.toDateString()}
              </Text>
              <Text style={[itemListStyles.detailsText, styles.infoBox, { backgroundColor: '#6757A6' }]}>
                {type === 'activity' ? `${item.duration} Minutes` : `${item.calories} Calories`}
              </Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
};

const styles = {
  infoBox: {
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 14,
    overflow: 'hidden',
  },
};

export default ItemsList;
